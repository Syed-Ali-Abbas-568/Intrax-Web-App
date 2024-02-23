import React from 'react';
import { useState,useEffect } from 'react';
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

  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Fetch station data from your API or any other source
    // Example:
    const fetchedStations = [
      { id:1, name: 'University of Education Station', lat: 31.45373167740481, lng: 74.29976828174222, desc:'College Road'},
      { id:2, name: 'Canal View Station', lat: 31.47378752023184, lng: 74.25045209984319, desc:'Canal Rd, Canal View'},
      { id:3, name: 'Judicial Colony Station', lat: 31.46999917790142, lng: 74.24480873214583, desc:'8, Block A Judicial Colony'},
      { id:4, name: 'FAST-NUCES Station', lat: 31.481640119526258, lng: 74.30300336728763, desc:'Faisal Town'},
      // Add more station objects as needed
    ];
    setStations(fetchedStations);
  }, []);

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
      <Map stations={stations}/>
    </div>
  );
}

export default CustomNavbar;
