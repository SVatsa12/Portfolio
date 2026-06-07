"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DynamicText({
  phrases,
  interval = 3000,
}: {
  phrases: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <div className="relative flex justify-center h-[1.5em] w-full overflow-visible">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: -20, opacity: 0, x: "-50%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute left-1/2 whitespace-nowrap text-cyan-400"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
