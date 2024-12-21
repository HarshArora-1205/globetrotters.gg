"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import { SearchPhotosResponse } from "@/types/unsplash-results";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  escape: string | string[] | undefined;
  subtext: string;
  lon: string;
  lat: string;
};

function convertToDMS(lat: string, lon: string): string {
  function toDMS(coordinate: number, isLatitude: boolean): string {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesDecimal = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60);

    const direction = isLatitude
      ? coordinate >= 0
        ? "N"
        : "S"
      : coordinate >= 0
        ? "E"
        : "W";

    return `${degrees}°${minutes}′${seconds}″${direction}`;
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  const latitudeDMS = toDMS(latitude, true);
  const longitudeDMS = toDMS(longitude, false);

  return `${latitudeDMS} ${longitudeDMS}`;
}

const fetchUnsplashPhotos = async (
  query: string,
): Promise<SearchPhotosResponse> => {
  const response = await fetch(
    `/api/unsplash/photos?query=${encodeURIComponent(query)}`,
  );
  if (!response.ok) throw new Error("Failed to fetch Unsplash photos");
  return response.json();
};

// !---- this effect was part of a tutorial: Olivier Larose ---->
const ZoomParallax = ({ escape, lat, lon, subtext }: Props) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });

  const {
    data: unsplashPhotos,
    isLoading: isLoadingUnsplashPhotos,
    error: unsplashError,
  } = useQuery<SearchPhotosResponse>({
    queryKey: ["unsplashPhotos", escape],
    queryFn: () => fetchUnsplashPhotos(String(escape)),
    enabled: !!escape,
  });

  const photos = (unsplashPhotos?.results || []).slice(0, 7);

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  if (unsplashError) {
    return (
      <div className="text-center text-red-500">
        <p>Failed to load images. Please try again later.</p>
      </div>
    );
  }

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
  const pictures = photos.map((photo, index) => ({
    src: photo.urls.regular,
    alt: photo.alt_description,
    hash: photo.blur_hash,
    username: photo.user.first_name,
    link: photo.user.links.html,
    scale: scales[index],
  }));

  const loc = convertToDMS(lat, lon);
  console.log(lat);
  console.log(lon);
  console.log(loc);
  return (
    <div ref={container} className="relative my-[5vh] h-[300vh] w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        {isLoadingUnsplashPhotos
          ? Array(7)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  key={index}
                  style={{ scale: scale4 }}
                  className="absolute top-0 flex h-full w-full items-center justify-center"
                >
                  <div
                    key={index}
                    className={`relative ${getImageStyles(index).container}`}
                  >
                    <div className="h-full w-full animate-pulse bg-primary/10" />
                  </div>
                </motion.div>
              ))
          : pictures.map((image, index) => {
              const imageStyles = getImageStyles(index);
              return (
                <motion.div
                  key={index}
                  style={{ scale: image.scale }}
                  className="absolute top-0 flex h-full w-full items-center justify-center"
                >
                  <div className={`relative ${imageStyles.container}`}>
                    {index === 0 && (
                      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-col text-center">
                          <h1 className="font-dela sm:text-xl md:text-2xl lg:text-4xl text-sunset-gold">
                            {escape}
                          </h1>
                          <p className="text-3xs sm:text-2xs md:text-xs font-extrabold uppercase tracking-widest text-frost-blue">
                            {subtext}
                          </p>
                        </div>
                        <p className="text-3xs font-light uppercase tracking-widest text-frost-blue">
                          {loc}
                        </p>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 z-50">
                      <Link
                        className="text-3xs text-frost-blue underline-offset-4 hover:underline"
                        href={image.link}
                      >
                        {image.username} | Unsplash
                      </Link>
                    </div>
                    <Image
                      src={image.src}
                      loading="eager"
                      fill
                      className={cn("object-cover brightness-50")}
                      alt={image.alt || "parallax image"}
                    />
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default ZoomParallax;

function getImageStyles(index: number) {
  const styles = [
    { container: "w-[25vw] h-[25vh]" },
    { container: "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]" },
    { container: "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]" },
    { container: "left-[27.5vw] w-[25vw] h-[25vh]" },
    { container: "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]" },
    { container: "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]" },
    { container: "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]" },
  ];

  return styles[index] || { container: "" };
}
