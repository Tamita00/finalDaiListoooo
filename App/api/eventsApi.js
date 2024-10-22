import apiManager from "./ApiManager";
import userApi from "./userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
const get_Events = async () => {
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,  
  };
  const data = {}
  try {
    console.log
    const result = await apiManager('Get', headers, data, 'event');
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};
const create_Events = async (data, token) => {
    // Asegúrate de que el token es una cadena
    if (typeof token !== 'string') {
      console.error('Token should be a string.');
      return { error: 'Invalid token' };
    }
  
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "ngrok-skip-browser-warning": true,  
    };
  
    console.log("TOKEN:", token);
  
    try {
      // Aquí 'apiManager' debe ser una función que maneje la solicitud HTTP
      // Asegúrate de que 'apiManager' esté configurada para aceptar 'POST' como método
      const result = await apiManager('POST', headers, data, 'event');
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return { error: error.message };
    }
  };







  getEventDetails = async (eventId) => {
    try {
      const response = await apiManager.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los detalles del evento:', error);
      throw error;
    }
  };

  subscribeToEvent = async (eventId, userId) => {
    try {
      const response = await apiManager.post(`/events/${eventId}/subscribe`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error al suscribirse al evento:', error);
      throw error;
    }
  };





export default { get_Events, create_Events, getEventDetails, subscribeToEvent };