"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { Spotlight } from './ui/spotlight'
import SplitText from './ui/SplitText'

const RippleGrid = dynamic(() => import('./ui/RippleGrid'), { ssr: false })

const Hero = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden pb-20 pt-36'>
      <div>
        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill="white"></Spotlight>
        <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill="purple"></Spotlight>
        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill="blue"></Spotlight>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 bg-black-100/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="absolute inset-x-0 top-16 flex h-[34rem] w-full items-center justify-center bg-transparent sm:top-20">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
          fadeDistance={1.5}
          vignetteStrength={2.0}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black-100/25 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
        <div className='absolute left-1/2 top-36 z-20 flex -translate-x-1/2 justify-center text-center sm:top-48'>
          <div className='flex max-w-[89vw] flex-col items-center gap-4'>
            <SplitText
              tag="h1"
              text="Shubham Vatsa"
              className="text-5xl font-bold uppercase tracking-widest text-white sm:text-7xl"
              delay={70}
              duration={0.7}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 38 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <p className="max-w-[90vw] text-sm font-medium tracking-[0.18em] text-white-100/80 sm:text-base">
              Full-Stack Developer &middot; Building AI-powered, scalable systems.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
