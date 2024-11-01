import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Boton from '../components/Boton';
import BotonSecundario from '../components/BotonSecundario';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos, getAuth, get } from '../authService';


export default function Panel() {
    const navigation = useNavigation();
    const route = useRoute();
    const [eventos, setEventos] = useState([]);
    const { token } = route.params;

    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
    }

    const fetchEventos = async () => {
        try {
            const data = await getEventos(token);
            setEventos(data);
            console.log(data[0]);
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
            <Text style={styles.title}>Próximos Eventos</Text>
            <FlatList
                data={eventos.filter(isDateFuture)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventContainer}>
                        <Text style={styles.eventTitle} onPress={() => navigation.navigate('DetalleEventoAdmin', {idEvent: item.id })}>{item.name}</Text>
                        <Text>{item.start_date}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                style={styles.flatList}
            />
            <Text style={styles.title}>Eventos pasados</Text>
            <FlatList
                data={eventos.filter(event => !isDateFuture(event))}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventContainer}>
                        <Text style={styles.eventTitle} onPress={() => navigation.navigate('DetalleEventoAdmin', { idEvent: item.id })}>{item.name}</Text>
                        <Text>{item.start_date}</Text>
                    </View>
                )}
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
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
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
