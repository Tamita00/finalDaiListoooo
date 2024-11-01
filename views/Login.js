import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../authService';
import { useAuth } from './AuthContext'; // Ajusta la ruta

export default function Login() {
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();
  const { login } = useAuth(); // Usar el contexto

  const handleLogin = async () => {
    if (!username || !contrasena) {
      alert('Campos incompletos');
      return;
    }
    try {
      const credentials = { username, password: contrasena };
      const user = await loginUser(credentials);

      if (user && user.token && user.username) {
        login(user.token, user.username); // Usar el contexto para iniciar sesión
        navigation.navigate('Home');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error al iniciar sesión');
      console.error('Error en el login:', error);
    }
  };

  return (
    <View >
      <Text >Inicio de Sesión</Text>
      <View >
        <TextInput
          placeholder="User"
          value={username}
          onChangeText={setUsername}
          
        />
        <TextInput
          placeholder="Password"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          
        />
        <TouchableOpacity  onPress={handleLogin}>
          <Text >Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos permanecen iguales
