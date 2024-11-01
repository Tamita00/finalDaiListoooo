import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React from 'react';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
    const saludo = "Detalle del evento";

    return (
        <View style={styles.container}>
            <Title text={saludo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
