"use client";

import React from "react";
import { Rocket, Code2, BookOpen, Users, Lightbulb } from "lucide-react";
import TextPressure from "./ui/TextPressure";

const cards = [
  {
    visibleTrait: "Fast Delivery",
    realityText: "I time-box tasks, cut scope smartly, and ship what matters first.",
    icon: <Rocket className="w-12 h-12 text-cyan-400" />,
    smallIcon: <Rocket className="w-6 h-6 text-cyan-400" />,
  },
  {
    visibleTrait: "Clean Code",
    realityText: "I think about the next developer who reads this — including future me.",
    icon: <Code2 className="w-12 h-12 text-cyan-400" />,
    smallIcon: <Code2 className="w-6 h-6 text-cyan-400" />,
  },
  {
    visibleTrait: "Quick Learner",
    realityText: "I read docs before Stack Overflow. I understand tools before I use them.",
    icon: <BookOpen className="w-12 h-12 text-cyan-400" />,
    smallIcon: <BookOpen className="w-6 h-6 text-cyan-400" />,
  },
  {
    visibleTrait: "Good Collaborator",
    realityText: "I ask the right questions early so the whole team avoids rework later.",
    icon: <Users className="w-12 h-12 text-cyan-400" />,
    smallIcon: <Users className="w-6 h-6 text-cyan-400" />,
  },
  {
    visibleTrait: "Problem Solver",
    realityText: "I don't just fix the bug — I find why it happened and make sure it can't happen again.",
    icon: <Lightbulb className="w-12 h-12 text-cyan-400" />,
    smallIcon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
  },
];

const FlipCard = ({ card }: { card: typeof cards[0] }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Return to front after 3 seconds on mobile
  React.useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => setIsFlipped(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  return (
    <div 
      className="group h-60 perspective-1000 w-full cursor-pointer transition-transform duration-300 active:scale-95"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative h-full w-full transition-all duration-700 transform-3d ${isFlipped ? "rotate-y-180" : "group-hover:rotate-y-180"}`}>
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-2xl border border-white/10 bg-[#0d1224] p-6 backface-hidden flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="mb-4 flex justify-center">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-white text-center w-full">{card.visibleTrait}</h3>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-2xl border border-cyan-400/30 bg-[#161b33] p-6 backface-hidden rotate-y-180 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full text-center">
            <div className="mb-2 flex justify-center">
              {card.smallIcon}
            </div>
            <p className="text-white text-base md:text-lg font-medium leading-tight px-2">
              {card.realityText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HowIWork() {
  return (
    <section id="how-i-work" className="w-full py-16 bg-black-100 flex flex-col items-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center mb-10 px-4 w-full h-32 md:h-48 overflow-visible">
          <div className="w-full max-w-[90vw] md:max-w-4xl mx-auto flex justify-center">
            <TextPressure
              text="How I Work"
              fontFamily="Archivo, sans-serif"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#FFFFFF"
              strokeColor="#FF0000"
              minFontSize={48}
              maxFontSize={48}
              scale={true}
            />
          </div>
        </div>

        {/* 3+2 Grid Layout */}
        <div className="max-w-6xl mx-auto">
          {/* First Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {cards.slice(0, 3).map((card, idx) => (
              <FlipCard key={idx} card={card} />
            ))}
          </div>
          
          {/* Second Row: 2 Cards centered */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:w-2/3 mx-auto">
            {cards.slice(3, 5).map((card, idx) => (
              <div key={idx} className="w-full md:w-1/2">
                <FlipCard card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center text-slate-500 text-sm font-light animate-pulse">
          Hover over the cards to see the reality
        </div>
      </div>
    </section>
  );
}

