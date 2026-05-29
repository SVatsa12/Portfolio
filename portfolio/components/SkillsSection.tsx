"use client";

import React from "react";
import TextPressure from "./ui/TextPressure";
import LogoLoop from "./ui/LogoLoop";
import {
  DiJava,
  DiPython,
  DiJavascript,
  DiPostgresql,
  DiMongodb,
  DiMysql,
  DiReact,
  DiNodejs,
  DiHtml5,
  DiCss3,
  DiGit,
  DiDocker,
} from "react-icons/di";
import { 
  SiExpress, 
  SiFastapi, 
  SiPrisma, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiCplusplus,
  SiC 
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

interface SkillCategory {
  title: string;
  skills: string[];
}

const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      skills: ["Java", "Python", "JavaScript", "SQL", "C++", "C"],
    },
    {
      title: "Frontend & Web",
      skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      title: "Backend & Frameworks",
      skills: ["Node.js", "Express.js", "FastAPI"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Docker", "Prisma ORM", "VS Code"],
    },
    {
      title: "AI/ML",
      skills: [
        "Whisper",
        "Ollama",
        "LLM Pipelines",
        "Prompt Engineering",
        "WebSockets",
      ],
    },
    {
      title: "Core Concepts",
      skills: [
        "Data Structures & Algorithms",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "System Design",
      ],
    },
  ];

  // Flatten all skills for marquee
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const skillIconMap: { [key: string]: any } = {
    Java: DiJava,
    Python: DiPython,
    JavaScript: DiJavascript,
    SQL: DiPostgresql,
    "C++": SiCplusplus,
    C: SiC,
    "React.js": DiReact,
    "Next.js": SiNextdotjs,
    HTML: DiHtml5,
    CSS: DiCss3,
    "Tailwind CSS": SiTailwindcss,
    "Node.js": DiNodejs,
    "Express.js": SiExpress,
    FastAPI: SiFastapi,
    PostgreSQL: DiPostgresql,
    MongoDB: DiMongodb,
    MySQL: DiMysql,
    Git: DiGit,
    Docker: DiDocker,
    "Prisma ORM": SiPrisma,
    "VS Code": VscVscode,
  };

  const skillLogoItems = allSkills.map((skill) => {
    const IconComponent = skillIconMap[skill];
    // Don't show icons for AI/ML and Core Concepts Categories
    const showIcon = !skillCategories
      .filter(cat => cat.title === "AI/ML" || cat.title === "Core Concepts")
      .some(cat => cat.skills.includes(skill));
    
    return {
      node: (
        <div key={skill} className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full hover:border-cyan-500 transition-colors duration-300 cursor-pointer group flex items-center justify-center gap-2">
          {showIcon && IconComponent ? (
            <IconComponent size={18} className="text-cyan-400" />
          ) : showIcon && !IconComponent ? (
            <span className="text-cyan-400 font-bold text-xs tracking-tighter">{skill.charAt(0)}</span>
          ) : null}
          <span className="text-white/90 font-medium text-sm group-hover:text-cyan-300 transition-colors">
            {skill}
          </span>
        </div>
      ),
      title: skill,
    };
  });

  return (
    <section id="skills" className="w-full py-20 bg-black-100 overflow-hidden relative">
      {/* Decorative Background Text */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          fontSize: "200px",
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          lineHeight: "1",
        }}
      >
        SKILLS
      </div>

      {/* Content Container - Higher Z-index */}
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center mb-16 px-4 w-full">
          <div className="relative w-full max-w-xl h-24 md:h-36">
            <TextPressure
              text="Skills"
              fontFamily="Arial"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#FFFFFF"
              strokeColor="#FF0000"
              minFontSize={36}
              scale={true}
            />
          </div>
        </div>

        {/* Logo Loop Component */}
        <div className="relative w-full overflow-hidden mb-16">
          <LogoLoop
            logos={skillLogoItems}
            speed={5}
            direction="left"
            gap={20}
          />
        </div>

        {/* Skills Grid by Category */}
        <div className="mt-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <div
                key={idx}
                className="p-5 flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-all duration-500 group"
              >
                <div className="w-full mb-3 pb-2 border-b border-slate-700/50">
                  <div className="relative w-full h-8 overflow-hidden">
                    <TextPressure
                      text={category.title}
                      fontFamily="Arial"
                      flex={true}
                      alpha={false}
                      stroke={false}
                      width={true}
                      weight={true}
                      italic={true}
                      textColor="#22d3ee"
                      minFontSize={16}
                      maxFontSize={20}
                      scale={false}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => {
                    const IconComponent = skillIconMap[skill];
                    const showIcon = category.title !== "AI/ML" && category.title !== "Core Concepts";
                    return (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800/40 border border-slate-700/50 text-slate-300 text-xs hover:bg-slate-700 transition-colors"
                      >
                        {showIcon && IconComponent && (
                          <IconComponent size={14} className="text-cyan-500" />
                        )}
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
