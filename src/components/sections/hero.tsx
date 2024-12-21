"use client";
import { ScrollTrigger } from "gsap/all";

import Link from "next/link";

import { WiStars } from "react-icons/wi";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaRedditAlien } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import UiButton from "../common/custom-button";
import { useRouter } from "next/navigation";

const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  const router = useRouter();

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(11% 6%, 70% 0, 89% 88%, 7% 95%)",
      borderRadius: "10% 10% 40% 20%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <nav className="container absolute left-1/2 top-0 z-10 mx-auto flex h-fit w-full max-w-screen-xl -translate-x-1/2 transform items-center justify-between p-6 text-sunset-gold">
        <h1 className="font-black">GLOBETROTTERS.</h1>
        <ul className="absolute left-1/2 hidden xs:flex -translate-x-1/2 transform items-center gap-4 text-sm font-bold text-frost-blue">
          <li>
            <Link className="hover:text-sunset-blush" href={"/"}>
              home
            </Link>
          </li>
          <li>
            <Link className="hover:text-sunset-blush" href={"/escapes"}>
              escapes
            </Link>
          </li>
          <li>
            <Link className="hover:text-sunset-blush" href={"/blog"}>
              blog
            </Link>
          </li>
        </ul>
        <div className="flex gap-2 tracking-wider">
          <button
            onClick={() => router.push("/auth/signup")}
            className="border-2 border-sunset-gold px-4 py-2 text-xs font-bold transition-all duration-300 ease-in-out hover:bg-sunset-gold hover:text-midnight-blue"
          >
            HOP IN!
          </button>
        </div>
      </nav>
      <div
        id="video-frame"
        className="relative mx-auto flex h-screen w-full flex-col items-center justify-center tracking-wider"
      >
        <div className="absolute z-0">
          <video
            src="https://res.cloudinary.com/globetrotters/video/upload/f_auto:video,q_auto,e_accelerate:-50/v1/assets/kiitcqjb0ohzybe17ims"
            autoPlay
            muted
            loop
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          >
            video can&apos;t be played
          </video>
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-40"></div>
        </div>
        <div className="relative z-20 flex flex-col items-center gap-16 px-8 md:px-0">
          <div className="relative mt-8 w-fit flex-col text-center text-mist-blue sm:mt-0">
            <div className="flex justify-center xs:justify-between">
              <h3 className="z-20 mt-2 text-lg font-black tracking-widest xs:-ml-6">
                FIND YOUR
              </h3>
              <div className="absolute -top-10 z-10 flex w-fit items-center gap-1 rounded-sm p-1 text-[10px] font-semibold leading-[0.6] outline-dashed outline-1 xs:relative xs:top-auto">
                <h3 className="tracking-widest">POWERED BY AI</h3>
                <WiStars />
              </div>
            </div>
            <h1 className="inline font-dela text-6xl font-normal leading-[0.6] text-sunset-gold sm:text-7xl sm:font-semibold">
              next escape
            </h1>
          </div>

          <UiButton
            onClick={() => router.push("/auth/signup")}
            text="plan now"
            accentFill="sunset-blush"
            mainFill="sunset-gold"
            disabledFill="muted-foreground"
            textFill="midnight-blue"
          />
        </div>
        <div className="container relative -mb-40 mt-4 flex max-w-screen-xl items-end justify-between p-4 text-sunset-gold">
          <div className="flex flex-col gap-6 text-3xl">
            <Link
              className="transition-all duration-300 hover:text-sunset-blush"
              href={"https://chat.whatsapp.com/H1vSOT7kwQx8KfG10RkE0L"}
            >
              <IoLogoWhatsapp />
            </Link>
            <Link
              className="transition-all duration-300 hover:text-sunset-blush"
              href={"https://shorturl.at/KmTAd"}
            >
              <FaRedditAlien />
            </Link>
            <Link
              className="transition-all duration-300 hover:text-sunset-blush"
              href={"https://shorturl.at/KmTAd"}
            >
              <FaFacebook />
            </Link>
            <Link
              className="transition-all duration-300 hover:text-sunset-blush"
              href={"https://shorturl.at/KmTAd"}
            >
              <AiFillInstagram />
            </Link>
          </div>
          <div className="text-md flex origin-top-right translate-y-6 rotate-90 gap-4 font-normal tracking-widest transition-all duration-300 hover:text-sunset-blush">
            <h3 className="">EXPLORE</h3>
            <MdArrowRightAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
