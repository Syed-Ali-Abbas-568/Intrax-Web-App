import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import navicon from '../assets/navicon.png';
import staticMapImage from '../assets/maps.png';

import CustomDrawer from '../components/Drawer';

function CustomNavbar() {
  const backgroundStyle = {
    backgroundImage: `url(${staticMapImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const blinkingNaviconStyle = {
    width: '50px',
    height: '50px',
    animation: 'blink 1s infinite',
  };

  return (
    <div style={backgroundStyle}>
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
          <img src={navicon} alt="navicon" style={blinkingNaviconStyle} />
          <span style={{ fontSize: '20px', color: 'white' }}>Monitoring...</span>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
