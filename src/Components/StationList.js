import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StationForm from './StationForm';
import { deleteStation, updateStation } from '../services/StationRequests';
import { FaTrash, FaEdit } from 'react-icons/fa';

const StationList = ({ stations, addStation, fetchStations }) => {
  const [isAddStationFormOpen, setAddStationFormOpen] = useState(0);
  const [newStation, setNewStation] = useState({
    name: '',
    latitude: '',
    longitude: '',
    description: '',
  });

  const handleAddStationClick = () => {
    setAddStationFormOpen(1);
  };

  const handleEditStationClick = (station) => {
    setNewStation(station);
    setAddStationFormOpen(2);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewStation({ ...newStation, [name]: value });
  };

  const handleCancelSubmit = () => {
    setNewStation({
      name: '',
      latitude: '',
      longitude: '',
      description: '',
    });
    setAddStationFormOpen(0);
  };

  const validateStation = (station) => {
    if (!station.name || !station.latitude || !station.longitude || !station.description) {
      Swal.fire('Error', 'All fields are required', 'error');
      return false;
    }

    const latitude = parseFloat(station.latitude);
    const longitude = parseFloat(station.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      Swal.fire('Error', 'Latitude and Longitude must be valid numbers', 'error');
      return false;
    }

    return true;
  };

  const handleAddStationSubmit = async () => {
    if (!validateStation(newStation)) {
      return;
    }

    try {
      await addStation(newStation);
      setNewStation({
        name: '',
        latitude: '',
        longitude: '',
        description: '',
      });
      setAddStationFormOpen(0);
      Swal.fire('Success', 'Station added successfully!', 'success');
      fetchStations();
    } catch (error) {
      console.error('Error adding station:', error);
      Swal.fire('Error', 'Failed to add station', 'error');
    }
  };

  const handleUpdateStation = async () => {
    if (!validateStation(newStation)) {
      return;
    }

    try {
      await updateStation(newStation);
      setNewStation({
        name: '',
        latitude: '',
        longitude: '',
        description: '',
      });
      setAddStationFormOpen(0);
      Swal.fire('Success', 'Station updated successfully!', 'success');
      fetchStations();
    } catch (error) {
      console.error('Error updating station:', error);
      Swal.fire('Error', 'Failed to update station', 'error');
    }
  };

  const handleRemoveStation = async (id) => {
    try {
      await deleteStation(id);
      fetchStations();
      Swal.fire('Deleted!', 'Station has been removed.', 'success');
    } catch (error) {
      console.error('Error deleting station:', error);
      Swal.fire('Error:', 'Failed to delete station', 'error');
    }
  };

  const renderStationRows = () => {
    if (stations.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
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
        <td>{station.description}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={() => handleRemoveStation(station._id)}>
            <FaTrash />
          </button>
        </td>
        <td>
          <button className="btn btn-info btn-sm" onClick={() => handleEditStationClick(station)}>
            <FaEdit />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      {isAddStationFormOpen === 0 && (
        <button className="btn btn-primary float-end" onClick={handleAddStationClick}>
          + Station
        </button>
      )}

      {isAddStationFormOpen === 1 && (
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

      {isAddStationFormOpen === 2 && (
        <>
          <h3 className="text-center">Update Station Details</h3>
          <hr />
          <StationForm
            newStation={newStation}
            handleFormChange={handleFormChange}
            handleSubmit={handleUpdateStation}
            handleCancel={handleCancelSubmit}
            ButtonName="Update"
          />
        </>
      )}

      {isAddStationFormOpen === 0 && (
        <>
          <h3 className="text-center">Stations List</h3>
          <hr />
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Edit</th>
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
