"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
      <motion.div
        className="w-32 h-32 bg-blue-500 opacity-30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-32 h-32 bg-purple-500 opacity-30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
