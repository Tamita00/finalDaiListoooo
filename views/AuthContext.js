import React, { AsyncStorage, createContext, useContext, useState, useReducer } from 'react';

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


  

  const login = (token, username) => {
    dispatch({ type: 'LOGIN', token, username });
    setIsAuthenticated(true);
  };

  const pasarTokenuser = (pasarToken, pasarUsername);

  const auth = {
    token: pasarToken,
    username: pasarUsername,
  }

  AsyncStorage.setItem("TOKEN_USERNAME", JSON.stringify(auth))

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setIsAuthenticated(false);
  };


 

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, useAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
