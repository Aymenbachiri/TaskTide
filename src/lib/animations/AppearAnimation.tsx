"use client";

import { motion } from "framer-motion";

type AppearAnimationProps = {
  children: React.ReactNode;
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function AppearAnimation({ children }: AppearAnimationProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
