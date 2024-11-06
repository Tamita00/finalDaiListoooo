import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../authService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !contrasena) {
      Alert.alert('¡Error!', 'Por favor, completa todos los campos.');
      return;
    }
    try {
      const credentials = {
        username,
        password: contrasena,
      };
      const user = await loginUser(credentials);
      navigation.navigate('Index', { nombre: user.username, token: user.token });
    } catch (error) {
      Alert.alert('¡Error!', 'No se pudo iniciar sesión. Verifica tus credenciales.');
      console.error('Error en el login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#A1A1A1"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fondo oscuro
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 50,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 18,
    marginBottom: 18,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  button: {
    backgroundColor: '#4CAF50', // Color rosa brillante
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#FF4081',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#BDBDBD', // Color gris claro para el enlace
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
