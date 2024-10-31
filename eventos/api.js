import axios from 'axios';

const urlApi = 'http://localhost:5000/api/'; 

export const api = axios.create({
  baseURL: urlApi,
  headers: {
    'Content-Type': 'application/json',
  },
});