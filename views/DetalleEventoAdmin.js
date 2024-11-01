import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <h1>Más acerca del evento</h1>
            <Text style={styles.description}>
                Aquí podrás ver todos los detalles del evento y gestionarlo.
            </Text>
            <View style={styles.buttonContainer}>

            <TouchableOpacity onPress={() => navigation.navigate('EditarEvento')}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => alert('Evento eliminado.')}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginVertical: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
