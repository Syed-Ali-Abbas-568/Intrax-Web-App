import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Navbar from 'react-bootstrap/Navbar';
import Typography from '@mui/material/Typography';
import CustomDrawer from '../components/Drawer';
import AssignmentList from '../components/AssignmentList';
import { getAllDetailedAssignments, addAssignment } from '../services/AssignmentRequests';
import { getBuses } from '../services/BusRequests';
import { getRoutes } from '../services/RouteRequests';
import '../components/Navbar.css';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const assignmentsData = await getAllDetailedAssignments();
      const busesData = await getBuses();
      const routesData = await getRoutes();
      setBuses(busesData);
      setRoutes(routesData);
      setAssignments(assignmentsData);
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddAssignment = async (newAssignment) => {
    try {
      await addAssignment(newAssignment);
      fetchData();
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
          <Typography variant="h6" style={{ color: 'white' }}>Manage Assignments</Typography>
        </Container>
      </Navbar>
      <Container>
        <AssignmentList
          assignments={assignments}
          buses={buses}
          routes={routes}
          addAssignment={handleAddAssignment}
          fetchAssignments={fetchData}
        />
      </Container>
    </div>
  );
}

export default Assignments;
