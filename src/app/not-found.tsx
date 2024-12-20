import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 items-center justify-center bg-mist-blue px-4 dark:bg-midnight-blue selection:bg-golden-haze selection:text-midnight-blue">
      <Image
        src="/assets/logo.webp"
        height={200}
        width={200}
        alt="globetrotters mascot"
        className="select-none "
      />
      <h1 className="px-4 max-w-md text-center text-6xl font-bold text-sunset-blush dark:text-golden-haze">
        404
      </h1>
      <h1 className="mb-2 px-4 max-w-md text-center text-4xl font-bold text-midnight-blue dark:text-frost-blue">
        Trr trrr! You landed at wrong place.
      </h1>

      <Link
        href="/"
        className="text-center text-sm text-midnight-blue underline-offset-4 hover:underline dark:text-frost-blue"
      >
        Hop back home
      </Link>
    </div>
  );
}
