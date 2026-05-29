"use client";

import React from "react";
import CircularGallery from "./ui/CircularGallery";
import TextPressure from "./ui/TextPressure";

const GallerySection = () => {
  return (
    <section id="gallery" className="w-full py-20 bg-black-100 flex flex-col items-center">
       {/* Section Heading */}
       <div className="flex flex-col items-center justify-center mb-10 px-4 w-full">
        <div className="relative w-full max-w-xl h-24 md:h-36">
          <TextPressure
            text="Visual Journey"
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

      <div className="w-full h-[600px] relative mt-10">
        <CircularGallery 
            items={[
              { visibleTrait: "Problem Solver", realityText: "I dive deep into complexity to find simple, scalable solutions." },
              { visibleTrait: "Continuous Learner", realityText: "Always exploring new tech stack, libraries, and frameworks." },
              { visibleTrait: "Detail Oriented", realityText: "Crafting pixel-perfect designs with smooth interactions." },
              { visibleTrait: "Collaborative Partner", realityText: "Thriving in team environments with clear communication." },
              { visibleTrait: "Innovator", realityText: "Always looking for ways to push the boundaries of what's possible." }
            ]}
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            scrollEase={0.02}
        />
      </div>
    </section>
  );
};

export default GallerySection;
