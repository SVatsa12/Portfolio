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
  SiVite,
  SiFastapi,
  SiPostgresql
} from "react-icons/si";

export default function AnimatedPinDemo() {
  const projects = [
    {
      id: 1,
      title: "AI Project Manager",
      description:
        "AI-powered full-stack task & project management platform with smart allocation, real-time collaboration, and an interactive dashboard.",
      iconLists: [
        { Icon: SiReact, color: "#61DAFB" },
        { Icon: SiVite, color: "#646CFF" },
        { Icon: SiTailwindcss, color: "#38B2AC" },
        { Icon: SiTypescript, color: "#3178C6" },
        { Icon: SiFramer, color: "#0055FF" }
      ],
      link: "https://ai-project-manager-three.vercel.app/",
      img: "/ai_project_manager.png"
    },
    {
      id: 2,
      title: "StandNote",
      description:
        "An AI-powered note taking and live meeting application.",
      iconLists: [
        { Icon: SiReact, color: "#61DAFB" },
        { Icon: SiVite, color: "#646CFF" },
        { Icon: SiTailwindcss, color: "#38B2AC" },
        { Icon: SiTypescript, color: "#3178C6" },
        { Icon: SiThreedotjs, color: "#FFFFFF" },
        { Icon: SiFastapi, color: "#009688" },
        { Icon: SiPostgresql, color: "#4169E1" }
      ],
      link: "https://stand-note.vercel.app/",
      img: "/standnote.png"
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
        {projects.map(({ id, title, description, iconLists, link, img }) => (
          <PinContainer key={id} title="/shubhamvatsa.dev" href={link}>
            {/* Preview */}
            <div className="w-full overflow-hidden rounded-2xl bg-[#13162d] h-[220px] mb-6 relative">
              <img src={img} alt={title} className="w-full h-full object-cover" />
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
                {iconLists.map(({ Icon, color }, index) => (
                  <div
                    key={index}
                    className="border border-white/[0.2] rounded-full bg-black w-9 h-9 flex items-center justify-center"
                    style={{ transform: `translateX(-${5 * index * 2}px)` }}
                  >
                    <Icon className="p-2 w-full h-full" color={color} />
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