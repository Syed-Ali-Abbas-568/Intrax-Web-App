import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';

const DriverList = ({ drivers, addDriver }) => {
  const [isAddDriverFormOpen, setAddDriverFormOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    fullname: '',
    email: '',
    phone: '',
    cnic: '',
    gender: '',
  });

  const handleAddDriverClick = () => {
    setAddDriverFormOpen(true);
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
      if (value.trim() === '') {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    return errors;
  };

  const handleAddDriverSubmit = () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Add the new driver to the list
      addDriver(newDriver);

      // Clear the form and close it
      setNewDriver({
        fullname: '',
        email: '',
        phone: '',
        cnic: '',
        gender: '',
      });
      setAddDriverFormOpen(false);

      // Display success SweetAlert
      Swal.fire('Success', 'Driver added successfully!', 'success');
    } else {
      // Display SweetAlert for validation errors
      let errorMessage = 'Please fill in all fields:\n';
      Object.values(errors).forEach((error) => {
        errorMessage += `- ${error}\n`;
      });

      Swal.fire('Error', errorMessage, 'error');
    }
  };

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
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the driver from the list
        const updatedDrivers = [...drivers];
        updatedDrivers.splice(index, 1);
        // Update the state with the modified list
        addDriver(updatedDrivers);
        Swal.fire('Deleted!', 'Driver has been removed.', 'success');
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

    return drivers.map((driver, index) => (
      <tr key={index}>
        <td>{driver.fullname}</td>
        <td>{driver.email}</td>
        <td>{driver.phone}</td>
        <td>{driver.cnic}</td>
        <td>{driver.gender}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={() => handleRemoveDriver(index)}>
            <FaTrash />
          </button>
        </td>
        <td>
          {/* Add the functionality for updating a driver here */}
          <button className="btn btn-info btn-sm" disabled>
            <FaEdit />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary float-end" onClick={handleAddDriverClick}>
        + Driver
      </button>

      {isAddDriverFormOpen && (
        <form className="mt-4">
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={newDriver.fullname}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={newDriver.email}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={newDriver.phone}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cnic" className="form-label">
              CNIC:
            </label>
            <input
              type="text"
              className="form-control"
              id="cnic"
              name="cnic"
              value={newDriver.cnic}
              onChange={handleFormChange}
              placeholder="xxxxx-xxxxxxx-x"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={newDriver.gender}
              onChange={handleFormChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not-say">Rather Not Say</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddDriverSubmit}
          >
            Submit
          </button>
        </form>
      )}

      {/* Display the list of drivers only if the form is closed */}
      {!isAddDriverFormOpen && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>CNIC</th>
              <th>Gender</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderDriverRows()}</tbody>
        </table>
      )}
    </div>
  );
};

export default DriverList;
