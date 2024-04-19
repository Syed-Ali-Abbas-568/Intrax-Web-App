import axios from "axios";


const API_BASE_URL = 'https://intrax-server.vercel.app/driver';

export const getDrivers = async () => {

    try {
        const response = await axios.get(`${API_BASE_URL}/view`);
        return response.data;

    } catch (error) {

        console.error('Error fetching drivers:', error);
        throw error; // Re-throw the error to handle it in the component or another part of your code
    }

};


export const addDrivers = async (newDriverData) => {

    try {
        const response = await axios.post(`${API_BASE_URL}/add`, newDriverData);
        return response.status;

    } catch (error) {

        console.error('Error adding driver:', error);
        throw error;
    }

};



export const deleteDrivers = async (driverID) => {

    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${driverID}`);
        return response.status;

    } catch (error) {

        console.error('Error deleting driver:', error);
        throw error;
    }

};



export const updateDrivers = async (driver) => {

    try {
        const payload = {
            name: driver.name,
            email: driver.email,
            phone: driver.phone,
            cnic: driver.cnic,
            gender: driver.gender,
            status: driver.status,

        }


        const response = await axios.put(`${API_BASE_URL}/update/${driver._id}`, payload);
        const updatedDriver = response.data;
        console.log('Driver updated successfully:', updatedDriver);
        return response.status;
    } catch (error) {

        console.error('Error updating driver:', error);
        throw error;
    }

};
