import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { postAuth } from './../authService';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user } = route.params;

    const selectedCategory = categories.find(category => category.id === eventoACrear.id_event_category);
    const selectedLocation = locations.find(location => location.id === eventoACrear.id_event_location);

    const guardarEvento = async () => {
        if (!eventoACrear) {
            console.error("Error al subir evento");
            return;
        }
        await postAuth('event/', eventoACrear, token);
        alert('Tu evento ha sido creado con éxito!');
        navigation.navigate("Index", { nombre: nombre_user, token });
    };

    const eventoNuevo = {
        'Nombre': eventoACrear.name,
        'Descripción': eventoACrear.description,
        'Categoría': selectedCategory ? selectedCategory.name : 'No disponible',
        'Localidad': selectedLocation ? selectedLocation.name : 'No disponible',
        'Fecha inicio': eventoACrear.start_date,
        'Duración en minutos': eventoACrear.duration_in_minutes,
        'Precio': eventoACrear.price,
        'Asistencia máxima': eventoACrear.max_assistance,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Estás seguro?</Text>
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.no} onPress={() => navigation.navigate("Index", { nombre: nombre_user, token })}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                
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
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginVertical: 8,
        fontWeight: '600',
        color: '#333',
    },
    datosEvento: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    no: {
        backgroundColor: 'transparent',
        borderColor: '#007BFF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    si: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
