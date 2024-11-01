import React, { createContext, useContext, useState, useReducer } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userToken: action.token, username: action.username };
    case 'LOGOUT':
      return { ...state, userToken: null, username: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [state, dispatch] = useReducer(authReducer, {
    userToken: null,
    username: null,
  });

  /*const login = async (token, username, password) => {
    // Asegúrate de que la URL es correcta
    const response = await fetch('http://localhost:5000', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, username, password }),
    });
console.log(token, username, password );
    if (response.ok) {
      const data = await response.json();
      // Almacena el token y el nombre de usuario en el estado global
      dispatch({ type: 'LOGIN', token: data.token, username: data.username });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Credenciales incorrectas');
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
*/

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);


   

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, useAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
