import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import navicon from '../assets/navicon.png';
import Map from '../components/Map'; // Import the Map component

import CustomDrawer from '../components/Drawer';
import { getStations } from '../services/StationRequests';
import { getRoutes } from '../services/RouteRequests';





const sampleRoute = [
  {
    name: "Route 1",
    stations: [
      {
        stationName: "Station A",
        Latitude: 31.483781108996123,
        Longitude: 74.30316429996317
      },
      {
        stationName: "Station B",
        Latitude: 31.48185056083811,
        Longitude: 74.29943602937237
      },

    ]
  },
  {
    name: "Route 2",
    stations: [
      {
        stationName: "Station X",
        Latitude: 31.477792620013588,
        Longitude: 74.30114191435048
      },
      {
        stationName: "Station Y",
        Latitude: 31.48480126408731,
        Longitude: 74.30089515098588
      },
      {
        stationName: "Station Z",
        Latitude: 31.55480671320017,
        Longitude: 74.30474737053487
      }
    ]
  }
];






function CustomNavbar() {
  const blinkingNaviconStyle = {
    width: '50px',
    height: '50px',
    animation: 'blink 1s infinite',
  };

  const [stations, setStations] = useState([]);
  const [routes, setRoute] = useState([])
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const stationsData = await getStations();
        setStations(stationsData);


        const routeData = await getRoutes();
        setRoute(routeData)
      } catch (error) {
        setError(error.message || 'An error occurred');
      }
    };



    fetchData();
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



      <Map stations={stations} routes={routes} />

    </div>
  );
}

export default CustomNavbar;
