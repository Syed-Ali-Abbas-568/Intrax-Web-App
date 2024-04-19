import axios from "axios";
const API_BASE_URL = 'https://intrax-server.vercel.app/route';

export const getRoutes = async () => {

    try {
        const response = await axios.get(`${API_BASE_URL}/view`);
        return response.data;

    } catch (error) {

        console.error('Error fetching all routes:', error);
        throw error; // Re-throw the error to handle it in the component or another part of your code
    }

};



export const addRoutes = async (newRouteData) => {

    try {
        const response = await axios.post(`${API_BASE_URL}/add`, newRouteData);
        return response.status;

    } catch (error) {

        console.error('Error adding routes:', error);
        throw error;
    }

};



export const getStationByID = async (stationID) => {
    try {
        const response = await axios.get(`http://localhost:8001/station/${stationID}`)
        return response.data;
    } catch (error) {
        console.error('Error fectching information of given station', error);
        throw error;
    }

}



export const getRouteByID = async (routeID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${routeID}`)
        return response.data;
    } catch (error) {
        console.error('Error fectching information of given route', error);
        throw error;
    }

}





export const getAllStations = async () => {

    try {
        const response = await axios.get(`http://localhost:8001/station/view`);
        return response.data;

    } catch (error) {

        console.error('Error fetching all Stations:', error);
        throw error; // Re-throw the error to handle it in the component or another part of your code
    }

};
