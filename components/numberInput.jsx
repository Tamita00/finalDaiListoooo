import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const NumberInput = ({ placeholder, value, onChange }) => {
    const handleKeyPress = (event) => {
        if (event.nativeEvent.key !== 'Backspace' && !/[0-9]/.test(event.nativeEvent.key)) {
            event.preventDefault();
        }
    };

    const handleChange = (text) => {
        // Filtrar solo números
        const numericText = text.replace(/[^0-9]/g, '');
        if(onChange)
        {
            onChange(numericText);
        }
    };

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            onKeyPress={handleKeyPress}
            keyboardType='numeric'
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 15,
        shadowColor: '#0060DD',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        borderColor: 'transparent',
        fontSize: 16,
    },
});

export default NumberInput;
