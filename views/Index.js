import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos, getAuth, get } from '../authService';

export default function Index() {
    const navigation = useNavigation();
    const route = useRoute();
    const { nombre, token } = route.params;
    const [eventos, setEventos] = useState([]);
    const [id, setId] = useState(null);

    const getId = async () => {
        const endpoint = 'user/username/' + nombre;
        const user = await getAuth(endpoint, token);
        return user.id;
    };

    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
    }

    const canAddAttendant = async (event) => {
        const enlistados = await get('event/enrollment/' + event.id.toString());
        return enlistados.length < event.maxAssistant;
    };

    const fetchEventos = async () => {
        try {
            const data = await getEventos(token);
            setEventos(data);
        } catch (error) {
            console.error('Error al cargar los eventos:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userId = await getId();
            setId(userId);
            await fetchEventos();
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Próximos Eventos</Text>

            {/* Usando ScrollView para hacer scrollable el listado de eventos */}
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {eventos.filter(isDateFuture).map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text
                            style={styles.eventTitle}
                            onPress={() => navigation.navigate('DetalleEvento', { token: token, idUser: id, idEvent: item.id, evento: item })}
                        >
                            {item.name}
                        </Text>
                        <Text style={styles.eventDate}>{new Date(item.start_date).toLocaleString()}</Text>
                        {canAddAttendant(item) ? (
                            <Text style={styles.attendantText}>Puedes unirte</Text>
                        ) : (
                            <Text style={styles.attendantText}>Entradas agotadas</Text>
                        )}
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Formulario', { token: token, idUser: id, nombre_user: nombre })}>
                <Text style={styles.buttonText}>Crear nuevo evento</Text>
            </TouchableOpacity>

            {id === 92 || id === 50 ? (
                <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Panel', { token: token })}>
                    <Text style={styles.buttonText}>Ver todos los eventos</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    cardsContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDate: {
        fontSize: 14,
        color: '#777',
        marginVertical: 5,
    },
    attendantText: {
        fontSize: 14,
        color: '#28a745',
    },
    button: {
        backgroundColor: '#ff7043', // Naranja cálido
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSecondary: {
        backgroundColor: '#007BFF', // Azul
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
