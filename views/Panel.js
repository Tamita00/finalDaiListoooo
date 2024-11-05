import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos } from '../authService';

export default function Panel() {
    const navigation = useNavigation();
    const route = useRoute();
    const [eventos, setEventos] = useState([]);
    const { token } = route.params;

    // Función para verificar si la fecha del evento es futura
    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
    }

    // Cargar los eventos desde el servidor
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

            {/* Eventos futuros */}
            <Text style={styles.title}>Próximos Eventos</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {eventos.filter(isDateFuture).map((item) => (
                    <View key={item.id} style={styles.eventCard}>
                        <Text 
                            style={styles.eventTitle} 
                            onPress={() => navigation.navigate('DetalleEventoAdmin', { idEvent: item.id, evento: item, token: token })}
                        >
                            {item.name}
                        </Text>
                        <Text>{item.start_date}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Eventos pasados */}
            <Text style={styles.title}>Eventos Pasados</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {eventos.filter(event => !isDateFuture(event)).map((item) => (
                    <View key={item.id} style={styles.eventCard}>
                        <Text 
                            style={styles.eventTitle} 
                            onPress={() => navigation.navigate('DetalleEventoAdmin', { idEvent: item.id, evento: item, token: token })}
                        >
                            {item.name}
                        </Text>
                        <Text>{item.start_date}</Text>
                    </View>
                ))}
            </ScrollView>
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
        marginBottom: 20,
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 5,
    },
});
