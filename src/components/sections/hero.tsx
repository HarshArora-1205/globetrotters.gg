"use client";
import { ScrollTrigger } from "gsap/all";

import Link from "next/link";

import { WiStars } from "react-icons/wi";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaRedditAlien } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

import { cn } from "@/lib/utils";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);

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
    <div className="relative h-dvh w-screen overflow-x-hidden">
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
            style={{ width: "100dvw", height: "100dvh", objectFit: "cover" }}
          >
            video can&apos;t be played
          </video>
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-40"></div>
        </div>
        <div className="relative z-20 flex flex-col items-center gap-16 px-8 md:px-0">
          <div className="text-mist-blue relative mt-8 w-fit flex-col text-center sm:mt-0">
            <div className="xs:justify-between flex justify-center">
              <h3 className="xs:-ml-6 mt-1 text-lg font-black tracking-widest">
                FIND YOUR
              </h3>
              <div className="xs:relative xs:top-auto absolute -top-10 z-10 flex w-fit items-center gap-1 rounded-sm p-2 text-[10px] font-semibold leading-[0.6] outline-dashed outline-1">
                <h3 className="tracking-widest">POWERED BY AI</h3>
                <WiStars />
              </div>
            </div>
            <h1 className="text-sunset-gold inline font-dela text-6xl font-normal leading-[0.6] sm:text-7xl sm:font-semibold">
              next escape
            </h1>
          </div>

          {/* <UiButton text="plan now" accentFill="sunset-blush" mainFill="sunset-gold" disabledFill="" textFill="sunset-gold"/> */}
          <button
            className={cn(
              `group relative px-6 py-2 text-base font-bold tracking-widest focus:outline-none`,
              `bg-sunset-gold text-midnight-blue hover:bg-sunset-blush disabled:bg-muted-foreground disabled:hover:bg-current`,
            )}
          >
            <div
              className={cn(
                `absolute inset-0 z-10 translate-x-1 translate-y-1 transform border-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0`,
                `border-sunset-gold group-hover:border-sunset-blush`,
              )}
            ></div>
            <span className="relative z-20 inline-block uppercase transition-transform duration-300 group-active:translate-x-0.5 group-active:translate-y-0.5">
              plan now
            </span>
          </button>
        </div>
        <div className="text-sunset-gold container relative -mb-40 mt-4 flex max-w-screen-xl items-end justify-between p-4">
          <div className="flex flex-col gap-6 text-3xl">
            <Link
              className="hover:text-sunset-blush transition-all duration-300"
              href={"https://chat.whatsapp.com/H1vSOT7kwQx8KfG10RkE0L"}
            >
              <IoLogoWhatsapp />
            </Link>
            <Link
              className="hover:text-sunset-blush transition-all duration-300"
              href={"https://shorturl.at/KmTAd"}
            >
              <FaRedditAlien />
            </Link>
            <Link
              className="hover:text-sunset-blush transition-all duration-300"
              href={"https://shorturl.at/KmTAd"}
            >
              <FaFacebook />
            </Link>
            <Link
              className="hover:text-sunset-blush transition-all duration-300"
              href={"https://shorturl.at/KmTAd"}
            >
              <AiFillInstagram />
            </Link>
          </div>
          <div className="text-md flex origin-top-right translate-y-6 rotate-90 gap-4 font-normal tracking-widest">
            <h3 className="">EXPLORE</h3>
            <MdArrowRightAlt />
          </div>
        </div>
      </div>
      <div className="text-md flex origin-top-right translate-y-6 rotate-90 gap-4 font-normal tracking-widest">
        <h3 className="">EXPLORE</h3>
        <MdArrowRightAlt />
      </div>
    </div>
  );
};

export default Hero;
