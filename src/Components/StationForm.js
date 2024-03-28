import React from 'react';

const StationForm = ({ newStation, handleFormChange, handleSubmit, handleCancel }) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={newStation.name} onChange={handleFormChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="latitude" className="form-label">Latitude:</label>
          <input type="text" className="form-control" id="latitude" name="latitude" value={newStation.latitude} onChange={handleFormChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="longitude" className="form-label">Longitude:</label>
          <input type="text" className="form-control" id="longitude" name="longitude" value={newStation.longitude} onChange={handleFormChange} required />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mx-2">Submit</button>
          <button type="button" className="btn btn-secondary mx-2" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default StationForm;
