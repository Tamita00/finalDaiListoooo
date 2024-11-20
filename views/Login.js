import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'; 
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de retroceso
import { loginUser } from '../authService';

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
        username: username,
        password: contrasena,
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
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Inicio sesión</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Regístrate</Text>
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
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '30%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: '#333',
    fontSize: 14,
  },
  registerLink: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
