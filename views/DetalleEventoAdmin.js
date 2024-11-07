import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BotonSecundario from '../components/BotonSecundario';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React, { useState, useEffect } from 'react';
import { get, deleteAuth } from '../authService';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
    const saludo = "Detalle del evento";
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;
    const [inscriptos, setInscriptos] = useState([]);

    const fetchInscriptos = async () => {
        try {
            const data = await get('event/enrollment/' + idEvent);
            setInscriptos(data);
        } catch (error) {
            console.error('Error al cargar los inscriptos:', error);
        }
    };

    const eliminarEvento = async () => {
        const confirmacion = window.confirm("¿Querés eliminar el evento?");
    
        if (confirmacion) {
            try {
                await deleteAuth(`event/${evento.id}`, token);
                alert("Evento eliminado con éxito.");
            } catch (error) {
                console.error("Error al eliminar el evento:", error);
                alert("Hubo un problema al eliminar el evento.");
            }
        }
    };
    

    useEffect(() => {
        fetchInscriptos();
    }, []);

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
            <View style={[styles.card, styles.cardData]}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
            <View style={styles.card}>
                <h2 style={styles.tituloCard}>Inscriptos</h2>
                <FlatList
                    data={inscriptos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.text}>{item.username}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.listContainer}
                    style={styles.flatList}
                />
            </View>
            <View style={styles.containerBotones}>
                <BotonSecundario 
                    text={'Atrás'} 
                    onPress={() => navigation.navigate('Index', { token: token, id: idUser })} 
                />
                {fechaInicioEvento > fechaActual ? (
                    <>
                        <Boton 
                            text={'Editar'} 
                            onPress={() => navigation.navigate('Edicion', { idEvent: idEvent, token: token, id: idUser, eventoAEditar: evento })} 
                        />
                        <Boton
                            text={'Eliminar'}
                            onPress={eliminarEvento}
                        />
                    </>
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
    containerBotones: {
        flexDirection: 'row',
        width: '10%',
        maxWidth: 600,
        marginTop: 20,
        left: -120
    },
    card: {
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
    cardData: {
        height: 'fit-content',
    },
    tituloCard: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'rgb(16, 137, 211)',
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginVertical: 2.5,
    },
    listContainer: {
        paddingBottom: 20,
    },
    flatList: {
        maxHeight: '50%',
    },
});

