import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { postAuth } from './../authService';
import React from 'react';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user, idUser  } = route.params;
    let selectedCategory, selectedLocation;

    selectedCategory = categories.find((category) => category.id === eventoACrear.id_event_category);
    selectedLocation = locations.find((location) => location.id === eventoACrear.id_event_location);

    const guardarEvento = async () => {
        if (eventoACrear === null) {
            console.error("Error al subir evento");
        } else {
            await postAuth('event/', eventoACrear, token);
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
            <Text style={styles.title}>¿Querés publicar este evento?</Text>
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.no]}
                    onPress={() => navigation.navigate("Index", { nombre: nombre_user, token: token })}
                >
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.si]}
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
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: '500',
        color: '#333',
    },
    datosEvento: {
        width: '100%',
        backgroundColor: '#e6f7ff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    no: {
        borderColor: '#007BFF',
        backgroundColor: 'transparent',
        borderWidth: 1,
    },
    si: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
