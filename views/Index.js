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
    }

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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Próximos Eventos</Text>
            
            {/* Cards de eventos */}
            <View style={styles.eventsContainer}>
                {eventos.filter(isDateFuture).map((item) => (
                    <View key={item.id} style={styles.eventCard}>
                        <Text 
                            style={styles.eventCardTitle} 
                            onPress={() => navigation.navigate('DetalleEvento', { token: token, idUser: id, idEvent: item.id, evento: item })}
                        >
                            {item.name}
                        </Text>
                        <Text style={styles.eventDate}>{new Date(item.start_date).toLocaleDateString()}</Text>
                        {canAddAttendant(item)
                            ? <Text style={styles.attendantText}>¡Puedes unirte!</Text>
                            : <Text style={styles.attendantText}>Entradas agotadas</Text>}
                    </View>
                ))}
            </View>

            {/* Botones */}
            <TouchableOpacity 
                style={styles.primaryButton} 
                onPress={() => navigation.navigate('Formulario', { token: token, idUser: id, nombre_user: nombre })}
            >
                <Text style={styles.primaryButtonText}>Crear nuevo evento</Text>
            </TouchableOpacity>

            {id === 92 || id === 50 ? (
                <TouchableOpacity 
                    style={styles.secondaryButton} 
                    onPress={() => navigation.navigate("Panel", { token: token })}
                >
                    <Text style={styles.secondaryButtonText}>Ver todos los eventos</Text>
                </TouchableOpacity>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    eventsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    eventCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '48%',
        padding: 15,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginRight: '2%',
    },
    eventCardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    eventDate: {
        fontSize: 14,
        color: '#555',
    },
    attendantText: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        color: '#FF5733', // Naranja para "entradas agotadas"
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});
