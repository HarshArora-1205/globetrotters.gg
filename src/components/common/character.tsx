"use client"

import { useScroll, useTransform, motion, MotionValue } from 'motion/react';
import React, { useRef } from 'react';

interface ParagraphProps {
  paragraph: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

// !--- This navbar was a part of tutorial by Olivier Larose ---->
export default function Paragraph({ paragraph }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = paragraph.split(" ");

  return (
    <p 
      ref={container}         
      className="flex sm:text-xl md:text-2xl lg:text-4xl leading-loose p-10 max-w-4xl text-midnight-blue dark:text-frost-blue flex-wrap"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
      })}
    </p>
  );
}

const Word = ({ children, progress, range }: WordProps) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className={"relative mr-3 mt-3"}>
      {children.split("").map((char, i) => {
        const start = range[0] + (i * step);
        const end = range[0] + ((i + 1) * step);
        return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>;
      })}
    </span>
  );
};

const Char = ({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span>
      <span className={"absolute opacity-20"}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};