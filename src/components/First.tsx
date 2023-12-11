import React from 'react';
import Typewriter from 'typewriter-effect';

const TaglineVariation1 = () => {
  return (
    <div className="fullscreen-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', fontWeight: 'bold', color: '#FFFFFF', margin: '20px', padding: '20px' }}>
      <div style={{ fontSize: '6rem', fontWeight: 'bold', color: '#FFFFFF' }}>
        <Typewriter
          options={{
            strings: ['Turning Dreams into Reality!'],
            autoStart: true,
            loop: true,
            delay: 50,
          }}
        />
      </div>
    </div>
  );
};

export default TaglineVariation1;
