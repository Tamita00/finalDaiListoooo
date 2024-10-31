import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import userApi from '../api/userApi3'; // Asegúrate de importar tu API

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await userApi.user_login(username, password);
      
      if (response.error) {
        throw new Error(response.error); // Lanza error si hay un problema
      }

      // Asume que el backend devuelve nombre y apellido
      navigation.navigate('Home', { nombre: response.data.nombre, apellido: response.data.apellido });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Credenciales incorrectas"); // Muestra un mensaje de error
    }
  };

  return (
    <View>
      <TextInput 
        placeholder="Usuario" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default Login;
