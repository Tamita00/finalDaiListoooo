import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';  // Para la flecha
import { getEventos } from '../authService';

export default function Panel() {
    const navigation = useNavigation();
    const route = useRoute();
    const [eventos, setEventos] = useState([]);
    const { token, nombre_user, idUser } = route.params;

    function isDateFuture(event) {
        const hoy = new Date();
        return new Date(event.start_date) > hoy;
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
            await fetchEventos();
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Próximos Eventos</Text>
            <FlatList
                data={eventos.filter(isDateFuture)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventContainer}>
                        <Text
                            style={styles.eventTitle}
                            onPress={() => navigation.navigate('DetalleEventoAdmin', {
                                idEvent: item.id,
                                evento: item,
                                token: token,
                                nombre_user: nombre_user,
                                idUser
                            })}
                        >
                            {item.name}
                        </Text>
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
                        <Text
                            style={styles.eventTitle}
                            onPress={() => navigation.navigate('DetalleEventoAdmin', {
                                idEvent: item.id,
                                evento: item,
                                token: token,
                                nombre_user: nombre_user,
                                idUser
                            })}
                        >
                            {item.name}
                        </Text>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
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
