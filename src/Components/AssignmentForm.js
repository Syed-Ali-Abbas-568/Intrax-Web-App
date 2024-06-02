import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';

const AssignmentForm = ({ newAssignment, buses, routes, handleFormChange, handleSubmit, handleCancel }) => {
  return (
    <Container>
      <TextField
        label="Shift Name"
        name="shiftname"
        value={newAssignment.shiftname}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Route</InputLabel>
        <Select
          name="assignedRoute"
          value={newAssignment.assignedRoute}
          onChange={handleFormChange}
        >
          <MenuItem value=""><em>Select Route</em></MenuItem>
          {routes.map(route => (
            <MenuItem key={route._id} value={route._id}>{route.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Bus</InputLabel>
        <Select
          name="assignedBus"
          value={newAssignment.assignedBus}
          onChange={handleFormChange}
        >
          <MenuItem value=""><em>Select Bus</em></MenuItem>
          {buses.map(bus => (
            <MenuItem key={bus._id} value={bus._id}>{bus.busNumber}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {newAssignment._id ? 'Update' : 'Submit'}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default AssignmentForm;
