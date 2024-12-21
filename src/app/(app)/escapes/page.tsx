// import {auth} from "@/auth"
import SearchBar from "@/components/common/search-bar";
import { TrendingCarousel } from "@/components/common/trending-carousel";
import Image from "next/image";
// import { trendingPlaces } from "@/data/trending-places";

const page = async() => {
  // const session = await auth();
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center pt-20">
        <Image
          src="/assets/banner-search.webp"
          alt="login landscape"
          loading="lazy"
          layout="fill"
          objectFit="cover"
          className="brightness-50 z-0"
        />
        <div className="z-40 flex flex-col gap-6 mb-32">
          <h1 className="font-dela text-2xl sm:text-4xl text-sunset-gold">
            What&apos;s your next escape?
          </h1>
          <SearchBar />
        </div>
      </div>
      <div className="h-screen w-screen text-midnight-blue dark:text-frost-blue p-10 pt-20">
        <h1 className="font-dela text-4xl text-sunset-gold mb-2">
          trending places
        </h1>
        <p className="mb-4">explore top spots everyone&apos;s talking about.</p>
        <TrendingCarousel />
      </div>
    </>
  );
}

export default page;