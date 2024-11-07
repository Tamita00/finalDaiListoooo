import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={[styles.boton, styles.login]} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.botonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.boton, styles.register]} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.botonTextSecundario}>Registrarse</Text>
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
        shadowColor: '#2C6B2F',  // Sombra verde
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C6B2F',  // Color verde para el título
        marginBottom: 30, // Espacio entre el título y los botones
        textAlign: 'center',
    },
    boton: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    login: {
        backgroundColor: '#34A853',  // Botón verde para iniciar sesión
    },
    register: {
        borderColor: '#F8F9FD',  // Borde verde para registrarse
        backgroundColor: '#D5DBDB',
        borderWidth: 1,
    },
    botonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botonTextSecundario: {
        color: 'grey',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
