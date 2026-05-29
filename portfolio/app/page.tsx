"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";
import dynamic from "next/dynamic";
import PillNav from "@/components/ui/PillNav";

const AnimatedPinDemo = dynamic(() => import("@/components/3d-pin-demo"), {
  ssr: false,
});

export default function Home() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Approach", href: "#how-i-work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black-100">
      <PillNav
        logo="/nav-logo.svg"
        logoAlt="Shubham Vatsa Logo"
        items={navItems}
        activeHref="#about"
        baseColor="#050a24"
        pillColor="#000319"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#ffffff"
      />
      <Hero />
      <About />
      <section id="projects">
        <AnimatedPinDemo />
      </section>
      <HowIWork />
      <SkillsSection />
      <Contact />
    </main>
  );
}
