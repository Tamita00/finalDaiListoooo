import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React from 'react';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
    const saludo = "Detalle del evento";
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;

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
            {/* Reemplazo de Title por un Text normal */}
            <Text style={styles.title}>{saludo}</Text>

            <View style={styles.datosEvento}>
                {Object.entries(displayData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>

            <View style={styles.buttonsContainer}>
                {/* Reemplazo de BotonSecundario por TouchableOpacity */}
                <TouchableOpacity 
                    style={[styles.button, styles.backButton]} 
                    onPress={() => navigation.navigate('Index', { token: token, id: idUser })}>
                    <Text style={styles.buttonText}>Atrás</Text>
                </TouchableOpacity>

                {/* Solo mostramos el botón de "Editar" si la fecha del evento es posterior a la fecha actual */}
                {fechaInicioEvento > fechaActual ? (
                    <TouchableOpacity 
                        style={[styles.button, styles.editButton]} 
                        onPress={() => navigation.navigate('Edicion', { idEvent: idEvent, token: token, id: idUser, eventoAEditar: evento })}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007BFF', // Azul similar al original
    },
    editButton: {
        backgroundColor: '#007BFF', // Azul para el botón de "Editar"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600', // Textos con más peso
    },
});
