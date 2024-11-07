import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importamos Ionicons
import { getEventos } from '../authService';

export default function Panel() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token } = route.params;
    const [eventos, setEventos] = useState([]);

    // Filtra eventos que son futuros
    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
    }

    // Obtener eventos desde el API
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
            await fetchEventos();
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Flecha para volver atrás */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>Próximos Eventos</Text>
            <View style={styles.cardContainer}>
                {eventos.filter(isDateFuture).map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text
                            style={styles.cardTitle}
                            onPress={() =>
                                navigation.navigate('DetalleEventoAdmin', {
                                    idEvent: item.id,
                                    evento: item,
                                    token: token,
                                })
                            }
                        >
                            {item.name}
                        </Text>
                        <Text style={styles.cardDate}>{item.start_date}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.title}>Eventos Pasados</Text>
            <View style={styles.cardContainer}>
                {eventos.filter((event) => !isDateFuture(event)).map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text
                            style={styles.cardTitle}
                            onPress={() =>
                                navigation.navigate('DetalleEventoAdmin', {
                                    idEvent: item.id,
                                    evento: item,
                                    token: token,
                                })
                            }
                        >
                            {item.name}
                        </Text>
                        <Text style={styles.cardDate}>{item.start_date}</Text>
                    </View>
                ))}
            </View>

            {/* Botón para añadir eventos */}
            <TouchableOpacity
                style={[styles.button, styles.createEventButton]}
                onPress={() => navigation.navigate('Formulario', { token })}
            >
                <Text style={styles.buttonText}>Crear Evento</Text>
            </TouchableOpacity>
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
        color: '#2C6B2F',  // Verde
        marginBottom: 10,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row', // Para que las cards estén en fila
        flexWrap: 'wrap',     // Permite que las cards se acomoden en varias filas
        justifyContent: 'space-between', // Espaciado uniforme entre las tarjetas
        gap: 20,              // Espacio entre las tarjetas
        marginBottom: 30,
    },
    card: {
        width: '48%',        // Dos tarjetas por fila
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        transition: 'transform 0.3s ease', // Efecto de hover
        cursor: 'pointer',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
        marginBottom: 10,
        cursor: 'pointer',
    },
    cardDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    createEventButton: {
        backgroundColor: '#34A853', // Verde brillante para el botón
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
