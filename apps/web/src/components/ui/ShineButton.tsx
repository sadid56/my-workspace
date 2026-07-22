"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface Props {
  text: string;
  onClick?: () => void;
  url?: string;
}

const ShineButton: React.FC<Props> = ({ text, onClick, url }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundPosition: "100% 0" }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex h-10 md:h-11 items-center justify-center px-5 rounded-lg
                 bg-gradient-to-r from-purple-700 to-teal-700 bg-[length:200%_100%]
                 text-white font-medium uppercase transition-all duration-500
                 focus:outline-none shadow-lg"
    >
      <Link
        href={url || "#"}
        target={url ? "_blank" : undefined}
        onClick={onClick}
        className="w-full h-full flex items-center justify-center"
      >
        {text}
      </Link>
    </motion.div>
  );
};

export default ShineButton;
