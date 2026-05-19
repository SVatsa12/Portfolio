import React from 'react'
import { Spotlight } from './ui/spotlight'

const Hero = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden pb-20 pt-36'>
      <div>
        <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill="white"></Spotlight>
        <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill="purple"></Spotlight>
        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill="blue"></Spotlight>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black-100">
        <div className="pointer-events-none absolute inset-0 bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      
    </div>
  )
}

export default Hero
