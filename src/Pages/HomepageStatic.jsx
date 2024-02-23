import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import navicon from '../assets/navicon.png';
import Map from '../components/Map'; // Import the Map component

import CustomDrawer from '../components/Drawer';

function CustomNavbar() {
  const blinkingNaviconStyle = {
    width: '50px',
    height: '50px',
    animation: 'blink 1s infinite',
  };

  return (
    <div>
      <style>
        {`
          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
      <Navbar className="custom-bg">
        <CustomDrawer />
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Use the Map component here */}
          <img src={navicon} alt="navicon" style={blinkingNaviconStyle} />
          <span style={{ fontSize: '20px', color: 'white' }}>Monitoring</span>
        </Container>
        
      </Navbar>
      <Map/>
    </div>
  );
}

export default CustomNavbar;
