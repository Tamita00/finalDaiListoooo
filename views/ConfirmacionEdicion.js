import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import { putEvento } from '../authService';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importar Ionicons

export default function ConfirmacionEdicion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoAEditar, token, categories, locations, nombre, idUser } = route.params;

    const selectedCategory = categories.find((category) => category.id === eventoAEditar.id);
    console.log(eventoAEditar, token, categories, locations, nombre, idUser);
    const selectedLocation = locations.find((location) => location.id === eventoAEditar.id_event_location);
    
    const guardarEvento = async () => {
        try {
            if (!eventoAEditar) {
                throw new Error("Evento no válido");
            }
            await putEvento('/event/', eventoAEditar, token);
            
            //await postAuth('event/', eventoAEditar, token);
            Alert.alert('Éxito', 'Tu evento ha sido creado con éxito!');
            // navigation.navigate("Index", { nombre: nombre, token });
        } catch (error) {
            console.error("Error al subir evento:", error);
            Alert.alert('Error', 'Hubo un problema al crear el evento');
        }
    };

    const eventoNuevo = {
        'Nombre': eventoAEditar.name,
        'Descripción': eventoAEditar.description,
        'Categoría': selectedCategory ? selectedCategory.name : 'No especificada',
        'Localidad': selectedLocation ? selectedLocation.name : 'No especificada',
        'Fecha inicio': new Date(eventoAEditar.start_date).toLocaleString(),
        'Duración en minutos': eventoAEditar.duration_in_minutes,
        'Precio': `$${eventoAEditar.price}`,
        'Asistencia máxima': eventoAEditar.max_assistance,
    };

    return (
        <View style={styles.container}>
            {/* Botón de flecha para volver */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()} // Navega hacia atrás
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {/* Título */}
            <Text style={styles.title}>Confirmar</Text>

            {/* Detalles del evento */}
            <View style={styles.eventDetails}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            {/* Botones de Confirmación */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.noButton]} 
                    onPress={() => navigation.navigate("Index", { nombre: nombre_user, token })}
                >
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.siButton]} 
                    onPress={guardarEvento}
                >
                    <Text style={styles.buttonText}>Sí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
        padding: 20,
        justifyContent: 'flex-start', // Alineación de elementos desde el inicio
        alignItems: 'center', // Centramos todos los elementos horizontalmente
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
    },
    arrowIcon: {
        width: 25,
        height: 25,
        tintColor: '#34A853', // Verde
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Cambié el color a #333
        textAlign: 'center',
        marginVertical: 30,
    },
    eventDetails: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: 'transparent', // Eliminado el contenedor verde
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#333', // Cambié el color a #333
        marginBottom: 10,
        textAlign: 'center', // Centrado del texto
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    noButton: {
        backgroundColor: '#D32F2F',
        borderColor: '#D32F2F',
        borderWidth: 2,
    },
    siButton: {
        backgroundColor: '#2C6B2F', // Verde
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
