import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { registerUser } from '../authService';
import React, { useState } from 'react';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigation = useNavigation();
  
    const handleRegister = async () => {
      try {
        const userData = {
          "first_name": nombre,
          "last_name" : apellido,
          "username"  : username,
          "password"  : contrasena 
        };
        await registerUser(userData);
        navigation.navigate('Login');
      } catch (error) {
        alert('Error al registrar');
      }
    }

    return (
      <View style={styles.container}>
        {/* Título manual */}
        <Text style={styles.title}>Registrate</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput 
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />
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
          
          {/* Botón estándar de React Native */}
          <Button title="Registrarse" onPress={handleRegister} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '60%',
    marginBottom: 20
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
  }
});
