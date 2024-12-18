// "use client"
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <h1 className="text-center w-full">Welcome to Globetrotters - Froggo</h1>
      <ModeToggle />
    </div>
  );
}
