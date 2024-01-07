import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import CustomDrawer from '../components/Drawer';
import DriverList from '../components/DriverList';  // Create a new component for displaying the list of drivers
import '../components/Navbar.css';

function Drivers() {
  const [drivers, setDrivers] = useState([]);  // State to manage the list of drivers

  //useEffect()



  // Function to add a new driver to the list
  const addDriver = (driver) => {
    setDrivers([...drivers, driver]);
  };

  return (
    <div>
      <Navbar className="custom-bg">
        <CustomDrawer />
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DirectionsBusIcon style={{ color: 'BB1E10', width: '50px', height: '50px' }} />
          <span style={{ fontSize: '20px', color: 'white' }}>Manage Drivers</span>
        </Container>
      </Navbar>

      {/* Pass the drivers list and the addDriver function to the DriverList component */}
      <DriverList drivers={drivers} addDriver={addDriver} />
    </div>
  );
}

export default Drivers;
