import React from 'react';
import FormField from './FormField';

const DriverForm = ({
    newDriver,
    handleFormChange,
    handleAddDriverSubmit,
    handleCancelSubmit,
    ButtonName = 'Submit'
}) => {
    const genderOptions = [
        { value: '', label: 'Select Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'not-say', label: 'Rather Not Say' },
    ];

    const statusOptions = [
        { value: '', label: 'Select Status' },
        { value: 'Active', label: 'Active' },
        { value: 'Not Active', label: 'Not Active' },

    ];

    return (
        <form className="mt-4">
            <FormField
                label="Full Name"
                type="text"
                id="name"
                name="name"
                value={newDriver.name}
                onChange={handleFormChange}
            />

            <FormField
                label="Email"
                type="text"
                id="email"
                name="email"
                value={newDriver.email}
                onChange={handleFormChange}
            />

            <FormField
                label="Phone"
                type="text"
                id="phone"
                name="phone"
                value={newDriver.phone}
                onChange={handleFormChange}
            />

            <FormField
                label="Cnic"
                type="text"
                id="cnic"
                name="cnic"
                value={newDriver.cnic}
                onChange={handleFormChange}
                placeholder="xxxxx-xxxxxxx-x"
            />

            <FormField
                label="Gender"
                type="select"
                id="gender"
                name="gender"
                value={newDriver.gender}
                onChange={handleFormChange}
                options={genderOptions}
            />


            <FormField
                label="Status"
                type="select"
                id="status"
                name="status"
                value={newDriver.status}
                onChange={handleFormChange}
                options={statusOptions}
            />


            <button
                type="button"
                className="btn btn-success"
                onClick={handleAddDriverSubmit}
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
        </form>
    );
};

export default DriverForm;