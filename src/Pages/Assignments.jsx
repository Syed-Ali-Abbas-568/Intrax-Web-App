import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CustomDrawer from '../components/Drawer';
import { getAllDetailedAssignments, addAssignment, deleteAssignment, updateAssignment } from '../services/AssignmentRequests';
import { getBuses } from '../services/BusRequests';
import { getRoutes } from '../services/RouteRequests';

function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null);
    const [newAssignment, setNewAssignment] = useState({ shiftname: '', assignedRoute: '', assignedBus: '' });

    const fetchData = async () => {
        try {
            const assignmentsData = await getAllDetailedAssignments();
            const busesData = await getBuses();
            const routesData = await getRoutes();
            setBuses(busesData);
            setRoutes(routesData);
            setAssignments(assignmentsData)
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAssignment({ ...newAssignment, [name]: value });
    };

    const handleAddAssignment = async () => {
        try {
            await addAssignment(newAssignment);
            fetchData();
            setNewAssignment({ shiftname: '', assignedRoute: '', assignedBus: '' });
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
    };

    const handleDeleteAssignment = async (id) => {
        try {
            await deleteAssignment(id);
            fetchData();
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
    };

    const handleUpdateAssignment = async (id) => {
        try {
            await updateAssignment(id, newAssignment);
            fetchData();
            setNewAssignment({ shiftname: '', assignedRoute: '', assignedBus: '' });
        } catch (error) {
            setError(error.message || 'An error occurred');
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
                    <span style={{ fontSize: '20px', color: 'white' }}>Manage Assignments</span>
                </Container>
            </Navbar>
            <Container>
                <div>
                    <h1>Assignments</h1>
                    <div>
                        <input
                            type="text"
                            name="shiftname"
                            value={newAssignment.shiftname}
                            onChange={handleInputChange}
                            placeholder="Shift Name"
                        />
                        <select name="assignedRoute" value={newAssignment.assignedRoute} onChange={handleInputChange}>
                            <option value="">Select Route</option>
                            {routes.map(route => (
                                <option key={route._id} value={route._id}>{route.name}</option>
                            ))}
                        </select>
                        <select name="assignedBus" value={newAssignment.assignedBus} onChange={handleInputChange}>
                            <option value="">Select Bus</option>
                            {buses.map(bus => (
                                <option key={bus._id} value={bus._id}>{bus.busNumber}</option>
                            ))}
                        </select>
                        <button onClick={handleAddAssignment}>Add Assignment</button>
                    </div>
                    <div>
                        <h2>Assignment List</h2>
                        <ul>
                            {assignments.map(assignment => (
                                <li key={assignment._id}>
                                    {assignment.shiftname} - {assignment.assignedRoute.name} - {assignment.assignedBus.busNumber}
                                    <button onClick={() => handleUpdateAssignment(assignment._id)}>Update</button>
                                    <button onClick={() => handleDeleteAssignment(assignment._id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Assignments;
