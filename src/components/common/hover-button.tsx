"use client";

import { useTheme } from "next-themes"
import { signIn } from "next-auth/react"
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type ButtonProps = {
  arialabel: string;
  text: string;
  icon?: React.ReactElement
  variant: "frost" | "night" | "sunset" | "auto";
  provider?: "google" | "instagram"
  onClick?: () => void;
};

// !---- Learn't framer customization from Olivier Larose's & James' Youtube Channel ---->
const MagicButton = ({ text, variant, icon, arialabel, onClick, provider }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [style, setStyle] = useState<"frost" | "night" | "sunset">("frost");

  const { theme } = useTheme()
  useEffect(() => {
    if(variant === "auto"){
      if(theme === "dark"){
        setStyle("frost");
      } else {
        setStyle("night")
      }
    }
  }, [theme, variant])

  const login = (provider: "instagram" | "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div
      aria-label={arialabel}
      onClick={provider ? () => login(provider) : onClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center justify-center gap-2 overflow-clip border bg-transparent p-3 pt-4 transition-all duration-200 ease-in-out",
        isHovered
          ? style === "frost"
            ? "border-frost-blue text-midnight-blue"
            : style === "night" 
              ? "border-midnight-blue text-frost-blue"
              : "border-sunset-gold text-midnight-blue"
          : style === "frost"
            ? "border-frost-blue text-frost-blue"
            : style === "night" 
              ? "border-midnight-blue text-midnight-blue"
              : "border-sunset-gold text-sunset-gold",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cn(
          "absolute left-4 z-0 h-2 w-2 rounded-full sm:left-8 md:left-12",
          style === "frost" 
            ?  "bg-frost-blue" 
            : style === "night" ? "bg-midnight-blue" : "bg-sunset-gold",
        )}
        animate={{
          scale: isHovered ? 160 : 1,
        }}
        transition={{
          ease: "easeInOut",
          type: "tween",
          duration: 0.2,
        }}
      ></motion.div>

      <motion.div
        className="z-10 text-sm font-bold uppercase leading-none tracking-widest"
        animate={{
          x: isHovered ? -30 : 0,
        }}
        transition={{
          damping: 20,
        }}
      >
        <p>{text}</p>
      </motion.div>
      {icon && (
        <motion.div
          className={cn("z-10")}
          animate={{
            x: isHovered ? 4 : 0,

          }}
          transition={{
            damping: 20,
          }}
        >
          {icon}
        </motion.div>
      )}
      <motion.div
        className={cn(
          "absolute right-4 flex items-center justify-center md:right-12",
          isHovered ? "flex" : "hidden",
        )}
      >
        <FaArrowRightLong className="" />
      </motion.div>
    </div>
  );
};

export default MagicButton;
