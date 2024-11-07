import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importar Ionicons
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
                "password": contrasena
            };
            await registerUser(userData);
            navigation.navigate('Login');
        } catch (error) {
            alert('Error al registrar');
        }
    }

    return (
        <View style={styles.container}>
            {/* Botón de retroceso */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()} // Navega hacia atrás
            >
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Regístrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                    style={styles.input}
                />
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
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#F8F9FD',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60, // Ajuste de paddingTop para dar espacio al botón
    },
    backButton: {
        position: 'absolute',
        top: 30,  // Ajustamos la posición para mayor visibilidad
        left: 20,
        zIndex: 2, // Asegura que el botón esté por encima de otros elementos
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C6B2F', // Verde
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
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
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#34A853', // Verde
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
    link: {
        fontSize: 14,
        color: '#34A853', // Verde
        textDecorationLine: 'underline',
        marginTop: 5,
    },
});
