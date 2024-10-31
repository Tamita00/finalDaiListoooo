import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Title = ({ text }) => {  
    return (
        <Text style={styles.text}>
          {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 36, // Ajustado para mejor legibilidad en móviles
        color: 'rgb(16, 137, 211)',
        marginVertical: 20, // Margen vertical para separación
        textShadowColor: '#000', // Color de la sombra
        textShadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        textShadowRadius: 5, // Radio de la sombra
    }
});

export default Title;
