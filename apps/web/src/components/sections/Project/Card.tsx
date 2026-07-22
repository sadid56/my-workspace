import { LinkPreview } from "@/components/ui/LinkPreview";
import { IconBrandGithub, IconPlayerPlay, IconServer, IconWorld } from "@tabler/icons-react";
import BoxReveal from "@/components/ui/BoxReveal";
import Image from "next/image";

const Card = ({ project, onPlayVideo }: { project: any; onPlayVideo: () => void }) => {
  const borderGradient = `conic-gradient(from 0deg at 50% 50%, 
    #03e8f4 0%, 
    rgba(3,232,244,0.3) 5%, 
    transparent 15%, 
    rgba(106,90,205,0.3) 22%, 
    #6a5acd 25%, 
    rgba(106,90,205,0.3) 28%, 
    transparent 35%, 
    rgba(3,232,244,0.3) 55%, 
    #03e8f4 60%, 
    rgba(3,232,244,0.3) 65%, 
    transparent 70%, 
    rgba(106,90,205,0.3) 87%, 
    #6a5acd 90%, 
    rgba(3,232,244,0.9) 93%
  )`;

  // Limit technologies shown to keep cards uniform and professional
  const maxVisibleTechs = 4;
  const visibleTechs = project?.technology.slice(0, maxVisibleTechs);
  const remainingCount = project?.technology.length - maxVisibleTechs;

  return (
    <div
      className='rounded-2xl p-px relative overflow-hidden h-full w-full shadow-2xl transition-all duration-500 group/card flex flex-col'
      style={{
        background: borderGradient,
      }}
    >
      {/* Static Glassy Highlight Overlay */}
      <div className='absolute inset-0 bg-white/5 opacity-40 mix-blend-overlay pointer-events-none' />

      <div className='flex flex-col rounded-2xl h-full bg-[#0a0a0a] shadow-inner p-4 relative z-10 overflow-hidden transition-all duration-500 group-hover/card:bg-[#0d0d0d] flex-grow'>
        {/* Subtle static inner glow */}
        <div className='absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none' />

        {/* Thumbnail - Aspect Ratio 16:9 */}
        <div className='w-full rounded-xl overflow-hidden relative cursor-pointer aspect-video mb-4' onClick={onPlayVideo}>
          <Image
            src={project?.project_thumnail}
            alt={project?.project_name}
            width={800}
            height={450}
            className='w-full h-full object-cover transition-all duration-700 group-hover/card:scale-105 group-hover/card:opacity-60 ease-out'
          />

          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='bg-white/10 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center transform scale-90 group-hover/card:scale-100 transition-all duration-500 border border-white/20 shadow-2xl'>
              <IconPlayerPlay className='text-white size-6 fill-white' />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className='flex flex-col justify-between flex-grow'>
          <div>
            <div className='flex justify-between items-start gap-2 mb-2'>
              <h3 className='text-lg font-bold text-white font-montserrat tracking-tight leading-tight group-hover/card:text-[#03e8f4] transition-colors duration-500'>
                <BoxReveal duration={0.8}>
                  <span>{project?.project_name}</span>
                </BoxReveal>
              </h3>
              {project?.company && (
                <div className='px-2.5 py-0.5 bg-[#03e8f4]/10 border border-[#03e8f4]/30 rounded-full flex items-center justify-center'>
                  <p className='text-[8px] uppercase tracking-[0.2em] font-black text-[#03e8f4] whitespace-nowrap'>
                    {project.company.name}
                  </p>
                </div>
              )}
            </div>

            <p className='text-xs text-slate-400 font-poppins line-clamp-3 leading-relaxed mb-4'>
              {project?.description}
            </p>

            {/* Technologies */}
            <div className='flex flex-wrap gap-1.5 mb-6'>
              {visibleTechs.map((tech: string, i: number) => (
                <span
                  key={i}
                  className='px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-slate-300 font-medium hover:border-[#03e8f4]/40 hover:bg-[#03e8f4]/5 transition-all duration-300'
                >
                  {tech}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className='px-2 py-0.5 bg-white/5 border border-white/15 rounded-md text-[10px] text-slate-400 font-medium'>
                  +{remainingCount}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex items-center justify-between mt-auto pt-4 border-t border-white/5'>
            <div className='flex gap-3'>
              {project?.client_github_link && (
                <LinkPreview url={project?.client_github_link}>
                  <div className='text-slate-500 hover:text-[#03e8f4] transition-all duration-300 transform hover:scale-110 cursor-pointer'>
                    <IconBrandGithub className='size-4' />
                  </div>
                </LinkPreview>
              )}
              {project?.server_github_link && (
                <LinkPreview url={project?.server_github_link}>
                  <div className='text-slate-500 hover:text-[#03e8f4] transition-all duration-300 transform hover:scale-110 cursor-pointer'>
                    <IconServer className='size-4' />
                  </div>
                </LinkPreview>
              )}
            </div>

            {project?.live_link && (
              <LinkPreview url={project?.live_link}>
                <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-500 font-bold text-[10px] group/btn bg-white/5 text-white hover:bg-white/10 border border-white/10 cursor-pointer'>
                  <span className='tracking-wide uppercase'>Live Preview</span>
                  <IconWorld className='size-3 group-hover/btn:rotate-12 transition-transform' />
                </div>
              </LinkPreview>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
