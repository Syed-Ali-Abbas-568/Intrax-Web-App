import React, { useState } from 'react';

import Swal from 'sweetalert2';

import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteDrivers, updateDrivers } from '../services/DriverRequests';

import DriverForm from './DriverForm';

const DriverList = ({ drivers, addDriver, fetchDriver }) => {
  const [isAddDriverFormOpen, setAddDriverFormOpen] = useState(0);




  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    gender: '',
    status: '',
  });

  const handleAddDriverClick = () => {
    setAddDriverFormOpen(1);
  };


  const handleEditDriverClick = (driver) => {
    setNewDriver(driver)
    setAddDriverFormOpen(2);

  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Validation for phone: allow only digits and '+'
    if (name === 'phone') {
      const phoneValue = value.replace(/[^0-9+]/g, ''); // Allow only digits and '+'
      setNewDriver({ ...newDriver, [name]: phoneValue });
    }
    // Validation for email: check for valid email format
    else if (name === 'email') {
      setNewDriver({ ...newDriver, [name]: value });
    }
    // Special handling for CNIC to allow only digits and format it as xxxxx-xxxxxxx-x
    else if (name === 'cnic') {
      const cnicValue = value.replace(/\D/g, ''); // Remove non-digits

      if (cnicValue.length <= 13) {
        let formattedCNIC = '';

        for (let i = 0; i < cnicValue.length; i++) {
          if (i === 5 || i === 12) {
            formattedCNIC += '-';
          }
          formattedCNIC += cnicValue[i];
        }

        setNewDriver({ ...newDriver, [name]: formattedCNIC });
      }
    } else {
      setNewDriver({ ...newDriver, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};

    Object.entries(newDriver).forEach(([key, value]) => {
      if (typeof value === 'string') {

        if (value.trim() === '') {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        }
      }
      else {
        console.error('Error: value is not a string');
      }
    });

    return errors;
  };


  const handleCancelSubmit = () => {
    // Clear the form and close it
    setNewDriver({
      name: '',
      email: '',
      phone: '',
      cnic: '',
      gender: '',
      status: '',
    });
    setAddDriverFormOpen(0);

  }


  const handleAddDriverSubmit = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Add the new driver to the list
      const flag = await addDriver(newDriver)

      if (flag) {
        // Clear the form and close it
        setNewDriver({
          name: '',
          email: '',
          phone: '',
          cnic: '',
          gender: '',
          status: '',
        });
        setAddDriverFormOpen(0);


        // Display success SweetAlert
        Swal.fire('Success', 'Driver added successfully!', 'success');
      }
      else {
        Swal.fire('Error', 'Driver with duplicate credentials already exists', 'errors');

      }

    } else {
      // Display SweetAlert for validation errors
      let errorMessage = 'Please fill in all fields:\n';
      Object.values(errors).forEach((error) => {
        errorMessage += `- ${error}\n`;
      });

      Swal.fire('Error', errorMessage, 'error');
    }
  };


  const handleUpdateDriver = async (driver) => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Add the new driver to the list
      try {
        await updateDrivers(newDriver)
        fetchDriver()

        // Clear the form and close it
        setNewDriver({
          name: '',
          email: '',
          phone: '',
          cnic: '',
          gender: '',
          status: '',
        });
        setAddDriverFormOpen(0);


        // Display success SweetAlert
        Swal.fire('Success', 'Driver updated successfully!', 'success');
      } catch (error) {
        Swal.fire('Error', 'Driver update failed as duplicate credentials already exist', 'errors');
      }


    } else {
      // Display SweetAlert for validation errors
      let errorMessage = 'Please fill in all fields:\n';
      Object.values(errors).forEach((error) => {
        errorMessage += `- ${error}\n`;
      });

      Swal.fire('Error', errorMessage, 'error');
    }

  }

  const handleRemoveDriver = (index) => {
    // Confirm before removing the driver
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Remove the driver from the list

        try {

          await deleteDrivers(index);
          fetchDriver();
          Swal.fire('Deleted!', 'Driver has been removed.', 'success');

        } catch (error) {

          if (error.response.status === 404) {
            Swal.fire('Error:', 'No such driver exists.', 'error');

          }
          else {
            Swal.fire('Error:', 'An unexpected server error has occured.', 'error');

          }

        }


      }
    });
  };

  // Helper function to render the table rows
  const renderDriverRows = () => {
    if (drivers.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">No drivers found</td>
        </tr>
      );
    }

    return drivers.map((driver) => (
      <tr key={driver._id}>
        <td>{driver.name}</td>
        <td>{driver.email}</td>
        <td>{driver.phone}</td>
        <td>{driver.cnic}</td>
        <td>{driver.gender}</td>
        <td>{driver.status}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={() => handleRemoveDriver(driver._id)}>
            <FaTrash />
          </button>
        </td>
        <td>
          {/* Add the functionality for updating a driver here */}
          <button className="btn btn-info btn-sm" onClick={() => handleEditDriverClick(driver)}>
            <FaEdit />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      {isAddDriverFormOpen === 0 && <button className="btn btn-primary float-end" onClick={handleAddDriverClick}>
        + Driver
      </button>}
      
      {isAddDriverFormOpen === 1 && <DriverForm
        newDriver={newDriver}
        handleFormChange={handleFormChange}
        handleAddDriverSubmit={handleAddDriverSubmit}
        handleCancelSubmit={handleCancelSubmit}
      />}

      {isAddDriverFormOpen === 2 && <DriverForm
        newDriver={newDriver}
        handleFormChange={handleFormChange}
        handleAddDriverSubmit={handleUpdateDriver}
        handleCancelSubmit={handleCancelSubmit}
        ButtonName='Update'
      />}



      {/* Display the list of drivers only if the form is closed */}
      {isAddDriverFormOpen === 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>CNIC</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderDriverRows()}</tbody>
        </table>
      )}
    </div>
  );
};

export default DriverList;
