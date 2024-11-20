import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'; // Asegúrate de importar TextInput
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de atrás
import { getCategories, getLocations, putAuth } from '../authService';

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, eventoAEditar, idUser, nombre_user } = route.params;
    
    const [nombre, setNombre] = useState(eventoAEditar.name || "");
    const [descripcion, setDescripcion] = useState(eventoAEditar.description || "");
    const [duracion, setDuracion] = useState(eventoAEditar.duration_in_minutes || "");
    const [precio, setPrecio] = useState(eventoAEditar.price || "");
    const [asistenciaMax, setAsistenciaMax] = useState(eventoAEditar.max_assistance || "");
    const [eventDate, setEventDate] = useState(eventoAEditar.start_date ? new Date(eventoAEditar.start_date).toLocaleDateString('es-ES') : "");

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idSelectedCategory, setIdSelectedCategory] = useState(eventoAEditar.id_event_category || null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(eventoAEditar.id_event_location || null);

    const handleGuardar = () => {
        const eventoEditado = {
            'id': eventoAEditar.id,
            'name': nombre,
            'description': descripcion,
            'id_event_category': idSelectedCategory,
            'id_event_location': idSelectedLocation,
            'start_date': eventDate,
            'duration_in_minutes': duracion,
            'price': precio,
            'enabled_for_enrollment': 1,
            'max_assistance': asistenciaMax,
            'id_creator_user': idUser
        };
        putAuth('event/', token, eventoEditado);
        navigation.navigate('Index', { token, idUser, nombre_user });
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

        if (eventoAEditar?.start_date) {
            const formattedDate = new Date(eventoAEditar.start_date).toLocaleDateString('es-ES');
            setEventDate(formattedDate);
        }
    }, [eventoAEditar, token]);

    return (
        <View style={styles.container}>
            {/* Flecha para regresar atrás */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>

            {/* Título */}
            <Text style={styles.title}>Editar evento</Text>

            {/* Formulario */}
            <TextInput
                style={styles.input}
                placeholder="Nombre del evento"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
            />
            <TextInput
                style={styles.input}
                placeholder="Duración"
                value={duracion}
                keyboardType="numeric"
                onChangeText={setDuracion}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                keyboardType="numeric"
                onChangeText={setPrecio}
            />
            <TextInput
                style={styles.input}
                placeholder="Asistencia Máxima"
                value={asistenciaMax}
                keyboardType="numeric"
                onChangeText={setAsistenciaMax}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha del Evento"
                value={eventDate}
                onChangeText={setEventDate}
            />

            {/* Botón Guardar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
                <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 60,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#0060DD',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 5,
        marginTop: 20,
    },
    saveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
