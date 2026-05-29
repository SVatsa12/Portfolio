"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import ScrambledText from "@/components/ui/ScrambledText";
import { FaLocationArrow } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiThreedotjs,
  SiFramer,
  SiReact,
} from "react-icons/si";

export default function AnimatedPinDemo() {
  const projects = [
    {
      id: 1,
      title: "AI Image SaaS - Canva Application",
      description:
        "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
      iconLists: [SiReact, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer],
      link: "https://github.com/SVatsa12",
    },
    {
      id: 2,
      title: "Animated Apple Iphone 3D Website",
      description:
        "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
      iconLists: [SiNextdotjs, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer],
      link: "https://github.com/SVatsa12",
    },
    {
      id: 3,
      title: "Post-it App",
      description:
        "A simple post-it app that allows you to create, edit, and delete notes. Built with React and Firebase.",
      iconLists: [SiReact, SiTailwindcss, SiTypescript, SiFramer],
      link: "https://github.com/SVatsa12",
    },
    {
      id: 4,
      title: "Modern Portfolio",
      description:
        "A modern and minimalistic portfolio built with Next.js, Framer Motion, and Tailwind CSS.",
      iconLists: [SiNextdotjs, SiTailwindcss, SiTypescript, SiFramer],
      link: "https://github.com/SVatsa12",
    },
  ];

  return (
    <div id="projects" className="py-20 w-full bg-black-100">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <ScrambledText
          radius={150}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:/*-+="
          className="text-white"
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Recent Projects
        </ScrambledText>
      </div>

      {/* Grid — two equal columns on md+, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto px-6">
        {projects.map(({ id, title, description, iconLists, link }) => (
          <PinContainer key={id} title="/shubhamvatsa.dev" href={link}>
            {/* Preview */}
            <div className="w-full overflow-hidden rounded-2xl bg-[#13162d] h-[220px] mb-6">
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-slate-500 font-bold opacity-20 text-4xl uppercase tracking-tighter">
                  Preview
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-bold text-xl line-clamp-1 text-white">
              {title}
            </h1>

            {/* Description */}
            <p className="text-sm font-light line-clamp-2 text-slate-400 mt-2">
              {description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 mb-2">
              <div className="flex items-center">
                {iconLists.map((Icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[0.2] rounded-full bg-black w-9 h-9 flex items-center justify-center"
                    style={{ transform: `translateX(-${5 * index * 2}px)` }}
                  >
                    <Icon className="p-2 text-white w-full h-full" />
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <p className="text-sm text-purple">Check Live Site</p>
                <FaLocationArrow className="ms-3" color="#CBACF9" />
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </div>
  );
}