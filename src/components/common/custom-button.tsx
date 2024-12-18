import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  textFill: string;
  mainFill: string;
  accentFill: string;
  disabledFill: string;
  text: string
};

const UiButton = ({ text, textFill, mainFill, accentFill, disabledFill }: Props) => {
  return (
    <button
      className={cn(
        `group relative px-6 py-2 text-base font-bold tracking-widest focus:outline-none`,
        `bg-${mainFill} text-${textFill} hover:bg-${accentFill} disabled:bg-${disabledFill}`,
      )}
    >
      <div
        className={cn(
          `absolute inset-0 z-10 translate-x-1 translate-y-1 transform border-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0`,
          `border-${mainFill} group-hover:border-${accentFill}`,
        )}
      ></div>
      <span className="relative uppercase z-20 inline-block transition-transform duration-75 group-active:translate-x-0.5 group-active:translate-y-0.5">
        {text}
      </span>
    </button>
  );
};

export default UiButton;
