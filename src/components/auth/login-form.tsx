import Image from "next/image";

import { FaGoogle } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/common/mode-toggle";
import MagicButton from "@/components/common/hover-button/hover-button";
import Link from "next/link";

const LoginForm = () => {
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
            <p className="text-lg text-sunset-blush">Hola Hoppers!</p>
            <h2 className="max-w-md lg:max-w-lg text-2xl font-bold leading-tight lg:text-3xl">
              Ready to hop in? Log in now or create an account to let Froggo
              craft your unforgettable travel experiences!
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
          <p className="max-w-md mb-8 border-l border-l-midnight-blue pl-6 text-sm text-midnight-blue dark:border-l-frost-blue dark:text-frost-blue">
            TRRR TRRRRR! Welcome back to Globetrotters, where every hop brings
            you closer to your next adventure! Let Froggo guide you to an
            incredible journey ahead!
          </p>
          <div className="my-2 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-midnight-blue dark:bg-frost-blue"></div>
            <span className="px-2 text-sm font-medium uppercase text-midnight-blue dark:text-frost-blue">
              sign in
            </span>
            <div className="h-px flex-1 bg-midnight-blue dark:bg-frost-blue"></div>
          </div>
          <form className="w-full space-y-6">
            <MagicButton
              arialabel="insta signin button"
              text="sign in with instagram"
              variant="auto"
              icon={<FaInstagram className="h-4 w-4" />}
            />
            <MagicButton
              arialabel="google signin button"
              text="sign in with google"
              variant="auto"
              icon={<FaGoogle className="h-4 w-4" />}
            />
          </form>
          <Link
            className={cn(
              "mt-2 text-center text-sm text-midnight-blue underline-offset-4 hover:underline dark:text-frost-blue",
            )}
            href="/auth/signup"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
