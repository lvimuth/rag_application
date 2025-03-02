import axios from 'axios';

// Set the base URL for API requests
const API_BASE_URL = 'http://localhost:8000';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Upload a PDF document to the server
 * @param {File} file - The PDF file to upload
 * @returns {Promise} - API response
 */
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Ask a question about the uploaded document
 * @param {string} question - The question to ask
 * @returns {Promise} - API response with the answer
 */
export const askQuestion = async (question) => {
  return api.post('/question', { question });
};

export default api;s