import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  textFill: string;
  mainFill: string;
  accentFill: string;
  disabledFill: string;
  text: string;
  disabled?: boolean;
};

const UiButton = ({
  text,
  disabled,
  textFill,
  mainFill,
  accentFill,
  disabledFill,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        `group relative px-6 py-2 text-base font-bold tracking-widest focus:outline-none disabled:cursor-not-allowed`,
        `bg-${mainFill} text-${textFill} hover:bg-${accentFill} disabled:bg-${disabledFill}`,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 z-10 translate-x-1 translate-y-1 transform border-2 transition-transform duration-200",
          "group-hover:translate-x-0.5 group-hover:translate-y-0.5",
          "group-active:translate-x-0 group-active:translate-y-0",
          "group-disabled:translate-x-1 group-disabled:translate-y-1",
          `border-${mainFill}`,
          `group-hover:border-${accentFill}`,
          `group-disabled:border-muted-foreground`,
        )}
      ></div>
      <span
        className={cn(
          `relative z-20 inline-block uppercase transition-transform duration-75`,
          "group-active:translate-x-0.5 group-active:translate-y-0.5",
          `group-disabled:translate-x-0 group-disabled:translate-y-0`,
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default UiButton;
