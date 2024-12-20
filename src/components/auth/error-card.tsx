import Image from "next/image";

import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/common/mode-toggle";
import Link from "next/link";

const ErrorCard = () => {
  return (
    <div className="flex h-full w-full selection:bg-golden-haze selection:text-midnight-blue">
      <div className="relative hidden md:block md:w-[50%] lg:w-[60%]">
        <Image
          src="/assets/banner.webp"
          alt="login landscape"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-mist-blue">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-wider text-sunset-gold">
              GLOBETROTTERS.
            </h1>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-sunset-blush">Ribbit! We&apos;ve hit a snag!</p>
            <h2 className="max-w-md lg:max-w-lg text-2xl font-bold leading-tight lg:text-3xl">
            Looks like our lily pad took an unexpected dive. Don&apos;t worry, Froggo&apos;s on the case to hop us back to safety!
            </h2>
          </div>
          <div />
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-mist-blue p-8 dark:bg-midnight-blue md:w-[50%] lg:w-[40%]">
        <div className="flex w-full max-w-md flex-col gap-4 md:max-w-full">
          <div className="mb-4 select-none">
            <Image
              src="/assets/logo.webp"
              height={200}
              width={200}
              loading="lazy"
              alt="globetrotters mascot"
              className="select-none"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <h1 className="flex w-fit text-2xl font-bold tracking-wider text-midnight-blue dark:text-frost-blue">
              GLOBETROTTERS.
            </h1>
            <ModeToggle />
          </div>
          <p className="max-w-md mb-8 border-l border-l-rose-500 pl-6 text-sm text-rose-500">
            TRRR TRRRRR! Froggo here! Seems like we&apos;ve hopped into uncharted waters. This lily pad doesn&apos;t exist in our pond. Let&apos;s leap back to familiar grounds!
          </p>
          <Link
            className={cn(
              "mt-2 text-center text-sm text-midnight-blue underline-offset-4 hover:underline dark:text-frost-blue",
            )}
            href="/auth/signin"
          >
            go back to signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
