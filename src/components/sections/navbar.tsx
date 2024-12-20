"use client"

import { useEffect, useRef, useState } from "react";
// import { TiLocationArrow } from "react-icons/ti";
// import { Button} from "@/components/ui/button";
import { useWindowScroll } from "react-use";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-user";
import { ModeToggle } from "../common/mode-toggle";

const navItems = ["escapes", "blogs"];

// !--- This navbar was a part of tutorial by JSMastery ---->
const Navbar = () => {
  const user = useCurrentUser();

  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    const audioElement = audioElementRef.current;
    if (audioElement) {
      audioElement.volume = 0.1; // Set initial volume to 0.4
    }
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed bg-mist-blue dark:bg-midnight-blue selection:text-midnight-blue selection:bg-golden-haze inset-x-0 top-4 z-50 h-16  transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            {/* <img src="/img/logo.png" alt="logo" className="w-10" /> */}
            <Image
              src={"/assets/logo.webp"}
              alt="globetrotters mascot"
              width={40}
              height={60}
            />

            <h1 className="text-sm font-bold tracking-wider text-sunset-gold">
              GLOBETROTTERS.
            </h1>
            {/* <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              className="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            /> */}
          </div>

          <div className="flex h-full gap-12 items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`/${item.toLowerCase()}`}
                  className="nav-hover-btn text-midnight-blue dark:text-frost-blue"
                >
                  {item}
                </a>
              ))}
            </div>
            <ModeToggle />
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audios/ambience.wav"
                loop
                
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line bg-midnight-blue dark:bg-frost-blue", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
