import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos } from '../authService';

export default function Panel() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token } = route.params;
    const [eventos, setEventos] = useState([]);

    // Función para filtrar eventos futuros
    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
    }

    // Función para obtener eventos
    const fetchEventos = async () => {
        try {
            const data = await getEventos(token);
            setEventos(data);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los eventos.');
            console.error('Error al cargar los eventos:', error);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Próximos Eventos</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
                {eventos.filter(isDateFuture).map(item => (
                    <View style={styles.card} key={item.id}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetalleEventoAdmin', { idEvent: item.id, evento: item, token: token })}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDate}>{item.start_date}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Text style={styles.title}>Eventos Pasados</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
                {eventos.filter(event => !isDateFuture(event)).map(item => (
                    <View style={styles.card} key={item.id}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetalleEventoAdmin', { idEvent: item.id, evento: item, token: token })}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDate}>{item.start_date}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        marginRight: 15,
        padding: 20,
        borderRadius: 12,
        width: 250,
        height: 180,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    cardDate: {
        fontSize: 14,
        color: '#333',
    },
});
