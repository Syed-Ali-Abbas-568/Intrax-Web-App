import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PlaceIcon from '@mui/icons-material/Place';

import CustomDrawer from '../components/Drawer';
import StationList from '../components/StationList';
import { getStations, addStation, updateStation, deleteStation } from '../services/StationRequests';

function Stations() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  const fetchStations = async () => {
    try {
      const stationsData = await getStations();
      setStations(stationsData);
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const addNewStation = async (station) => {
    try {
      await addStation(station);
      fetchStations();
      return true;
    } catch (error) {
      setError(error.message || 'An error occurred');
      return false;
    }
  };

  const updateExistingStation = async (station) => {
    try {
      await updateStation(station);
      fetchStations();
      return true;
    } catch (error) {
      setError(error.message || 'An error occurred');
      return false;
    }
  };

  const deleteExistingStation = async (id) => {
    try {
      await deleteStation(id);
      fetchStations();
      return true;
    } catch (error) {
      setError(error.message || 'An error occurred');
      return false;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar className="custom-bg">
        <CustomDrawer />
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlaceIcon style={{ color: '#BB1E10', width: '50px', height: '50px' }} />
          <span style={{ fontSize: '20px', color: 'white' }}>Manage Stations</span>
        </Container>
      </Navbar>
      <StationList
        stations={stations}
        addStation={addNewStation}
        updateStation={updateExistingStation}
        deleteStation={deleteExistingStation}
        fetchStations={fetchStations}
      />
    </div>
  );
}

export default Stations;
