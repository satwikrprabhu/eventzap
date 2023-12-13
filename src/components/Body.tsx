import React from 'react';
import { animated, useSpring } from 'react-spring';

import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const Body: React.FC = () => {
  // Add a fade-in animation to the main content
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }, // Adjust the duration as needed
  });

  return (
    <animated.main style={fadeInProps} className="container mx-auto mt-16 text-center bg-background text-foreground">
      {/* Video Section */}
      <div className="mt-12 flex justify-center items-center">
        <video className="max-w-screen-xl w-full" autoPlay muted loop>
          <source src="https://res.cloudinary.com/dh1bowbbe/video/upload/v1702448098/Incridea_2023___NMAMIT_NItte_qnn8ry.mp4" type="video/mp4" />
        {/* <First /> */}
          Your browser does not support the video tag.
        </video>
      </div>  

    
      {/* this is the image sectin what i made */}
      <div className="mt-12 p-6 lg:p-12 bg-secondary text-white rounded-lg shadow-lg">
  <h3 className="section-heading text-3xl font-semibold mb-4">
    <span className="text-primary">Crafting Experiences</span>
  </h3>
  <div className="flex flex-col lg:flex-row">
    {/* First Image */}
    <img
      className="lg:w-1/2 lg:pr-4 transform transition-transform hover:scale-105"
      src="https://media.istockphoto.com/id/1247853982/photo/cheering-crowd-with-hands-in-air-at-music-festival.jpg?s=612x612&w=0&k=20&c=rDVKf3hTryuVgUZUme9wuwfsegfJptAvVEKsDwppvJc="
      alt="Event Image 1"
    />

    
    <img
      className="lg:w-1/2 lg:pl-4 transform transition-transform hover:scale-105"
      src="https://media.istockphoto.com/id/1300325367/photo/this-concert-is-next-level.jpg?s=612x612&w=0&k=20&c=6pbuYR9rEm3FNznrTJ06n9QcGlrN3divVp0Y8kHXhiE="
      alt="Event Image 2"
    />
  </div>
  <p className="text-lg text-gray-200 leading-relaxed my-4 opacity-80 hover:opacity-100 text-center">
    Elevating moments into unforgettable memories, we specialize in crafting exceptional experiences that resonate. Whether it's a corporate gathering, a vibrant concert, or any special occasion, we bring creativity and precision to every detail, ensuring your event is nothing short of extraordinary.
  </p>
</div>







      {/* ths is the about us section  */}
      <div className="mt-12 p-8 lg:p-12 bg-secondary text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <h3 className="section-heading text-4xl font-bold mb-8 text-center hover:text-gray-400 transition-colors duration-300">
  <span className="text-gray-200 opacity-80 hover:opacity-100">About</span> <span className="text-gray-200 opacity-80 hover:opacity-100">Us</span>
</h3>


  <p className="text-xl text-gray-200 leading-relaxed my-4 opacity-80 hover:opacity-100 text-center">
  Certainly! Here's a condensed version of the text:

"Welcome to our world of exceptional events! As top-notch Corporate Event Planners in Bangalore, we transform your dreams into reality. Our dynamic team combines creativity and expertise to deliver cutting-edge, professional event management services. From concept to execution, we ensure perfection, crafting unforgettable experiences that exceed expectations."
  </p>
</div>

      {/* Add some space */}
      <div className="mt-8" />

      {/* Footer */}
      {/* ... (Previous code for Footer) ... */}
    </animated.main>
  );
};

export default Body;
