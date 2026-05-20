content = r'''\"use client\";

import React from \"react\";

interface SkillCategory {
  title: string;
  skills: string[];
}

const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: \"Languages\",
      skills: [\"Java\", \"Python\", \"JavaScript\", \"SQL\", \"C++\", \"C\"],
    },
    {
      title: \"Frontend & Web\",
      skills: [\"React.js\", \"Next.js\", \"HTML\", \"CSS\", \"Tailwind CSS\"],
    },
    {
      title: \"Backend & Frameworks\",
      skills: [\"Node.js\", \"Express.js\", \"FastAPI\"],
    },
    {
      title: \"Databases\",
      skills: [\"PostgreSQL\", \"MongoDB\", \"MySQL\"],
    },
    {
      title: \"Tools & Technologies\",
      skills: [\"Git\", \"Docker\", \"Prisma ORM\", \"VS Code\"],
    },
    {
      title: \"AI/ML\",
      skills: [
        \"Whisper\",
        \"Ollama\",
        \"LLM Pipelines\",
        \"Prompt Engineering\",
        \"WebSockets\",
      ],
    },
    {
      title: \"Core Concepts\",
      skills: [
        \"Data Structures & Algorithms\",
        \"DBMS\",
        \"Operating Systems\",
        \"Computer Networks\",
        \"System Design\",
      ],
    },
  ];

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  return (
    <section id=\"skills\" className=\"w-full py-20 bg-black-100 overflow-hidden\">
      <div className=\"relative z-10\">
        <div className=\"mb-12 px-4\">
          <h2 className=\"text-4xl md:text-5xl font-bold text-white text-center\">
            Skills
          </h2>
        </div>

        <div className=\"relative w-full overflow-hidden mb-16\">
          <style>{\@keyframes marquee {
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
        \}</style>

        <div className=\"marquee\">
          {allSkills.map((skill, index) => [
            <div
              key={\skill-1-\\}
              className=\"flex items-center justify-center whitespace-nowrap\"
            >
              <div className=\"px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full hover:border-cyan-500 transition-colors duration-300 cursor-pointer group\">
                <span className=\"text-white font-medium text-sm group-hover:text-cyan-300 transition-colors\">
                  {skill}
                </span>
              </div>
            </div>,
            <div
              key={\skill-2-\\}
              className=\"flex items-center justify-center whitespace-nowrap\"
            >
              <div className=\"px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full hover:border-cyan-500 transition-colors duration-300 cursor-pointer group\">
                <span className=\"text-white font-medium text-sm group-hover:text-cyan-300 transition-colors\">
                  {skill}
                </span>
              </div>
            </div>,
          ])}
        </div>

        <div className=\"absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black-100 to-transparent pointer-events-none z-10\" />
        <div className=\"absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black-100 to-transparent pointer-events-none z-10\" />
        </div>

        <div className=\"px-4 max-w-6xl mx-auto mt-20\">
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className=\"p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-colors duration-300\"
            >
              <div className=\"w-full mb-4 pb-2 border-b border-slate-700/50\">
                <h3 className=\"text-xl font-semibold text-cyan-400\">
                  {category.title}
                </h3>
              </div>
              <div className=\"flex flex-wrap gap-2\">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className=\"px-3 py-1 text-sm bg-slate-700/50 text-slate-200 rounded-md hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors\"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
''''
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Written', len(content), 'chars')
