import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col gap-4 items-center justify-center bg-mist-blue dark:bg-midnight-blue">
      <Image
        src="/assets/logo.webp"
        height={200}
        width={200}
        alt="globetrotters mascot"
        className="animate-bounce-inertia mb-6 select-none"
      />
      <div className="relative">
        <h1 style={{
            WebkitTextStroke: "1px #D8A748", 
          }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform stroke-sunset-gold text-6xl font-black text-transparent ">
          LOADING
        </h1>
        <h1 className="animate-wave absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-6xl font-black text-sunset-gold">
          LOADING
        </h1>
      </div>
    </div>
  );
}
