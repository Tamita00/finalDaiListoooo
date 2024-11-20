import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de atrás
import { get, deleteAuth } from '../authService';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
    const saludo = "Detalle del evento";
    const route = useRoute();
    const { idEvent, token, idUser, evento, nombre_user } = route.params;
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
        'Categoria': evento.id_event_category || 'Desconocida',
        'Localidad': evento.id_event_location || 'Desconocida', 
        'Fecha de inicio': new Date(evento.start_date).toLocaleString(),
        'Duracion': `${evento.duration_in_minutes} minutos`,
        'Precio': `$${evento.price}`
    };

    const fechaInicioEvento = new Date(evento.start_date);
    const fechaActual = new Date();

    return (
        <View style={styles.container}>
            {/* Flecha para regresar atrás */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>

            {/* Título del evento */}
            <Text style={styles.title}>{saludo}</Text>

            {/* Detalles del evento */}
            <View style={[styles.card, styles.cardData]}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            {/* Lista de inscriptos */}
            <View style={styles.card}>
                <Text style={styles.tituloCard}>Inscriptos</Text>
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

            {/* Botones de acción */}
            <View style={styles.containerBotones}>
                {fechaInicioEvento > fechaActual ? (
                    <>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('Edicion', { idEvent: idEvent, token: token, idUser: idUser, eventoAEditar: evento, nombre_user: nombre_user })}
                        >
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={eliminarEvento}
                        >
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    containerBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 600,
        marginTop: 20,
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
        fontSize: 24,
        color: 'rgb(16, 137, 211)',
        marginBottom: 10,
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
    button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        marginHorizontal: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});
