import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';  // Para la flecha
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
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
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

                <Text style={styles.prompt}>¿Ya tienes cuenta?</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Inicia sesión</Text>
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
    backButton: {
        position: 'absolute',
        top: 40,
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
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    prompt: {
        fontSize: 16,
        color: '#555',
    },
    link: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    }
});
