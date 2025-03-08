import axios from 'axios';

const API_URL = 'http://localhost:8080/MegaCity_war_exploded';  // Your backend URL

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};
