"use client"

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-user";
import { ModeToggle } from "../common/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CreditCard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = ["escapes", "blogs"];

// !--- This navbar was a part of tutorial by JSMastery ---->
const Navbar = () => {
  const user = useCurrentUser();

  const handleLogout = () => {
    signOut();
  }

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
          </div>

          <div className="flex h-full gap-6 items-center">
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
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.image || ""} alt={user?.name || "User avatar"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-mist-blue dark:bg-midnight-blue text-midnight-blue dark:text-frost-blue" align="center">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Credits: {user?.availableCredits || 0}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5"
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
