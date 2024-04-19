import axios from "axios";

const API_BASE_URL = 'https://intrax-server.vercel.app/station';

export const getStations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/view`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};

export const addStation = async (newStationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, newStationData);
        return response.status;
    } catch (error) {
        console.error('Error adding station:', error);
        throw error;
    }
};
