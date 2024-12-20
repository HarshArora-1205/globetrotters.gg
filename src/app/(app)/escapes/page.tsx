import {auth} from "@/auth"
import SearchBar from "@/components/common/search-bar";
import Image from "next/image";
const page = async() => {
  const session = await auth();
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center !bg-rose-400 pt-20">
        <Image
          src="/assets/banner.webp"
          alt="login landscape"
          loading="lazy"
          layout="fill"
          objectFit="cover"
          className="brightness z-0"
        />
        <div className="z-40 flex flex-col gap-6">
          <h1 className="font-dela text-2xl sm:text-4xl text-sunset-gold">
            What&apos;s your next escape?
          </h1>
          {/* <Input
        // value={input}
        className='border font-bold border-sunset-gold h-12 w-md text-sunset-gold'/> */}
          <SearchBar />
        </div>
      </div>
      <div className="h-screen w-screen pt-20">
        <h1 className="font-dela text-4xl text-sunset-gold">
          What&apos;s your next escape?
        </h1>
        <div>{JSON.stringify(session?.user)}</div>
      </div>
    </>
  );
}

export default page;