import axios from "axios";

import { GoogleAPIKey } from "../constants/map_constant";

import { getDirections } from "../helpers/routeCalculater"



const API_BASE_URL = 'http://localhost:8001/route';


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


        // Extract station IDs from the route object
        const { name, stations } = newRouteData;

        // Map through station IDs and fetch station data for each
        const stationDataPromises = stations.map(stationID => getStationByID(stationID));
        const stationData = await Promise.all(stationDataPromises);






        // Create a new route object with station information
        const routeWithStationData = {
            name,
            stations: stationData
        };





        //convert direction into string and now store direction into database
        const direction = await getDirections(routeWithStationData);
        const directionString = JSON.stringify(direction)


        // console.log(JSON.stringify(directions));



        const routewithDirection = {
            name,
            stations: stationData,
            directions: directionString

        };


        //adds newRoute Data to database
        const response = await axios.post(`${API_BASE_URL}/add`, routewithDirection);
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
