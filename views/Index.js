import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Boton from '../components/Boton';
import BotonSecundario from '../components/BotonSecundario';
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
    {
        const enlistados = await get('event/enrollment/' + event.id.toString());
        return enlistados.length < event.maxAssistant;
    }}

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
            <FlatList
                data={eventos.filter(isDateFuture)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventContainer}>
                        <Text style={styles.eventTitle} onPress={() => navigation.navigate('DetalleEvento', { token: token, idUser: id, idEvent: item.id, evento: item })}>{item.name}</Text>
                        {/* <Text style={styles.eventTitle} onPress={() => console.log('a ver este item.id: ', item.id)}> {item.name} </Text> */}
                        <Text>{item.start_date}</Text>
                        {canAddAttendant(item)
                            ? <Text style={styles.attendantText}>Podes unirte</Text>
                            : <Text style={styles.attendantText}>Entradas agotadas</Text>}
                    </View>
                )}
                contentContainerStyle={styles.listContainer}

            />
            <Boton text={"Crear nuevo evento"} onPress={() => navigation.navigate('Formulario', { token: token, idUser: id, nombre_user: nombre })} />
            {id === 92 || id === 50 ? (
            <BotonSecundario text="Ver todos los eventos" onPress={() => navigation.navigate("Panel", { token: token })} />
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
});
