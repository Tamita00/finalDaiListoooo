import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import userApi from '../api/userApi';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    Alert.alert('Registro Exitoso', `Usuario: ${username}\nNombre: ${firstName} ${lastName}`);

    try
    {
        const result = await userApi.RegisterUser(firstName,lastName,password,username) 
        if (result.status === true) {
            navigation.navigate('Login');
        }else
        {
            alert("Usuario o contraseña incorrecta");
        }
    }  
    catch(error)
    {
        console.error('Login error:', error);
        setErrorMessage('Error de login');
    }



    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Primer Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Registrar" onPress={handleRegister} />
      <Button
        title="Volver"
        onPress={() => navigation.navigate('Login')}
        style={styles.backButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Cambié a inicio para un diseño más apilado
    alignItems: 'stretch', // Alineación más amplia
    backgroundColor: '#e1e6ea', // Fondo gris claro
    padding: 30, // Aumenté el padding
  },
  title: {
    fontSize: 32, // Tamaño de fuente más grande
    fontWeight: '800', // Grosor de fuente más audaz
    marginBottom: 25, // Mayor margen inferior
    color: '#34495e', // Color oscuro para el título
    textAlign: 'center', // Centrar texto
  },
  input: {
    width: '100%',
    height: 50, // Aumenté la altura para un aspecto más cómodo
    borderColor: '#3498db', // Color de borde azul
    borderWidth: 2, // Grosor de borde más pronunciado
    borderRadius: 8, // Bordes más redondeados
    paddingHorizontal: 15, // Padding horizontal mayor
    marginBottom: 20, // Mayor margen inferior
    backgroundColor: '#ffffff', // Fondo blanco para el input
    elevation: 2, // Elevación ligera para sombra
  },
  backButton: {
    marginTop: 30, // Aumenté el margen superior
    backgroundColor: '#e74c3c', // Color de fondo rojo para el botón
    padding: 10, // Padding para un botón más cómodo
    borderRadius: 5, // Bordes redondeados
    alignItems: 'center', // Centrar el texto dentro del botón
  },
});

export default Register;