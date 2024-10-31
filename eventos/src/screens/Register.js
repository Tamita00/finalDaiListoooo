import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/user/register', { name, surname, username, password });
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      // Maneja errores aquí
    }
  };
  return (
    <View>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Apellido" value={surname} onChangeText={setSurname} />
      <TextInput placeholder="Usuario" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default Register;
