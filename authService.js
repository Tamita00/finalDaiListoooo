import { api } from './api';

//credenciales + post
export const postAuth = async (endpoint, body, token) => {
  try {
    const response = await api.post(endpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Endpoint:', endpoint);
    console.error('Error en el post autorizado:', error);
    throw error;
  }
};

//post
export const post = async (endpoint) => {
  try {
    const response = await api.post(endpoint);
    return response.data;
  } catch (error) {
    console.error('Endpoint:', endpoint);
    console.error('Error en el post autorizado:', error);
    throw error;
  }
};
//get credenciales
export const getAuth = async(endpoint, credentials) => {
  try {
    const response = await api.get(endpoint, {headers: {
      'Authorization': `Bearer ${credentials}`}
  });
    return response.data;
  } catch (error) {
    console.error('Endpoint:', endpoint);
    console.error('Error en el fetch:', error);
    throw error;
  }
}

//Update
export const putAuth = async (endpoint, credentials, body) => {
  try {
    const response = await api.put(endpoint, body, {
      headers: {
        'Authorization': `Bearer ${credentials}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Endpoint:', endpoint);
    console.error('Error en el put:', error);
    throw error;
  }
};


export const deleteAuth = async(endpoint, credentials) => {
  try{
    const response = await api.delete(endpoint, {headers: {
      'Authorization': `Bearer ${credentials}`}
    });
    return response.data;
  }
  catch(error)
  {
    console.error('Error en el delete: ', error);
    console.error('Endpoint: ', endpoint)
    throw error;
  }
}

export const get = async(endpoint) => {
  try{
    const response = await api.get(endpoint);
    return response.data;
  } catch(error) {
    console.error('Error en el get: ', error);
    console.error('Endpoint: ', endpoint)
    throw error;
  }
}

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

export const getCategories = async (credentials) => {
  try {
    const response = await api.get('category/', {headers: {
      'Authorization': `Bearer ${credentials}`}
  });
  console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error en la carga de categorías:', error);
    throw error;
  }
};

export const getLocations = async (credentials) => {
  try {
    const response = await api.get('event-location/', {headers: {
      'Authorization': `Bearer ${credentials}`}
  });
  console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error en la carga de localidades:', error);
    throw error;
  }
};

export const getEventos = async (credentials) => {
  try {
    const response = await api.get('event', {
      headers: {
        'Authorization': `Bearer ${credentials}`
      },
      params: {
        limit: 100
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error en el fetch de los eventos:', error);
    throw error;
  }
}


export const createEvent = async(credentials) => {
  try{
    const response = await api.post('event', credentials);
    return response.data;
  } catch(error) {
    console.error('Error al crear el evento', error);
    throw error;
  }
}