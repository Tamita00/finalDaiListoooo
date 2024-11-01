
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos, getAuth, get } from '../authService';
import AuthContext from './AuthContext'; // Importa el contexto

export default function Index() {
    const navigation = useNavigation();

    const route = useRoute();
    //const { nombre, token } = route.params;
    const [eventos, setEventos] = useState([]);
    const [userId, setUserId] = useState(null);

    const getId = async () => {
        const endpoint = 'user/username/' + nombre;
        const user = await getAuth(endpoint, token);
        console.log('user ', user)
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



const renderItem = async ({ item }) => {
        const canJoin = await canAddAttendant(item);
        return (
            <View style={styles.eventContainer}>
                <Text 
                    style={styles.eventTitle} 
                    onPress={() => navigation.navigate('DetalleEvento', { token, idUser: userId, idEvent: item.id })}>
                    {item.name}
                </Text>
                <Text>{item.start_date}</Text>
                <Text style={styles.attendantText}>
                    {canJoin ? 'Únete' : 'No hay más entradas'}
                </Text>
            </View>
        );
    };


    const handleLogout = () => {
        logout(); // Cierra sesión
        navigation.navigate('Home'); // Navega a la pantalla de inicio de sesión
      };
        //const { signOut } = useContext(AuthContext); // Usa el contexto  -----> esto es para que el cerrar sesion ande






    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Próximos Eventos</Text>
            <FlatList
                data={eventos.filter(isDateFuture)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Formulario', { token, idUser: userId, nombre_user: nombre })}>
                <Text style={styles.buttonText}>Crear nuevo evento</Text>
            </TouchableOpacity>

            {(userId === 92 || userId === 50) && (
                <TouchableOpacity 
                    style={styles.secondaryButton} 
                    onPress={() => navigation.navigate("Panel", { token })}>
                    <Text style={styles.buttonText}>Ver todos los eventos</Text>
                </TouchableOpacity>
            )}

           
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={() => {
                    signOut(); // Llama a la función de cerrar sesión
                    navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
                }}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
    };

    


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
    attendantText: {
        marginTop: 5,
        color: '#555',
    },
    logoutButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FF3D00',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

