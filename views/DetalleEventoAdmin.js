import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React from 'react';

export default function DetalleEventoAdmin() {
    const navigation = useNavigation();
    const saludo = "Detalle del evento";  // Puedes cambiar este saludo si quieres mostrar algo diferente
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
            <Text style={styles.saludo}>{saludo}</Text>
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
                {fechaInicioEvento > fechaActual ? (
                    <TouchableOpacity 
                        style={styles.buttonPrimary} 
                        onPress={() => navigation.navigate('Edicion', { idEvent: idEvent, token: token, id: idUser, eventoAEditar: evento })}
                    >
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
        backgroundColor: '#fffbf2', // Color suave, tono claro beige
        justifyContent: 'center',
        alignItems: 'center',
    },
    saludo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4d4d4d', // Gris oscuro para el saludo
        marginBottom: 20,
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
        color: '#4d4d4d', // Gris oscuro para mejorar la legibilidad
        marginVertical: 5,
    },
    buttonPrimary: {
        backgroundColor: '#ff7043', // Naranja cálido
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#ffab91', // Naranja suave
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
