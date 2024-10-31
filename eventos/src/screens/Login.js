import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/user/login', { username, password });
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
