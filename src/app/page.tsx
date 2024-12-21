import Hero from "@/components/sections/hero";
import ScrollText from "@/components/sections/scroll-text";

export default function Home() {

  
  return (
    <main className="bg-midnight-blue overflow-hidden w-full selection:bg-golden-haze selection:text-midnight-blue max-w-[1536px]">
      <Hero />
      <section className="h-screen">
        <ScrollText />
      </section>
    </main>
  );
}
