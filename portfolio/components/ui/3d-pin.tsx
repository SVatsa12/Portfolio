"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "rotateX(0deg) scale(1)"
  );

  const onMouseEnter = () => {
    setTransform("rotateX(40deg) scale(0.8)");
  };

  const onMouseLeave = () => {
    setTransform("rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative z-50 cursor-pointer group/pin w-full",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => href && window.open(href, "_blank")}
    >
      {/*
        Perspective wrapper — gives the 3D tilt effect on hover.
        Uses w-full so it respects the grid column width instead of
        overflowing with a fixed pixel size.
      */}
      <div style={{ perspective: "1000px" }} className="w-full">
        <div
          style={{ transform, transition: "transform 700ms ease" }}
          className="w-full rounded-2xl border border-white/[0.1] bg-black-100 p-4
                     shadow-[0_8px_16px_rgb(0_0_0/0.4)]
                     group-hover/pin:border-white/[0.2]"
        >
          <div className={cn("relative z-50 w-full", className)}>
            {children}
          </div>
        </div>
      </div>

      {/* Hover overlay: label + ripple rings + pin needle */}
      <PinPerspective title={title} href={href} />
    </div>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 -top-10 z-[60]
                 flex h-40 w-full items-start justify-center
                 opacity-0 transition duration-500 group-hover/pin:opacity-100"
    >
      {/* Top label */}
      <div className="flex justify-center w-full">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto relative z-10 flex items-center space-x-2
                     rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10"
        >
          <span className="relative z-20 inline-block py-0.5 text-xs font-bold text-white">
            {title}
          </span>
          <span
            className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)]
                       bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0
                       transition-opacity duration-500 group-hover/btn:opacity-40"
          />
        </a>
      </div>

      {/* Ripple rings */}
      <div
        style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0)" }}
        className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 mt-4"
      >
        {[0, 2, 4].map((delay) => (
          <motion.div
            key={delay}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: [0, 1, 0.5, 0], scale: 1, z: 0 }}
            transition={{ duration: 6, repeat: Infinity, delay }}
            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem]
                       rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          />
        ))}
      </div>

      {/* Pin needle */}
      <div className="absolute left-1/2 top-full -translate-x-1/2">
        <motion.div className="h-20 w-px bg-gradient-to-b from-transparent to-cyan-500 blur-[2px] group-hover/pin:h-40 transition-all duration-500" />
        <motion.div className="absolute top-0 left-0 h-20 w-px bg-gradient-to-b from-transparent to-cyan-500 group-hover/pin:h-40 transition-all duration-500" />
        <motion.div className="absolute top-0 left-0 translate-x-[1.5px] h-[4px] w-[4px] rounded-full bg-cyan-600 blur-[3px]" />
        <motion.div className="absolute top-0 left-0 translate-x-[0.5px] h-[2px] w-[2px] rounded-full bg-cyan-300" />
      </div>
    </motion.div>
  );
};