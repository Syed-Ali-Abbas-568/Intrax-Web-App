import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/feedback';

export const getFeedbacks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/view`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${feedbackId}`);
    return response.status;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};
