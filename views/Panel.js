import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos } from '../authService';

export default function Panel() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token } = route.params;
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos(token);
                setEventos(data);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };

        fetchEventos();
    }, [token]);

    const isDateFuture = (event) => new Date(event.start_date) > new Date();

    const renderEventItem = ({ item }) => (
        <View style={styles.eventContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('DetalleEventoAdmin', { idEvent: item.id })}>
                <Text style={styles.eventTitle}>{item.name}</Text>
                <Text>{item.start_date}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Próximos Eventos</Text>
            <FlatList
                data={eventos.filter(isDateFuture)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEventItem}
                contentContainerStyle={styles.listContainer}
                style={styles.flatList}
            />
            <Text style={styles.title}>Eventos Pasados</Text>
            <FlatList
                data={eventos.filter(event => !isDateFuture(event))}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEventItem}
                contentContainerStyle={styles.listContainer}
                style={styles.flatList}
            />
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
        marginBottom: 10,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    eventContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 1,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    flatList: {
        maxHeight: 200,
    },
});
