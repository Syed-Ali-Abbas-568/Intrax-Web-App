import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteBus, updateBus } from '../services/BusRequests';
import BusForm from './BusForm';

const BusList = ({ buses, addBus, fetchBus }) => {
  const [isAddBusFormOpen, setAddBusFormOpen] = useState(0);

  const [newBus, setNewBus] = useState({
    busNumber: '',
    busModel: '',
    maintenanceSchedule: '',
    licensePlateNumber: '',
    manufacturerYear: '',
    gpsDeviceId: '',
    typeOfBus: '',
    capacity: '',
    status:'',
  });

  const handleAddBusClick = () => {
    setAddBusFormOpen(1);
  };

  const handleEditBusClick = (bus) => {
    setNewBus(bus);
    setAddBusFormOpen(2);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewBus({ ...newBus, [name]: value });
  };

  const handleCancelSubmit = () => {
    setNewBus({
      busNumber: '',
      busModel: '',
      maintenanceSchedule: '',
      licensePlateNumber: '',
      manufacturerYear: '',
      gpsDeviceId: '',
      typeOfBus: '',
      capacity: '',
      status:'',
    });
    setAddBusFormOpen(0);
  };

  const handleAddBusSubmit = async () => {
    try {
      await addBus(newBus);
      fetchBus();
      setNewBus({
        busNumber: '',
        busModel: '',
        maintenanceSchedule: '',
        licensePlateNumber: '',
        manufacturerYear: '',
        gpsDeviceId: '',
        typeOfBus: '',
        capacity: '',
        status:'',
      });
      setAddBusFormOpen(0);
      Swal.fire('Success', 'Bus added successfully!', 'success');
    } catch (error) {
      console.error('Error adding bus:', error);
      Swal.fire('Error', 'Failed to add bus', 'error');
    }
  };

  const handleUpdateBus = async () => {
    try {
      await updateBus(newBus);
      fetchBus();
      setNewBus({
        busNumber: '',
        busModel: '',
        maintenanceSchedule: '',
        licensePlateNumber: '',
        manufacturerYear: '',
        gpsDeviceId: '',
        typeOfBus: '',
        capacity: '',
        status:'',
      });
      setAddBusFormOpen(0);
      Swal.fire('Success', 'Bus updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating bus:', error);
      Swal.fire('Error', 'Failed to update bus', 'error');
    }
  };

  const handleRemoveBus = async (id) => {
    try {
      await deleteBus(id);
      fetchBus();
      Swal.fire('Deleted!', 'Bus has been removed.', 'success');
    } catch (error) {
      console.error('Error deleting bus:', error);
      Swal.fire('Error:', 'Failed to delete bus', 'error');
    }
  };

  const renderBusRows = () => {
    if (buses.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="text-center">
            No buses found
          </td>
        </tr>
      );
    }

    return buses.map((bus) => (
      <tr key={bus._id}>
        <td>{bus.busNumber}</td>
        <td>{bus.busModel}</td>
        <td>{bus.maintenanceSchedule}</td>
        <td>{bus.licensePlateNumber}</td>
        <td>{bus.manufacturerYear}</td>
        <td>{bus.gpsDeviceId}</td>
        <td>{bus.typeOfBus}</td>
        <td>{bus.capacity}</td>
        <td>{bus.status}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={() => handleRemoveBus(bus._id)}>
            <FaTrash />
          </button>
        </td>
        <td>
          <button className="btn btn-info btn-sm" onClick={() => handleEditBusClick(bus)}>
            <FaEdit />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      {isAddBusFormOpen === 0 && (
        <button className="btn btn-primary float-end" onClick={handleAddBusClick}>
          + Bus
        </button>
      )}

      {isAddBusFormOpen === 1 && (
        <>
          <h3 className="text-center">Add Bus</h3>
          <hr />
          <BusForm
            newBus={newBus}
            handleFormChange={handleFormChange}
            handleAddBusSubmit={handleAddBusSubmit}
            handleCancelSubmit={handleCancelSubmit}
          />
        </>
      )}

      {isAddBusFormOpen === 2 && (
        <>
          <h3 className="text-center">Update Bus Details</h3>
          <hr />
          <BusForm
            newBus={newBus}
            handleFormChange={handleFormChange}
            handleAddBusSubmit={handleUpdateBus}
            handleCancelSubmit={handleCancelSubmit}
            ButtonName="Update"
          />
        </>
      )}

      {isAddBusFormOpen === 0 && (
        <>
          <h3 className="text-center">Buses List</h3>
          <hr />
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Bus Model</th>
                <th>Maintenance Schedule</th>
                <th>License Plate Number</th>
                <th>Manufacturer Year</th>
                <th>GPS Device ID</th>
                <th>Type of Bus</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{renderBusRows()}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BusList;
