import { useRef, useState } from "react";
import { IconX, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

const VideoModal = ({ videoKey, onClose }: { videoKey: string | null; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <AnimatePresence>
      {videoKey && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-100 flex items-center justify-center bg-black/20 backdrop-blur-[20px] p-4 md:p-10'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className='relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls  */}
            <div className='absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-linear-to-b from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
              <h4 className='text-white font-montserrat font-medium'>Project Showcase</h4>
              <div className='flex gap-2'>
                <button
                  onClick={toggleFullscreen}
                  className='text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full'
                >
                  {isFullscreen ? <IconMinimize className='size-5' /> : <IconMaximize className='size-5' />}
                </button>
                <button
                  onClick={onClose}
                  className='text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full'
                >
                  <IconX className='size-5' />
                </button>
              </div>
            </div>

            <video ref={videoRef} src={videoKey} autoPlay controls className='w-full h-full object-contain' onEnded={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
