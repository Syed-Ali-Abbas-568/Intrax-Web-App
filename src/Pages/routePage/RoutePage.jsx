import React, { useState, useEffect } from 'react'
import { Navbar } from 'react-bootstrap'
import CustomDrawer from '../../components/Drawer'
import Container from 'react-bootstrap/Container';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import './RoutePage.css'
import { addRoutes, getRouteByID, getRoutes, getStationByID } from '../../services/RouteRequests';
import RouteForm from '../../components/RouteForm';
import Swal from 'sweetalert2';



function RoutePage() {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const [isAddRouteFormOpen, setAddRouteFormOpen] = useState(0);


    const handleAddRouteClick = () => {

        setAddRouteFormOpen(1);
    };





    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const routeData = await getRoutes();

            // Iterate through each route
            const routesWithStations = await Promise.all(routeData.map(async route => {
                // Fetch station names for start and end stations
                const startStation = await getStationByID(route.stations[0]); // First item is the start station
                const endStation = await getStationByID(route.stations[route.stations.length - 1]); // Last item is the end station

                // Extract station names
                const startStationName = startStation.name;
                const endStationName = endStation.name;

                // Return route data with station names
                return {
                    name: route.name,
                    id: route._id,
                    start: startStationName,
                    end: endStationName
                };
            }));

            console.log(routesWithStations)

            // Update state with routes containing station names
            setRoutes(routesWithStations);
        } catch (error) {
            console.log("Error Occurred: ", error);
        }
    };


    const handleViewStations = async (routeId) => {

        try {
            // Fetch route details including stations
            const routeDetails = await getRouteByID(routeId); // Replace with your API call to get route details
            setSelectedRoute(routeDetails);
        } catch (error) {
            console.error('Error fetching route details:', error);
        }
    };

    return (

        <div >
            <Navbar className="custom-bg">
                <CustomDrawer />
                <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DirectionsBusIcon style={{ color: 'BB1E10', width: '50px', height: '50px' }} />
                    <span style={{ fontSize: '20px', color: 'white' }}>Manage Routes</span>
                </Container>
            </Navbar>

            <div className="RoutePageHolder">
                {(!selectedRoute && isAddRouteFormOpen !== 1) && (
                    <>
                        <div className="title-holder">
                            <h1 className="title">Route Information</h1>
                            <button className="btn btn-secondary" onClick={() => { handleAddRouteClick() }}>Add Route</button>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Route Name</th>
                                    <th>Starting Station</th>
                                    <th>Ending Station</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map(route => (
                                    <tr key={route.id}>
                                        <td>{route.name}</td>
                                        <td>{route.start}</td>
                                        <td>{route.end}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleViewStations(route.id)}
                                            >
                                                View Stations
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>)
                }

                <div className="container">


                    {selectedRoute && (
                        <div className="RouteDetails">
                            <h2>Route: {selectedRoute.name} </h2>
                            <h2>Stations</h2>

                            <ol>
                                {selectedRoute.stations.map(stationId => (
                                    <li key={stationId}>
                                        <StationInfo stationId={stationId} />
                                    </li>
                                ))}
                            </ol>
                            <button type="button" className="btn btn-primary" onClick={() => { setSelectedRoute(null) }}>Back</button>

                        </div>
                    )}



                    {isAddRouteFormOpen === 1 && (
                        <>
                            <h3 className="text-center">Add New Route</h3>
                            <hr />

                            <RouteForm

                                handleAddRouteSubmit={async (newRoute) => {

                                    try {

                                        await addRoutes(newRoute);

                                        await fetchRoutes();
                                        // Display success SweetAlert
                                        Swal.fire('Success', 'Route Added successfully!', 'success');
                                        setAddRouteFormOpen(0);



                                    } catch (error) {
                                        Swal.fire('Error', 'Error Adding Route', 'error');

                                    }


                                }}

                                handleCancelSubmit={() => {
                                    setAddRouteFormOpen(0);

                                }}
                            />

                        </>
                    )}


                </div>

            </div>
        </div>
    );
}

function StationInfo({ stationId, setSelectedRoute }) {
    const [station, setStation] = useState(null);

    useEffect(() => {

        async function fetchData() {
            try {
                const stationInfo = await getStationByID(stationId);
                setStation(stationInfo)
            } catch (error) {
                console.error('Error fetching stations for route:', error)
            }
        }

        fetchData();
    }, [stationId]);

    if (!station) {
        return <div>Loading station information...</div>;
    }

    return (
        <div>
            <strong>{station.name}</strong>
            <br />
            Description:  {station.description}
            <br />
            Longitude: {station.longitude}, Latitude: {station.latitude}
            <br />

            <br />
        </div>
    );
}

export default RoutePage;