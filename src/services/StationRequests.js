// import axios from "axios";

// const API_BASE_URL = 'http://localhost:8001/station';

// export const getStations = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/view`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching stations:', error);
//         throw error;
//     }
// };

// export const addStation = async (newStationData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/add`, newStationData);
//         return response.status;
//     } catch (error) {
//         console.error('Error adding station:', error);
//         throw error;
//     }
// };


import axios from "axios";

const API_BASE_URL = 'http://localhost:8001/station';

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

export const deleteStation = async (stationID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${stationID}`);
        return response.status;
    } catch (error) {
        console.error('Error deleting station:', error);
        throw error;
    }
};

export const updateStation = async (station) => {
    try {
        const payload = {
            name: station.name,
            latitude: station.latitude,
            longitude: station.longitude,
            description: station.description,
        };

        const response = await axios.put(`${API_BASE_URL}/update/${station._id}`, payload);
        const updatedStation = response.data;
        console.log('Station updated successfully:', updatedStation);
        return response.status;
    } catch (error) {
        console.error('Error updating station:', error);
        throw error;
    }
};
