import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import CustomDrawer from '../components/Drawer';
import '../components/Navbar.css';
import BusList from '../components/BusList';


import { getBuses, addBuses } from '../services/BusRequests'

function Buses() {
  const [buses, setBuses] = useState([]);  // State to manage the list of drivers

  //State to display any error that occurs due to call
  const [error, setError] = useState(null);



  const fetchData = async () => {
    try {
      // Call the API function from services
      const busesData = await getBuses();
      setBuses(busesData);
    } catch (error) {
      // Handle the error in a way that makes sense for your application
      setError(error.message || 'An error occurred');
    }
  };



  //use effect is used to mount and call functions on initial load of the page 

  useEffect(() => {



    fetchData()

  }, [])



  // Function to add a new bus to the list
  const addBus = async (bus) => {
    try {
      // Call the API function from services
      await addBuses(bus);
      fetchData()

      return true

    } catch (error) {

      if (error.response) {
        if (error.response.status === 409) {
          return false;
        }

      }
      else {
        setError(error.message || 'An error occurred');
      }
    }

  };

  //Conditional Rendering if there is an error, Display on web page
  if (error) {
    return <div>Error: {error}</div>;
  }
    return (
        <div>
          <Navbar className="custom-bg">
            <CustomDrawer />
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DirectionsBusIcon style={{ color: 'BB1E10', width: '50px', height: '50px' }} />
              <span style={{ fontSize: '20px', color: 'white' }}>Manage Buses</span>
            </Container>
          </Navbar>

          <BusList buses={buses} addBus={addBus} fetchBus={fetchData} />
        </div>
      );
}

export default Buses;