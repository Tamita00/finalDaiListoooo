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
        backgroundColor: '#F9FAFB', // Fondo blanco suave (más claro que el negro)
        justifyContent: 'center', // Centrado vertical
        alignItems: 'center', // Centrado horizontal
        padding: 25,
    },
    title: {
        fontSize: 28,
        color: '#333', // Título en un tono rojo suave
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
        paddingVertical: 20,
        alignItems: 'center', // Centra los campos de entrada
    },
    input: {
        width: '100%',
        padding: 18,
        borderRadius: 12,
        backgroundColor: '#FFFFFF', // Fondo blanco para el input
        borderColor: '#DDDDDD', // Bordes en gris claro
        borderWidth: 1.5,
        color: '#333', // Texto oscuro para mejor contraste
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '500',
        shadowColor: '#000', // Sombra sutil
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    submitButton: {
        backgroundColor: '#4CAF50', // Botón rojo
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#77DD77', // Sombra roja sutil
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
        alignItems: 'center', // Centrado del texto en el botón
    },
    submitButtonText: {
        color: '#fff', // Texto blanco en el botón
        fontSize: 18,
        fontWeight: 'bold',
    },
});
