import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button, Container, Box, Typography } from '@mui/material';
import AssignmentForm from './AssignmentForm';
import { deleteAssignment, updateAssignment } from '../services/AssignmentRequests';

const AssignmentList = ({ assignments, buses, routes, addAssignment, fetchAssignments }) => {
  const [isAddAssignmentFormOpen, setAddAssignmentFormOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ shiftname: '', assignedRoute: '', assignedBus: '' });

  const handleAddAssignmentClick = () => {
    setNewAssignment({ shiftname: '', assignedRoute: '', assignedBus: '' });
    setAddAssignmentFormOpen(true);
  };

  const handleEditAssignmentClick = (assignment) => {
    setNewAssignment(assignment);
    setAddAssignmentFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleAddAssignmentSubmit = async () => {
    if (!newAssignment.shiftname || !newAssignment.assignedRoute || !newAssignment.assignedBus) {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }
    const success = await addAssignment(newAssignment);
    if (success) {
      setAddAssignmentFormOpen(false);
      Swal.fire('Success', 'Assignment added successfully!', 'success');
    } else {
      Swal.fire('Error', 'Failed to add assignment', 'error');
    }
  };

  const handleUpdateAssignment = async () => {
    if (!newAssignment.shiftname || !newAssignment.assignedRoute || !newAssignment.assignedBus) {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }
    try {
      await updateAssignment(newAssignment._id, newAssignment);
      fetchAssignments();
      setAddAssignmentFormOpen(false);
      Swal.fire('Success', 'Assignment updated successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update assignment', 'error');
    }
  };

  const handleRemoveAssignment = async (id) => {
    try {
      await deleteAssignment(id);
      fetchAssignments();
      Swal.fire('Deleted!', 'Assignment has been removed.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to delete assignment', 'error');
    }
  };

  const renderAssignmentRows = () => {
    if (assignments.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
            No assignments found
          </td>
        </tr>
      );
    }

    return assignments.map((assignment) => (
      <tr key={assignment._id}>
        <td>{assignment.shiftname}</td>
        <td>{assignment.assignedRoute.name}</td>
        <td>{assignment.assignedBus.busNumber}</td>
        <td>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleEditAssignmentClick(assignment)}
          >
            <FaEdit />
          </Button>
        </td>
        <td>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleRemoveAssignment(assignment._id)}
          >
            <FaTrash />
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <Container>
        <br></br>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" gutterBottom>Assignments List</Typography>
        {!isAddAssignmentFormOpen && (
          <Button variant="contained" color="primary" onClick={handleAddAssignmentClick}>
            + Assignment
          </Button>
        )}
      </Box>
      {isAddAssignmentFormOpen ? (
        <>
          <Typography variant="h5" gutterBottom>{newAssignment._id ? 'Update Assignment' : 'Add Assignment'}</Typography>
          <AssignmentForm
            newAssignment={newAssignment}
            buses={buses}
            routes={routes}
            handleFormChange={handleFormChange}
            handleSubmit={newAssignment._id ? handleUpdateAssignment : handleAddAssignmentSubmit}
            handleCancel={() => setAddAssignmentFormOpen(false)}
          />
        </>
      ) : null}
      {!isAddAssignmentFormOpen && (
        <>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Shift Name</th>
                <th>Assigned Route</th>
                <th>Assigned Bus</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{renderAssignmentRows()}</tbody>
          </table>
        </>
      )}
    </Container>
  );
};

export default AssignmentList;
