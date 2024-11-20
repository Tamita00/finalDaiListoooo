import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos, getAuth, get } from '../authService';
import { Ionicons } from '@expo/vector-icons'; // Para el ícono de la flecha

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
            setEventos([]);  // Limpiar eventos antes de hacer el fetch
            const userId = await getId();
            setId(userId);
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
                        <Text style={styles.eventTitle} onPress={() => navigation.navigate('DetalleEvento', { token: token, idUser: id, idEvent: item.id, evento: item })}>{item.name}</Text>
                        <Text>{item.start_date}</Text>
                        {canAddAttendant(item)
                            ? <Text style={styles.attendantText}>Podes unirte</Text>
                            : <Text style={styles.attendantText}>Entradas agotadas</Text>}
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Formulario', { token: token, idUser: id, nombre_user: nombre })}>
                <Text style={styles.buttonText}>Crear nuevo evento</Text>
            </TouchableOpacity>
            {id === 34 || id === 36 ? (
                <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate("Panel", { token: token, nombre_user: nombre, idUser: id })}>
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
    backButton: {
        position: 'absolute',
        top: 20,
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
    attendantText: {
        color: '#888',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 3,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#B0BEC5',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 3,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
