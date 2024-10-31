import { api } from './api';
import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('user/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error en el registro: ', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {

  try {
    const response = await api.post('user/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

// axios.post("http://localhost:5000", credentials)