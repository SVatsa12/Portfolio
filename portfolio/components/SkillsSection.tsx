"use client";

import React from "react";
import TextPressure from "./ui/TextPressure";

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

        {/* Marquee Scroll Container */}
        <div className="relative w-full overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .marquee {
              display: flex;
              animation: marquee 40s linear infinite;
              width: 200%;
            }
            
            .marquee:hover {
              animation-play-state: paused;
            }
            
            .marquee-content {
              display: flex;
              gap: 2rem;
              min-width: 50%;
              flex-shrink: 0;
            }
          `}</style>

          <div className="marquee">
            {/* First set */}
            <div className="marquee-content">
              {allSkills.map((skill, index) => (
                <div
                  key={`skill-1-${index}`}
                  className="flex items-center justify-center whitespace-nowrap"
                >
                  <div className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full hover:border-cyan-500 transition-colors duration-300 cursor-pointer group">
                    <span className="text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Second set (duplicate for seamless loop) */}
            <div className="marquee-content">
              {allSkills.map((skill, index) => (
                <div
                  key={`skill-2-${index}`}
                  className="flex items-center justify-center whitespace-nowrap"
                >
                  <div className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full hover:border-cyan-500 transition-colors duration-300 cursor-pointer group">
                    <span className="text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black-100 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black-100 to-transparent pointer-events-none z-10" />
        </div>

        {/* Skills Grid by Category */}
        <div className="mt-20 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skillCategories.map((category, idx) => (
              <div
                key={idx}
                className="p-8 min-h-[260px] flex flex-col bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 transition-colors duration-300"
              >
                <div className="w-full mb-6 pb-3 border-b border-slate-700/50">
                  <div className="relative w-full h-10 overflow-hidden">
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
                      minFontSize={18}
                      maxFontSize={22}
                      scale={false}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 flex-grow">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-slate-700/50 text-slate-200 rounded-md hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
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
