import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import React, { useState, useEffect } from 'react';
import BotonSecundario from '../components/BotonSecundario';
import { postAuth } from '../authService';
import { getCategories, getLocations, getAuth } from '../authService';

export default function DetalleEvento() {
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;
    const navigation = useNavigation();

    const [categories, setCategories ] = useState([]);
    const [locations, setLocations]  = useState([]);

    const enroll = async () => {
        const endpoint = 'event/' + idEvent + '/enrollment';
        const enrollment = await postAuth(endpoint, evento, token);
        console.log('enrollment.data', enrollment.data);
        // if(enrollment.response.data == 'Ya te registraste para este evento antes.') //no se si está bien puesto pero no tira el alert :/
        //     alert('No te podes registrar dos veces al mismo evento')
        // else
            alert('Te registraste exitosamente! :D')
            navigation.navigate('Index', { token: token, idUser: idUser});
            //return enrollment;
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

    console.log('id_event_category', evento.id_event_category);
    console.log('categorías', categories); 
    console.log('categorías sub id-event-category', categories[evento.id_event_category]); 

    const displayData = {
        'Nombre': evento.name,
        'Descripcion': evento.description,
        'Categoria': evento.id_event_category || 'Desconocida', //se que solo tira el id de la categoría pero no estoy pudiendo hacer que agarre el nombre
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
                <BotonSecundario 
                    text={'Atrás'} 
                    onPress={() => navigation.navigate('Index', { token: token, id: idUser })} 
                />
                <Boton 
                    text={'Inscribirse'} 
                    onPress={enroll} 
                /> 
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
        maxWidth: 600, // Máximo ancho para pantallas grandes
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
        color: '#333',
        marginVertical: 5,
    },
})