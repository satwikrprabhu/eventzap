import React from 'react'
import { GiPaperArrow } from "react-icons/gi"
import { BiChevronsDown } from "react-icons/bi"
import Typewriter from 'typewriter-effect';
const Achievements
 = () => {
  return (
    <div>
        <div className="h-screen flex items-center justify-center snap-start overflow-x-hidden">
        {/* <video src="https://player.vimeo.com/video/883950133?title=0&byline=0&portrait=0&playsinline=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&app_id=122963" className="h-screen w-full aspect-video absolute inset-0"></video> */}
        <video src="https://res.cloudinary.com/dh1bowbbe/video/upload/v1702448098/Incridea_2023___NMAMIT_NItte_qnn8ry.mp4" className="h-screen w-full absolute inset-0 object-cover -z-50" autoPlay muted controls={false} loop playsInline></video>
        <div className="bg-gradient-to-t from-black/50 to-black/50 h-screen w-full absolute inset-0 -z-20"></div>
        <div>
          <div className="font-rhomdon font-bold text-5xl sm:text-7xl md:text-8xl 2xl:text-8xl text-center heading1">
          <div className="fullscreen-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', fontWeight: 'bold', color: '#FFFFFF', margin: '20px', padding: '20px' }}>
      <div style={{ fontSize: '6rem', fontWeight: 'bold', color: '#FFFFFF' }}>
        <Typewriter
          options={{
            strings: ['Welcome to Eventzap!'],
            autoStart: true,
            loop: true,
            delay: 50,
          }}
        />
      </div>
    </div>
          </div>
        </div>
        <span className='animate-pulse fixed bottom-16 landscape:short:bottom-10 right-1/2 translate-x-1/2 -z-10'>
          <BiChevronsDown className='animate-arrow-down text-3xl'></BiChevronsDown>
        </span>
      </div>
    </div>
  )
}

export default Achievements
