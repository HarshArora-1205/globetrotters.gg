// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuGroup,
// } from "@/components/ui/dropdown-menu";
// import { LogOut } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
// import { logout } from "@/actions/logout";
// import Link from "next/link";
// import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/sections/navbar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Globetrotters",
  description: "Effortlessly plan your next trip with AI. Explore destinations, craft personalized itineraries, and enjoy seamless travel planning from start to finish.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="flex-col md:flex w-full">
      <SessionProvider session={session}>
        <Navbar />
        <div className="w-full bg-mist-blue dark:bg-midnight-blue selection:text-midnight-blue selection:bg-golden-haze text-midnight-blue dark:text-frost-blue">
          {children}
        </div>
        {/* <Toaster /> */}
      </SessionProvider>
    </div>
  );
}