import React from 'react';
import FormField from './FormField';

const BusForm = ({
  newBus,
  handleFormChange,
  handleAddBusSubmit,
  handleCancelSubmit,
  ButtonName = 'Submit',
}) => {
  const typeOfBusOptions = [
    { value: '', label: 'Select Type of Bus' },
    { value: 'Type 1', label: 'Type 1' },
    { value: 'Type 2', label: 'Type 2' },
    // Add more options as needed...
  ];

  const capacityOptions = [
    { value: '', label: 'Select Capacity' },
    { value: '40', label: '40' },
    { value: '50', label: '50' },
    // Add more options as needed...
  ];

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'In-Service', label: 'In-Service' },
    { value: 'Retired', label: 'Retired' },
    // Add more options as needed...
  ];

  return (
    <form className="mt-4">
      <FormField
        label="Bus Number"
        type="text"
        id="busNumber"
        name="busNumber"
        value={newBus.busNumber}
        onChange={handleFormChange}
      />

      <FormField
        label="Bus Model"
        type="text"
        id="busModel"
        name="busModel"
        value={newBus.busModel}
        onChange={handleFormChange}
      />

      <FormField
        label="Maintenance Schedule"
        type="text"
        id="maintenanceSchedule"
        name="maintenanceSchedule"
        value={newBus.maintenanceSchedule}
        onChange={handleFormChange}
        placeholder="e.g., Weekly, Monthly"
      />

      <FormField
        label="License Plate Number"
        type="text"
        id="licensePlateNumber"
        name="licensePlateNumber"
        value={newBus.licensePlateNumber}
        onChange={handleFormChange}
      />

      <FormField
        label="Manufacturer Year"
        type="number"
        id="manufacturerYear"
        name="manufacturerYear"
        value={newBus.manufacturerYear}
        onChange={handleFormChange}
        placeholder="e.g., 2022"
      />

      <FormField
        label="GPS Device ID"
        type="text"
        id="gpsDeviceId"
        name="gpsDeviceId"
        value={newBus.gpsDeviceId}
        onChange={handleFormChange}
      />

      <FormField
        label="Type of Bus"
        type="select"
        id="typeOfBus"
        name="typeOfBus"
        value={newBus.typeOfBus}
        onChange={handleFormChange}
        options={typeOfBusOptions}
      />

      <FormField
        label="Capacity"
        type="select"
        id="capacity"
        name="capacity"
        value={newBus.capacity}
        onChange={handleFormChange}
        options={capacityOptions}
      />

      <FormField
        label="Status"
        type="select"
        id="status"
        name="status"
        value={newBus.status}
        onChange={handleFormChange}
        options={statusOptions}
      />

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddBusSubmit}
        >
          {ButtonName}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancelSubmit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BusForm;
