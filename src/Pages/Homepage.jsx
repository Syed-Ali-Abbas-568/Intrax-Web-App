import React from 'react';

import '../components/Navbar.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import CustomDrawer from '../components/Drawer';

import navicon from '../assets/navicon.png';

import { MapContainer, TileLayer } from 'react-leaflet';

import { useEffect } from 'react';

export default function Homepage() {





  return (
    <div>

      <Navbar className="custom-bg">
        <CustomDrawer />
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={navicon} alt="navicon" style={{ width: '50px', height: '50px' }} />
          <span style={{ fontFamily: 'Poppins-Bold', fontSize: '20px', color: 'white' }}>Monitoring...</span>
        </Container>
      </Navbar>
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={13}
        style={{ height: 'calc(100vh - 56px)' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
      </MapContainer>
    </div>
  )
}