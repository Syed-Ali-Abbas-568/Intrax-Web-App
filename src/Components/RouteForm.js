import React, { useEffect, useState } from 'react';
import FormField from './FormField';
import { getAllStations } from '../services/RouteRequests';
import '../pages/routePage/RoutePage.css'

const RouteForm = ({
    handleAddRouteSubmit,
    handleCancelSubmit,
    ButtonName = 'Submit',
}) => {
    const [stationOptions, setStationOptions] = useState([]);
    const [selectedStations, setSelectedStations] = useState([]);

    const [newRoute, setNewRoute] = useState({
        name: '',
        stations: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const stations = await getAllStations();
                setStationOptions(stations);
                console.log('Stations:', stations); // Log stations fetched
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        }
        fetchData();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewRoute(prevRoute => ({ ...prevRoute, [name]: value }));
    };

    const handleStationChange = (stationId) => {
        const index = selectedStations.indexOf(stationId);
        if (index === -1) {
            setSelectedStations([...selectedStations, stationId]);
        } else {
            setSelectedStations(selectedStations.filter(id => id !== stationId));
        }
    };

    const handleRemoveStation = (stationId) => {
        setSelectedStations(prevStations => prevStations.filter(id => id !== stationId));
        handleFormChange({ target: { name: 'stations', value: newRoute.stations.filter(id => id !== stationId) } });
    };

    const addnewRoute = () => {
        const updatedRoute = {
            name: newRoute.name,
            stations: selectedStations
        };

        console.log(updatedRoute); // Log the updated route

        handleAddRouteSubmit(updatedRoute);

    }

    return (<>
        <form className="mt-4 formstyle">
            <FormField
                label="Route Name"
                type="text"
                id="name"
                name="name"
                value={newRoute.name}
                onChange={handleFormChange}
            />
            <div>
                <h4>Select Stations:</h4>
                {stationOptions.map(station => (
                    <div className="option" key={station._id}>
                        <label className="label" htmlFor={station._id}>{station.name}</label>
                        <input
                            className="checkbox"
                            type="checkbox"
                            id={station._id}
                            name="stations"
                            value={station._id}
                            checked={selectedStations.includes(station._id)}
                            onChange={() => handleStationChange(station._id)}
                        />

                    </div>
                ))}
            </div>
            <div>
                <h4>Selected Stations:</h4>
                <ol>
                    {selectedStations.map(stationId => (
                        <li key={stationId}>
                            {stationOptions.find(station => station._id === stationId)?.name}{' '}
                            <button type="button" onClick={() => handleRemoveStation(stationId)}>Remove</button>
                        </li>
                    ))}
                </ol>
            </div>

        </form >
        <div >
            <button type="button" className="btn btn-success " onClick={addnewRoute}>{ButtonName}</button>
            <button type="button" className="btn btn-danger buttonright" onClick={handleCancelSubmit}>Cancel</button>
        </div>
    </>
    );
};

export default RouteForm;
