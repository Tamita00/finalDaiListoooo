import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { postAuth } from './../authService';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de atrás

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user, idUser  } = route.params;
    let selectedCategory, selectedLocation;

    selectedCategory = categories.find((category) => category.id === eventoACrear.id_event_category);
    selectedLocation = locations.find((location) => location.id === eventoACrear.id_event_location);

    const guardarEvento = async () => {
        if(eventoACrear === null){
            console.error("Error al subir evento");
        }else{
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
        <View style={[styles.boxShadow, styles.container]}>
            {/* Flecha para volver atrás */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            
            {/* Título */}
            <Text style={styles.title}>¿Querés publicar este evento?</Text>
            
            {/* Datos del evento */}
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            {/* Botones de acción */}
            <View style={styles.buttonsContainer}>
                {/* Botón "No" Rojo */}
                <TouchableOpacity style={styles.no} onPress={() => navigation.navigate("Index", { nombre: nombre_user, token: token })}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>

                {/* Botón "Sí" Verde */}
                <TouchableOpacity style={styles.si} onPress={guardarEvento}>
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
        backgroundColor: '#f4f4f9', // Fondo claro
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: 'bold',
        color: '#333', // Color oscuro para el texto
    },
    datosEvento: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        marginBottom: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        width: '100%',
    },
    boxShadow: {
        shadowColor: "grey",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    no: {
        flex: 1,
        backgroundColor: 'red', // Botón rojo
        paddingVertical: 12,
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    si: {
        flex: 1,
        backgroundColor: 'green', // Botón verde
        paddingVertical: 12,
        marginLeft: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});
