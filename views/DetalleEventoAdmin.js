import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BotonSecundario from '../components/BotonSecundario';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React from 'react';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
    const saludo = "Detalle del evento";
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;

    const displayData = {
        'Nombre': evento.name,
        'Descripcion': evento.description,
        'Categoria': evento.id_event_category || 'Desconocida', // se que solo tira el id de la categoría pero no estoy pudiendo hacer que agarre el nombre
        'Localidad': evento.id_event_location || 'Desconocida', 
        'Fecha de inicio': new Date(evento.start_date).toLocaleString(),
        'Duracion': `${evento.duration_in_minutes} minutos`,
        'Precio': `$${evento.price}`
    };

    const fechaInicioEvento = new Date(evento.start_date);
    const fechaActual = new Date();

    return (
        <View style={styles.container}>
            <Title text={saludo} />
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
                {fechaInicioEvento > fechaActual ? (
                    <Boton 
                        text={'Editar'} 
                        onPress={() => navigation.navigate('Edicion', { idEvent: idEvent, token: token, id: idUser, eventoAEditar: evento })} 
                    />
                ) : null}
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
});
