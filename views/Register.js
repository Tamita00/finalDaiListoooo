import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { registerUser } from '../authService';

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
                "last_name": apellido,
                "username": username,
                "password": contrasena,
            };
            await registerUser(userData);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al registrar el usuario. Intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Título */}
            <Text style={styles.title}>¡Regístrate ahora!</Text>

            <View style={styles.inputContainer}>
                {/* Nombre */}
                <TextInput 
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.input}
                />

                {/* Apellido */}
                <TextInput 
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                    style={styles.input}
                />

                {/* Usuario */}
                <TextInput 
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />

                {/* Contraseña */}
                <TextInput 
                    placeholder="Contraseña"
                    value={contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry
                    style={styles.input}
                />

                {/* Botón de Registrarse */}
                <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
                    <Text style={styles.submitButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    title: {
        fontSize: 28,
        color: '#FF6B6B',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
        paddingVertical: 20,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 18,
        borderRadius: 12,
        backgroundColor: '#333333',
        borderColor: '#444',
        borderWidth: 1.5,
        color: '#fff',
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '500',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    submitButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
