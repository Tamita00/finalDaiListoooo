import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de atrás
import { getCategories, getLocations, postAuth } from '../authService';

export default function Formulario() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, idUser, nombre_user } = route.params;

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState("");
    const [precio, setPrecio] = useState("");
    const [asistenciaMax, setAsistenciaMax] = useState("");
    const [eventDate, setEventDate] = useState("");

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);

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

    function handleGuardar() {
        const eventoACrear = {
            'name': nombre,
            'description': descripcion,
            'id_event_category': idSelectedCategory,
            'id_event_location': idSelectedLocation,
            'start_date': eventDate,
            'duration_in_minutes': duracion,
            'price': precio,
            'enabled_for_enrollment': 1,
            'max_assistance': asistenciaMax,
            'id_creator_user': idUser,
        };
        navigation.navigate('Confirmacion', {
            eventoACrear: eventoACrear,
            token: token,
            categories: categories,
            locations: locations,
            nombre_user: nombre_user,
            idUser: idUser,
        });
        console.log(eventoACrear);
    }

    return (
        <View style={styles.container}>
            {/* Flecha para regresar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>

            {/* Título */}
            <Text style={styles.title}>Crear un nuevo evento</Text>

            {/* Campos del formulario */}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
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
                placeholder="Duración en minutos"
                value={duracion}
                onChangeText={setDuracion}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                onChangeText={setPrecio}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Asistencia máxima"
                value={asistenciaMax}
                onChangeText={setAsistenciaMax}
                keyboardType="numeric"
            />

            {/* Dropdown para categorías */}
            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Categoría</Text>
                {/* Aquí se podría poner un Dropdown, pero por simplicidad lo dejo como un TextInput para seleccionar una categoría */}
                <TextInput
                    style={styles.input}
                    placeholder="Seleccionar categoría"
                    value={idSelectedCategory}
                    onChangeText={setIdSelectedCategory}
                />
            </View>

            {/* Dropdown para localidades */}
            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Localidad</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seleccionar localidad"
                    value={idSelectedLocation}
                    onChangeText={setIdSelectedLocation}
                />
            </View>

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
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
        marginBottom: 20,
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
    dropdownContainer: {
        width: '100%',
        marginBottom: 20,
    },
    dropdownLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
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
