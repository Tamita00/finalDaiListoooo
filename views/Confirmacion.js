import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { postAuth } from './../authService';
import React from 'react';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user, idUser } = route.params;
    let selectedCategory, selectedLocation;

    selectedCategory = categories.find((category) => category.id === eventoACrear.id_event_category);
    selectedLocation = locations.find((location) => location.id === eventoACrear.id_event_location);

    const guardarEvento = async () => {
        if(eventoACrear === null){
            console.error("Error al subir evento: ", error)
        } else {
            postAuth('event/', eventoACrear, token)
            alert('Tu evento ha sido creado con éxito!')
            navigation.navigate("Index", { nombre: nombre_user, token: token })
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
            
            <Text style={styles.title}>¿Querés publicar este evento?</Text>
            
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={[styles.boton, styles.no]} onPress={() => navigation.navigate("Index", { nombre: nombre_user, token: token })}>
                <Text style={styles.botonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.boton, styles.si]} onPress={guardarEvento}>
                <Text style={styles.botonText}>Sí</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',  // Añadí un fondo neutro
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C6B2F',  // Color verde para el título
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: 'bold',
        color: 'black', // Color de texto ajustado a negro para mayor contraste
    },
    datosEvento: {
        backgroundColor: '#34A853',  // Fondo verde
        borderRadius: 8,
        padding: 25,
        width: '100%',
        marginBottom: 20,
    },
    boxShadow: {
        shadowColor: "grey",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16,
    },
    boton: {
        width: '80%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    no: {
        borderColor: '#34A853',
        backgroundColor: 'transparent',
        borderWidth: 1,
    },
    si: {
        backgroundColor: '#34A853',
    },
    botonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
