import { Hero } from "@/components/hero";
import { StoryProvider } from "@/components/story";
import { Reveal } from "@/components/reveal";
import { Companies, Contact, Experience, Footer, Principles, Stack, Work } from "@/components/sections";

export default function Home() {
  return (
    <StoryProvider>
      <main id="top">
        <Hero />
        <Companies />
        <Work />
        <Principles />
        <Experience />
        <Stack />
        <Contact />
        <Footer />
      </main>
      <Reveal />
    </StoryProvider>
  );
}
