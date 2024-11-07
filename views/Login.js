import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
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
        "password" : contrasena 
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
      <Text style={styles.title}>Inicio sesión</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        
        <TouchableOpacity style={[styles.boton, styles.loginButton]} onPress={handleLogin}>
          <Text style={styles.botonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.textFooter}>¿No tienes cuenta?</Text>
        
        <TouchableOpacity style={[styles.boton, styles.registerButton]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.botonText}>Regístrate</Text>
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
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C6B2F',  // Verde
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
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
  boton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#34A853',  // Verde
  },
  registerButton: {
    borderColor: '#34A853',  // Verde
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  botonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textFooter: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  }
});
