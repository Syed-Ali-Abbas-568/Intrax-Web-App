import React from 'react';
import FormField from './FormField';

const StationForm = ({
  newStation,
  handleFormChange,
  handleSubmit,
  handleCancel,
  ButtonName = 'Submit',
}) => {
  return (
    <form className="mt-4">
      <FormField
        label="Name"
        type="text"
        id="name"
        name="name"
        value={newStation.name}
        onChange={handleFormChange}
      />

      <FormField
        label="Latitude"
        type="text"
        id="latitude"
        name="latitude"
        value={newStation.latitude}
        onChange={handleFormChange}
      />

      <FormField
        label="Longitude"
        type="text"
        id="longitude"
        name="longitude"
        value={newStation.longitude}
        onChange={handleFormChange}
      />

      <FormField
        label="Description"
        type="text"
        id="description"
        name="description"
        value={newStation.description}
        onChange={handleFormChange}
      />

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          {ButtonName}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StationForm;
