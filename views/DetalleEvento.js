import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { postAuth } from '../authService';
import { getCategories, getLocations, getAuth } from '../authService';

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
        'Categoria': evento.id_event_category || 'Desconocida',
        'Localidad': evento.id_event_location || 'Desconocida',
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
            <View>
                <TouchableOpacity 
                    style={styles.buttonSecondary} 
                    onPress={() => navigation.navigate('Index', { token: token, id: idUser })}
                >
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonPrimary} 
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
        backgroundColor: '#fff3e6', // Color de fondo suave, como un tono coral
        justifyContent: 'center',
        alignItems: 'center',
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
        color: '#4d4d4d', // Gris oscuro para mejor contraste
        marginVertical: 5,
    },
    buttonPrimary: {
        backgroundColor: '#ff7043', // Color principal (naranja cálido)
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#ffab91', // Color secundario (naranja claro)
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
