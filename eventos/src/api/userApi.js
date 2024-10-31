import apiManager from "./apiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const user_login = async (username, password) => {
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  };
  const data = {
    username,
    password,
  };
  try {
    const result = await apiManager('POST', headers, data, 'user/login');
    return result; // Devuelve el resultado para manejarlo en el componente
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message }; // Maneja errores
  }
};

const RegisterUser = async (firstName, lastName, password, username) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    first_name: firstName,
    last_name: lastName,
    username,
    password,
  };
  try {
    const result = await apiManager('POST', headers, data, 'user/register');
    return result; // Devuelve el resultado para manejarlo en el componente
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message }; // Maneja errores
  }
};

// Exporta las funciones para que puedan ser utilizadas en otros componentes
export default { user_login, RegisterUser };
