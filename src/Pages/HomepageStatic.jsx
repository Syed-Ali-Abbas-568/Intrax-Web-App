import React from 'react';
import '../Components/Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CustomDrawer from '../Components/Drawer';

import navicon from '../imgs/navicon.png';
import staticMapImage from '../imgs/maps.png';

function CustomNavbar() {
  const backgroundStyle = {
    backgroundImage: `url(${staticMapImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <div style={backgroundStyle}>
      <Navbar className="custom-bg">
        <CustomDrawer />
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={navicon} alt="navicon" style={{ width: '50px', height: '50px' }} />
          <span style={{ fontSize: '20px', color: 'white' }}>Monitoring...</span>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
