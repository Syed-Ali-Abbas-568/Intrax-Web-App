import axios from "axios";

const API_BASE_URL = 'https://intrax-server.vercel.app/bus';

export const getBuses = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/view`);
        return response.data;
    } catch (error) {
        console.error('Error fetching buses:', error);
        throw error;
    }
};

export const addBuses = async (newBusData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, newBusData);
        return response.status;
    } catch (error) {
        console.error('Error adding bus:', error);
        throw error;
    }
};

export const deleteBus = async (busID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${busID}`);
        return response.status;
    } catch (error) {
        console.error('Error deleting bus:', error);
        throw error;
    }
};

export const updateBus = async (bus) => {
    try {
        const payload = {
            busNumber: bus.busNumber,
            busModel: bus.busModel,
            maintenanceSchedule: bus.maintenanceSchedule,
            licensePlateNumber: bus.licensePlateNumber,
            manufacturerYear: bus.manufacturerYear,
            gpsDeviceId: bus.gpsDeviceId,
            typeOfBus: bus.typeOfBus,
            capacity: bus.capacity,
            status: bus.status,
        };

        const response = await axios.put(`${API_BASE_URL}/update/${bus._id}`, payload);
        const updatedBus = response.data;
        console.log('Bus updated successfully:', updatedBus);
        return response.status;
    } catch (error) {
        console.error('Error updating bus:', error);
        throw error;
    }
};
