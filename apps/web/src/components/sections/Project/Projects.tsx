"use client";

import { useState } from "react";
import SectionTitle from "@/components/global/SectionTitle";
import projects from "@/data/projects";
import Container from "@/components/global/Container";
import Card from "./Card";
import VideoModal from "./VideoModal";

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <Container className='relative py-28 min-h-screen'>
      <SectionTitle text='Projects_' color='My' />
      <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20'>
        {projects.map((project, idx) => (
          <div key={idx} className='w-full h-auto min-h-[350px]'>
            <Card project={project} onPlayVideo={() => setActiveVideo(project.video_url)} />
          </div>
        ))}
      </div>

      <VideoModal videoKey={activeVideo} onClose={() => setActiveVideo(null)} />
    </Container>
  );
};

export default Projects;
