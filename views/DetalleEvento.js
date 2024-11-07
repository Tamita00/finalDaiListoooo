import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { postAuth, getCategories, getLocations } from '../authService';

export default function DetalleEvento() {
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;
    const navigation = useNavigation();

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const enroll = async () => {
        try {
            const endpoint = `event/${idEvent}/enrollment`;
            await postAuth(endpoint, evento, token);
            Alert.alert('Éxito', 'Te registraste exitosamente! :D');
            navigation.navigate('Index', { token, idUser });
        } catch (error) {
            console.error('Error al inscribirse:', error);
            Alert.alert('Error', 'No se pudo completar la inscripción');
        }
    };

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

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Desconocida';
    };

    const getLocationName = (locationId) => {
        const location = locations.find(loc => loc.id === locationId);
        return location ? location.name : 'Desconocida';
    };

    const displayData = {
        'Nombre': evento.name,
        'Descripcion': evento.description,
        'Categoria': getCategoryName(evento.id_event_category),
        'Localidad': getLocationName(evento.id_event_location),
        'Fecha de inicio': new Date(evento.start_date).toLocaleString(),
        'Duracion': `${evento.duration_in_minutes} minutos`,
        'Precio': `$${evento.price}`
    };

    return (
        <View style={styles.container}>
            <View style={styles.datosEvento}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.secondaryButton]} 
                    onPress={() => navigation.navigate('Index', { token, idUser })}
                >
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
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
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datosEvento: {
        width: '100%',
        maxWidth: 600,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 600,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    secondaryButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
