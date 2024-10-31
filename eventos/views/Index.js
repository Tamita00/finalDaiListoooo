import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Index () {
    const navigation = useNavigation();
    const route = useRoute();
    const { nombre, apellido = '' } = route.params; // Default empty string for apellido

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido, {nombre} {apellido}!</Text>
            <Text style={styles.subtitle}>Has iniciado sesión exitosamente.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Text: {
        fontSize: 16,
    }
});

