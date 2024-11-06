import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Reemplazando Boton por TouchableOpacity */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]} 
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonTextSecondary}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',  // Fondo gris claro
        padding: 30,
        borderRadius: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,  // Espacio entre el título y los botones
    },
    button: {
        width: '100%',
        paddingVertical: 16,
        backgroundColor: '#4CAF50',  // Azul brillante para el botón principal
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#ffffff',  // Fondo gris claro para el botón secundario
        borderWidth: 1,
        borderColor: '#76c479',  // Borde azul para el botón secundario
    },
    buttonTextSecondary: {
        fontSize: 18,
        color: '#15301d',
        fontWeight: '600',
    }
});
