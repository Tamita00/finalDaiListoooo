import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from './../authService';

export default function DetalleEvento() {
    const route = useRoute();
    const { idEvento, token, idUser } = route.params;
    const navigation = useNavigation();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const endpoint = `event/${idEvento}`;
            const fetchedEvent = await getAuth(endpoint, token);
            setEvent(fetchedEvent);
        };
        fetchEvent();
    }, [idEvento, token]);

    const enroll = () => {
        alert('¿Deseas inscribirte en este evento?');
    };

    return (
        <View style={styles.container}>
            {event ? (
                <>
                    <h1>{event.name}</h1>
                    <h3>{event.description}</h3>
                    <h3>Fecha: {event.date}</h3>
                    <h3>Lugar: {event.location}</h3>
                </>
            ) : (
                <h3>Cargando evento...</h3>
            )}
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.no} onPress={() => navigation.navigate('Index', { token, id: idUser })}>
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.no} onPress={enroll}>
                    <Text style={styles.buttonText}>Inscribirse</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#f9f9f9',
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
    },
    details: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    secundario: {
        flex: 1,
        marginRight: 10,
    },
    principal: {
        flex: 1,
    },
});
