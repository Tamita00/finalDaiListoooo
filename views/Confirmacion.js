import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { postAuth } from './../authService';
import React from 'react';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user } = route.params;
    let selectedCategory, selectedLocation;

    selectedCategory = categories.find((category) => category.id === eventoACrear.id_event_category);
    selectedLocation = locations.find((location) => location.id === eventoACrear.id_event_location);
    
    const guardarEvento = async () => {
        if (eventoACrear === null) {
            console.error("Error al subir evento: ", error);
        } else {
            postAuth('event/', eventoACrear, token);
            alert('Tu evento ha sido creado con éxito!');
            navigation.navigate("Index", { nombre: nombre_user, token: token });
        }
    };

    const eventoNuevo = {
        'Nombre': eventoACrear.name,
        'Descripción': eventoACrear.description,
        'Categoría': selectedCategory ? selectedCategory.name : null,
        'Localidad': selectedLocation ? selectedLocation.name : null,
        'Fecha inicio': eventoACrear.start_date,
        'Duración en minutos': eventoACrear.duration_in_minutes,
        'Precio': eventoACrear.price,
        'Asistencia máxima': eventoACrear.max_assistance,
    };

    return (
        <View style={styles.container}>
            {/* Título */}
            <Text style={styles.title}>¿Querés publicar este evento?</Text>
            
            {/* Detalles del evento */}
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
            
            {/* Botones */}
            <TouchableOpacity style={[styles.button, styles.no]} onPress={() => navigation.navigate("Index", { nombre: nombre_user, token: token })}>
                <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.si]} onPress={guardarEvento}>
                <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',  // Fondo neutro
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',  // Color oscuro
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: 'bold',
        color: '#333',  // Color oscuro
    },
    datosEvento: {
        backgroundColor: '#fff',  // Fondo blanco para los detalles
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,  // Sombra en Android
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    no: {
        backgroundColor: '#e0e0e0',  // Gris claro para el botón de "No"
        borderColor: '#ccc',
        borderWidth: 1,
    },
    si: {
        backgroundColor: '#28a745',  // Verde para el botón de "Sí"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
