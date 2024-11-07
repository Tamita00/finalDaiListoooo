import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { get, deleteAuth } from '../authService';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
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
        Alert.alert(
            "Confirmación",
            "¿Querés eliminar el evento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", onPress: async () => {
                        try {
                            await deleteAuth(`event/${evento.id}`, token);
                            Alert.alert("Evento eliminado con éxito.");
                        } catch (error) {
                            console.error("Error al eliminar el evento:", error);
                            Alert.alert("Hubo un problema al eliminar el evento.");
                        }
                    }
                }
            ]
        );
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
            {/* Flecha para regresar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Index', { token, id: idUser })}>
                <Ionicons name="arrow-back" size={30} color="#757575" />
            </TouchableOpacity>

            <Text style={styles.title}>Detalle del evento</Text>

            <View style={[styles.card, styles.cardData]}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

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

            <View style={styles.containerBotones}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.navigate('Index', { token: token, id: idUser })}
                >
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>
                {fechaInicioEvento > fechaActual && (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Edicion', { idEvent, token, id: idUser, eventoAEditar: evento })}
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
                )}
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
        left: 10,
        zIndex: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    containerBotones: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 600,
        marginTop: 20,
        justifyContent: 'space-around',
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
        fontSize: 20,
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
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        width: '45%',
    },
    buttonSecondary: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
