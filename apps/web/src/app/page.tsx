import Hero from "@/components/sections/Hero/Hero";
import Experience from "@/components/sections/Experience/Experience";
import Skills from "@/components/sections/Skills/Skills";

export default async function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
    </>
  );
}
