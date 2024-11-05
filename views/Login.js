import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { loginUser } from '../authService';
import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !contrasena) {
      alert('Por favor, completa todos los campos');
      return;
    }
    try {
      const credentials = {
        "username": username,
        "password": contrasena
      };
      const user = await loginUser(credentials);
      navigation.navigate('Index', { nombre: user.username, token: user.token });
    } catch (error) {
      alert('Error al iniciar sesión');
      console.error('Error en el login:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de la página directamente en el layout */}
      <Text style={styles.title}>Inicio sesión</Text>
      
      {/* Formulario de inicio de sesión */}
      <View style={styles.formContainer}>
        
        {/* Campo de usuario */}
        <View style={styles.card}>
          <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        
        {/* Campo de contraseña */}
        <View style={styles.card}>
          <TextInput
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Botón de inicio de sesión */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,  // Ajuste para dar espacio al título
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
