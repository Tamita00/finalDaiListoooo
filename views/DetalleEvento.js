import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { postAuth } from '../authService';
import { getCategories, getLocations } from '../authService';
import { Ionicons } from '@expo/vector-icons'; // Para usar el ícono de la flecha

export default function DetalleEvento() {
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;
    const navigation = useNavigation();

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const enroll = async () => {
        const endpoint = 'event/' + idEvent + '/enrollment';
        const enrollment = await postAuth(endpoint, evento, token);
        console.log('enrollment.data', enrollment.data);
        alert('Te registraste exitosamente! :D');
        navigation.navigate('Index', { token: token, idUser: idUser });
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token);
                setCategories(data);
            } catch (error) {
                console.error('(UseEffect) Error al cargar las categorías:', error);
            }
        };
    
        const fetchLocations = async () => {
            try {
                const data = await getLocations(token);
                setLocations(data);
            } catch (error) {
                console.error('(UseEffect) Error al cargar las localidades:', error);
            }
        };
    
        fetchCategories();
        fetchLocations();
    }, [token]);

    const displayData = {
        'Nombre': evento.name,
        'Descripcion': evento.description,
        'Categoria': categories[evento.id_event_category] ? categories[evento.id_event_category].name : 'Desconocida',
        'Localidad': locations[evento.id_event_location] ? locations[evento.id_event_location].name : 'Desconocida',
        'Fecha de inicio': new Date(evento.start_date).toLocaleString(),
        'Duracion': `${evento.duration_in_minutes} minutos`,
        'Precio': `$${evento.price}`
    };

    return (
        <View style={styles.container}>
            {/* Flecha para regresar atrás */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            
            {/* Datos del evento */}
            <View style={styles.datosEvento}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            {/* Botones de acción */}
            <View style={styles.buttonsContainer}>
                {/* Botón "Inscribirse" */}
                <TouchableOpacity style={styles.enrollButtonStyle} onPress={enroll}>
                    <Text style={styles.buttonText}>Inscribirse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    datosEvento: {
        width: '100%',
        maxWidth: 600, 
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    enrollButtonStyle: {
        flex: 1,
        backgroundColor: 'green', // Botón verde para inscribirse
        paddingVertical: 12,
        marginLeft: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});
