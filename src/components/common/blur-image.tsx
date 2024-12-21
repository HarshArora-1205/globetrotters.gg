"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import useNextBlurhash from "use-next-blurhash";

type Props = {
  className?: string;
  src: string;
  alt: string;
  hash: string;
};

export const BlurImage = ({className, src, alt, hash}: Props) => {
  const [blurDataUrl] = useNextBlurhash(hash);

  return (
    <Image
      src={src}
      fill
      className={cn("object-cover brightness-75", className)}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataUrl}
    />
  );
};
