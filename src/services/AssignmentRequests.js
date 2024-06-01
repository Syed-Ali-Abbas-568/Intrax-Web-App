import axios from "axios";

const API_BASE_URL = 'http://localhost:8001/assignment'; // Your backend URL

// Fetch all detailed assignments
export const getAllDetailedAssignments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/viewdata`);
        return response.data;
    } catch (error) {
        console.error('Error fetching detailed assignments:', error);
        throw error;
    }
};

// Add a new assignment
export const addAssignment = async (assignment) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, assignment);
        return response.data;
    } catch (error) {
        console.error('Error adding assignment:', error);
        throw error;
    }
};

// Update an existing assignment
export const updateAssignment = async (id, updatedAssignment) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updatedAssignment);
        return response.data;
    } catch (error) {
        console.error('Error updating assignment:', error);
        throw error;
    }
};

// Delete an assignment
export const deleteAssignment = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting assignment:', error);
        throw error;
    }
};
