import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { postAuth } from '../authService';
import { getCategories, getLocations, getAuth } from '../authService';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DetalleEvento() {
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;
    const navigation = useNavigation();

    const [categories, setCategories ] = useState([]);
    const [locations, setLocations]  = useState([]);

    const enroll = async () => {
        console.log("llego al endpoint de inscribitse");
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
        'Categoria': evento.id_event_category || 'Desconocida', 
        'Localidad': evento.id_event_location || 'Desconocida', 
        'Fecha de inicio': new Date(evento.start_date).toLocaleString(),
        'Duracion': `${evento.duration_in_minutes} minutos`,
        'Precio': `$${evento.price}`
    };

    return (
        <View style={styles.container}>
            {/* Botón de "Atrás" con flecha */}
            <TouchableOpacity
                style={styles.backButton} // Estilo del botón de atrás
                onPress={() => navigation.navigate('Index', { token: token, idUser: idUser })}
            >
                <Ionicons name="arrow-back" size={24} color="#fff" /> {/* Ícono de flecha hacia atrás */}
            </TouchableOpacity>

            {/* Información del evento */}
            <View style={styles.datosEvento}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            {/* Botón de inscripción */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.enrollButton]}
                    onPress={enroll}
                >
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
        backgroundColor: '#F9FAFB', // Fondo claro
        justifyContent: 'center', // Centrado vertical
        alignItems: 'center', // Centrado horizontal
    },
    datosEvento: {
        width: '100%',
        maxWidth: 600, // Máximo ancho para pantallas grandes
        padding: 15,
        backgroundColor: '#ffffff', // Fondo blanco
        borderRadius: 10, // Bordes redondeados
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // Sombra ligera para dar profundidad
        marginBottom: 20, // Espacio entre los elementos
    },
    text: {
        fontSize: 16,
        color: '#333', // Texto oscuro para mejor contraste
        marginVertical: 5, // Espaciado entre los textos
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row', // Alineación horizontal de los botones
        justifyContent: 'space-between', // Espaciado entre los botones
    },
    button: {
        flex: 1,
        backgroundColor: '#4CAF50', // Color verde para el botón principal
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center', // Alineación del texto al centro
        justifyContent: 'center', // Centrar contenido
    },
    enrollButton: {
        backgroundColor: '#4CAF50', // Botón de inscripción con verde
    },
    buttonText: {
        color: 'white', // Texto blanco para los botones
        fontSize: 16,
        fontWeight: '600',
    },
    // Estilo del botón de flecha
    backButton: {
        position: 'absolute', // Fijar el botón en la parte superior
        left: 20, // Desplazarlo desde la izquierda
        top: 20, // Colocarlo en la parte superior
        backgroundColor: '#4CAF50', // Fondo verde
        borderRadius: 50, // Redondeo del botón
        padding: 10, // Espaciado pequeño alrededor del ícono
        alignItems: 'center', // Alineación del ícono al centro
        justifyContent: 'center', // Centrado del ícono
    },
});
