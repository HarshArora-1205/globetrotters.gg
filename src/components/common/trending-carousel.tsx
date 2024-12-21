"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { trendingPlaces as places } from "@/data/trending-places";
import { TrendingPlace } from "@/types/trending-places";
import { PlaceCard } from "./place-card";

export function TrendingCarousel() {
  const placePairs = places.reduce<TrendingPlace[][]>((acc, place, index) => {
    if (index % 2 === 0) {
      acc.push([place, places[index + 1]].filter(Boolean));
    }
    return acc;
  }, []);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {placePairs.map((pair, index) => (
            <CarouselItem
              key={index}
              className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4"
            >
              <div className="grid grid-rows-2 gap-2 md:gap-4">
                {pair.map((place) => (
                  <PlaceCard key={place.location_id} place={place} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
