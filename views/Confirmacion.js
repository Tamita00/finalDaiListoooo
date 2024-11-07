import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { postAuth } from './../authService';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user, idUser } = route.params;

    const selectedCategory = categories.find((category) => category.id === eventoACrear.id_event_category);
    const selectedLocation = locations.find((location) => location.id === eventoACrear.id_event_location);
    
    const guardarEvento = async () => {
        try {
            if (!eventoACrear) {
                throw new Error("Evento no válido");
            }
            await postAuth('event/', eventoACrear, token);
            Alert.alert('Éxito', 'Tu evento ha sido creado con éxito!');
            navigation.navigate("Index", { nombre: nombre_user, token });
        } catch (error) {
            console.error("Error al subir evento:", error);
            Alert.alert('Error', 'Hubo un problema al crear el evento');
        }
    };

    const eventoNuevo = {
        'Nombre': eventoACrear.name,
        'Descripción': eventoACrear.description,
        'Categoría': selectedCategory ? selectedCategory.name : 'No especificada',
        'Localidad': selectedLocation ? selectedLocation.name : 'No especificada',
        'Fecha inicio': new Date(eventoACrear.start_date).toLocaleString(),
        'Duración en minutos': eventoACrear.duration_in_minutes,
        'Precio': `$${eventoACrear.price}`,
        'Asistencia máxima': eventoACrear.max_assistance,
    };

    return (
        <View style={[styles.container, styles.boxShadow]}>
            <Text style={styles.title}>¿Querés publicar este evento?</Text>
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    datosEvento: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: 'rgb(0, 123, 255)',
        borderRadius: 10,
        padding: 25,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        maxWidth: 300,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    noButton: {
        backgroundColor: 'transparent',
        borderColor: '#007BFF',
        borderWidth: 1,
    },
    siButton: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    boxShadow: {
        shadowColor: 'grey',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16,
    },
});
