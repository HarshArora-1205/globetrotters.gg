import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { type TrendingPlace } from "@/types/trending-places";

interface PlaceCardProps {
  place: TrendingPlace;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const { name, image, likes, address_obj } = place;

  return (
    <Link
      href={`/escapes/${place.location_id}?escape=${name}&city=${address_obj.city || ""}&country=${address_obj.country}`}
      className="block w-full"
    >
      <div className="bg-midnight-blue p-2.5 dark:bg-frost-blue/80">
        <div className="group relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="border-2 border-frost-blue dark:border-midnight-blue object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/70 via-midnight-blue/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-3">
            <h3 className="mb-1 line-clamp-1 font-dela text-lg text-frost-blue">
              {name}
            </h3>
            <div className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-frost-blue" />
              <span className="text-xs text-frost-blue">{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
