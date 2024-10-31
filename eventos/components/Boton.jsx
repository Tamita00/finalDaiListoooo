import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Boton = ({ text, onPress }) => {
    const handleOnPress = () => {
        if (onPress) {
            onPress();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleOnPress} activeOpacity={0.7}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10, // Espaciado vertical para mejorar la apariencia
    },
    button: {
        width: '100%', // Ocupa todo el ancho del contenedor
        backgroundColor: '#3498db', // Cambiado a un azul más suave
        paddingVertical: 15,
        borderRadius: 25, // Bordes más redondeados
        shadowColor: '#2980b9',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center', // Centrar texto
    },
    buttonText: {
        color: '#ffffff', // Color blanco para el texto
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18, // Aumentado para mayor legibilidad
    },
});

export default Boton;
