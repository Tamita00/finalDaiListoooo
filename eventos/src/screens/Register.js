import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import userApi from '../api/userApi'; // Asegúrate de importar tu API

const Register = ({ navigation }) => {
  const [first_name, setName] = useState('');
  const [last_name, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const result = await userApi.RegisterUser(first_name, last_name, password, username);
      
      if (result.error) {
        throw new Error(result.error); // Lanza error si hay un problema
      }

      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión.");
      navigation.navigate('Home', { nombre: first_name, apellido: last_name });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un problema al registrarte. Inténtalo de nuevo.");
    }
  };

  return (
    <View>
      <TextInput 
        placeholder="Nombre" 
        value={first_name} 
        onChangeText={setName} 
      />
      <TextInput 
        placeholder="Apellido" 
        value={last_name} 
        onChangeText={setSurname} 
      />
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
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default Register;
