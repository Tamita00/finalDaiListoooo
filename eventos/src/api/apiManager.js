

import axios from 'axios';

const apiManager = async (method, headers, data, path) => {
  const baseURL = 'http://localhost:5000'; // Cambia esto por tu URL base
  try {
    const response = await axios({
      method: method,
      url: `${baseURL}${path}`,
      headers: headers,
      data: data,
    });
    return response.data; // Asegúrate de devolver solo la parte de datos
  } catch (error) {
    console.error('Error en apiManager:', error);
    throw error; // Lanza el error para manejarlo en la función que lo llamó
  }
};

export default apiManager;
