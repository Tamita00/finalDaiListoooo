import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const BotonSecundario = ({ text, onPress }) => {
    const handleOnPress = () => {
        if (onPress) {
            onPress();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleOnPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    button: {
        backgroundColor: 'transparent', 
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5, 
        borderColor: '#007BFF',
        borderWidth: 2,
    },
    buttonText: {
        color: '#007BFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
});

export default BotonSecundario;
