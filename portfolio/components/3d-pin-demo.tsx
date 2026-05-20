"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import ScrambledText from "@/components/ui/ScrambledText";

export default function AnimatedPinDemo() {
  const projects = [
    {
      title: "Aceternity UI",
      href: "https://twitter.com/mannupaaji",
      description: "Customizable Tailwind CSS and Framer Motion Components.",
      gradient: "from-violet-500 via-purple-500 to-blue-500",
    },
    {
      title: "Next.js App",
      href: "https://nextjs.org",
      description: "The React Framework for Production.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      title: "Web Design",
      href: "https://example.com",
      description: "Modern and Minimalistic Design Systems.",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      title: "Dev Tools",
      href: "https://example.com",
      description: "Essential Tools for Web Development.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="w-full py-20 bg-black-100">
      <div className="flex flex-col items-center justify-center mb-12">
        <ScrambledText
          radius={150}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:/*-+="
          className="text-white"
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Projects
        </ScrambledText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
        {projects.map((project, index) => (
          <div key={index} className="h-[28rem] flex items-center justify-center">
            <PinContainer
              title={project.title}
              href={project.href}
              containerClassName="w-full h-full"
            >
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-full h-full">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold text-2xl text-slate-100">
                  {project.title}
                </h3>
                <div className="text-xs !m-0 !p-0 font-normal">
                  <span className="text-slate-500">{project.description}</span>
                </div>
                <div className={`flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br ${project.gradient}`} />
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
