import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import userApi from '../api/userApi';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const result = await userApi.user_login(username, password);
      if (result.status === 200) {
        const token = result.data.token; // Suponiendo que el token está en result.data.token
        navigation.navigate('Home', { token });
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error de login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
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
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}> Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Cambié a inicio para un diseño más apilado
    alignItems: 'stretch', // Alineación más amplia
    backgroundColor: '#eaeef1', // Fondo gris claro
    padding: 30, // Más espacio
  },
  title: {
    fontSize: 30, // Tamaño de fuente más grande
    fontWeight: '900', // Grosor de fuente más audaz
    marginBottom: 30, // Mayor margen inferior
    color: '#2c3e50', // Color oscuro para el título
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
  registerContainer: {
    marginTop: 30, // Mayor espacio superior
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrar horizontalmente
  },
  registerText: {
    fontSize: 16,
    color: '#7f8c8d', // Color más suave para el texto
  },
  registerLink: {
    fontSize: 16,
    color: '#27ae60', // Color verde para el enlace
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Subrayar el enlace
  },
  errorText: {
    color: '#e74c3c', // Color rojo más vibrante
    marginTop: 15, // Mayor margen superior
    fontSize: 14, // Tamaño de fuente más pequeño
  },
});

export default Login;