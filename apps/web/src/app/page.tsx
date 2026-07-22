import Achievements from "@/components/sections/Achivement/Achivement";
import Projects from "@/components/sections/Project/Projects";
import DynamicBackground from "@/components/global/DynamicBackground";
import Hero from "@/components/sections/Hero/Hero";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import Experience from "@/components/sections/Experience/Experience";
import Skills from "@/components/sections/Skills/Skills";
import { Suspense } from "react";

export default async function Home() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Navbar />
      <Hero />
      <div className='block lg:hidden'>
        <Suspense>
          <Skills />
        </Suspense>
      </div>
      <Experience />
      <Achievements />
      <Projects />
      <Footer />
    </DynamicBackground>
  );
}
