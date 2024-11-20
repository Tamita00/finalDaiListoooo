import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import logo from '../assets/lagarto.png'; // Asegúrate de que esta imagen esté en la ruta correcta

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            {/* Imagen de la lagartija */}
            <Image source={logo} style={styles.image} />

            {/* Botón Iniciar sesión */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/* Botón Registrarse */}
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 35,
        width: '100%',
        borderRadius: 20,
        shadowColor: '#cff0ff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    image: {
        width: 120,  // Ajuste para un tamaño más pequeño
        height: 120, // Ajuste para un tamaño más pequeño
        marginBottom: 20, // Espacio debajo de la imagen
    },
    loginButton: {
        backgroundColor: '#28a745', // Verde
        paddingVertical: 12, // Menos padding vertical
        paddingHorizontal: 40, // Menos padding horizontal
        borderRadius: 5,
        marginTop: 15,
        width: '30%', // Ancho más controlado
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: '#d3d3d3', // Gris claro
        paddingVertical: 12, // Menos padding vertical
        paddingHorizontal: 40, // Menos padding horizontal
        borderRadius: 5,
        marginTop: 10,
        width: '30%', // Ancho más controlado
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16, // Ajuste para un tamaño de fuente más pequeño
        fontWeight: 'bold',
    },
});
