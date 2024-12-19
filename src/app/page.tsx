import Hero from "@/components/sections/hero";

export default function Home() {

  
  return (
    <main className="bg-midnight-blue overflow-hidden w-full selection:bg-golden-haze selection:text-midnight-blue max-w-[1536px]">
      <Hero />
      <section className="h-screen bg-red"></section>
    </main>
  );
}
