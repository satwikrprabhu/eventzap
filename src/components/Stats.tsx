import React from 'react';
import { useSpring, animated } from 'react-spring';

const StatsComponent = () => {
  const flipAnimation = useSpring({
    from: { transform: 'rotateY(0deg)' },
    to: { transform: 'rotateY(360deg)' },
  });

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">OUR STATS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <animated.div
          style={{ ...flipAnimation, willChange: 'transform' }}
          className="card bg-dark p-8 flex flex-col items-center justify-center hover:rotateY-180"
        >
          <p className="text-6xl font-bold text-white">10</p>
          <p className="text-lg text-white">Years of Experience</p>
        </animated.div>

        <animated.div
          style={{ ...flipAnimation, willChange: 'transform' }}
          className="card bg-dark p-8 flex flex-col items-center justify-center hover:rotateY-180"
        >
          <p className="text-6xl font-bold text-white">300</p>
          <p className="text-lg text-white">Happy Clients</p>
        </animated.div>

        <animated.div
          style={{ ...flipAnimation, willChange: 'transform' }}
          className="card bg-dark p-8 flex flex-col items-center justify-center hover:rotateY-180"
        >
          <p className="text-6xl font-bold text-white">400+</p>
          <p className="text-lg text-white">Locations Covered</p>
        </animated.div>

        <animated.div
          style={{ ...flipAnimation, willChange: 'transform' }}
          className="card bg-dark p-8 flex flex-col items-center justify-center hover:rotateY-180"
        >
          <p className="text-6xl font-bold text-white">5000+</p>
          <p className="text-lg text-white">Projects Completed</p>
        </animated.div>
      </div>
    </div>
  );
};

export default StatsComponent;
