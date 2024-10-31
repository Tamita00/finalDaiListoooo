import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText }) => {  
    return (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#A9A9A9" // Color del placeholder
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 0,
        paddingVertical: 12, // Aumentado para más espacio
        paddingHorizontal: 20,
        borderRadius: 25, // Bordes más redondeados
        marginTop: 15,
        shadowColor: '#0060DD',
        shadowOffset: { width: 0, height: 5 }, // Sombra más suave
        shadowOpacity: 0.2, // Menos opacidad
        shadowRadius: 10,
        elevation: 3, // Elevación ajustada
        borderColor: 'transparent',
        fontSize: 16,
        color: '#333', // Color del texto
    }
});

export default CustomTextInput;
