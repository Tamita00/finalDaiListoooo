import React, { createContext, useContext, useReducer } from 'react';

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
  const [state, dispatch] = useReducer(authReducer, {
    userToken: null,
    username: null,
  });

  const login = async (username, password) => {
    const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
});

    if (response.ok) {
        const data = await response.json();
        setUser(data); // Aquí puedes almacenar el token y otros datos del usuario
    } else {
        throw new Error('Credenciales incorrectas');
    }
};

const logout = () => {
    setUser(null); // Limpiar el estado al cerrar sesión
};
  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
