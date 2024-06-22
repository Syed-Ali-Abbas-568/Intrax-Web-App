import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import CustomDrawer from '../components/Drawer';
import DriverList from '../components/DriverList';  // Create a new component for displaying the list of drivers
import '../components/Navbar.css';

import { getDrivers, addDrivers } from '../services/DriverRequests'

function Drivers() {
    const [drivers, setDrivers] = useState([]);  // State to manage the list of drivers

    //State to display any error that occurs due to call
    const [error, setError] = useState(null);



    const fetchData = async () => {
        try {
            // Call the API function from services
            const driversData = await getDrivers();
            setDrivers(driversData);
        } catch (error) {
            // Handle the error in a way that makes sense for your application
            setError(error.message || 'An error occurred');
        }
    };



    //use effect is used to mount and call functions on initial load of the page 

    useEffect(() => {



        fetchData()

    }, [])



    // Function to add a new driver to the list
    const addDriver = async (driver) => {
        try {
            // Call the API function from services
            await addDrivers(driver);
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
                    <span style={{ fontSize: '20px', color: 'white' }}>Manage Drivers</span>
                </Container>
            </Navbar>

            {/* Pass the drivers list and the addDriver function to the DriverList component */}
            <DriverList drivers={drivers} addDriver={addDriver} fetchDriver={fetchData} />
        </div>
    );
}

export default Drivers;


// import React, { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import CustomDrawer from '../components/Drawer';
// import DriverList from '../components/DriverList';
// import { getDrivers, addDrivers, getAllDetailedAssignments } from '../services/DriverRequests';  // Import getAssignments function
// import '../components/Navbar.css';

// function Drivers() {
//     const [drivers, setDrivers] = useState([]);
//     const [assignments, setAssignments] = useState([]);  // State to manage assignments
//     const [error, setError] = useState(null);

//     const fetchData = async () => {
//         try {
//             const driversData = await getDrivers();
//             setDrivers(driversData);
//             const assignmentsData = await getAllDetailedAssignments();  // Fetch assignments
//             setAssignments(assignmentsData);
//         } catch (error) {
//             setError(error.message || 'An error occurred');
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <Navbar className="custom-bg">
//                 <CustomDrawer />
//                 <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <DirectionsBusIcon style={{ color: 'BB1E10', width: '50px', height: '50px' }} />
//                     <span style={{ fontSize: '20px', color: 'white' }}>Manage Drivers</span>
//                 </Container>
//             </Navbar>

//             <DriverList drivers={drivers} assignments={assignments} fetchDriver={fetchData} />
//         </div>
//     );
// }

// export default Drivers;
