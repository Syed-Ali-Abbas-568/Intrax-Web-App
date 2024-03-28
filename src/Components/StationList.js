import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import StationForm from './StationForm';

const StationList = ({ stations, addStation, fetchStation }) => {
  const [isAddStationFormOpen, setAddStationFormOpen] = useState(false);

  const [newStation, setNewStation] = useState({
    name: '',
    latitude: '',
    longitude: ''
  });

  const handleAddStationClick = () => {
    setAddStationFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewStation({ ...newStation, [name]: value });
  };

  const handleCancelSubmit = () => {
    setNewStation({
      name: '',
      latitude: '',
      longitude: ''
    });
    setAddStationFormOpen(false);
  };

  const handleAddStationSubmit = async () => {
    try {
      await addStation(newStation);
      fetchStation();
      setNewStation({
        name: '',
        latitude: '',
        longitude: ''
      });
      setAddStationFormOpen(false);
      Swal.fire('Success', 'Station added successfully!', 'success');
    } catch (error) {
      console.error('Error adding station:', error);
      Swal.fire('Error', 'Failed to add station', 'error');
    }
  };

  const renderStationRows = () => {
    if (stations.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center">
            No stations found
          </td>
        </tr>
      );
    }

    return stations.map((station) => (
      <tr key={station._id}>
        <td>{station.name}</td>
        <td>{station.latitude}</td>
        <td>{station.longitude}</td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      {!isAddStationFormOpen && (
        <button className="btn btn-primary float-end" onClick={handleAddStationClick}>
          + Station
        </button>
      )}

      {isAddStationFormOpen && (
        <>
          <h3 className="text-center">Add Station</h3>
          <hr />
          <StationForm
            newStation={newStation}
            handleFormChange={handleFormChange}
            handleSubmit={handleAddStationSubmit}
            handleCancel={handleCancelSubmit}
          />
        </>
      )}

      {!isAddStationFormOpen && (
        <>
          <h3 className="text-center">Stations List</h3>
          <hr />
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>{renderStationRows()}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StationList;
