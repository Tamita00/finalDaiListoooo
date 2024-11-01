import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations } from '../authService';

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
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [locations, setLocations] = useState([]);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token);
                setCategories(data);
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        const fetchLocations = async () => {
            try {
                const data = await getLocations(token);
                setLocations(data);
            } catch (error) {
                console.error('Error al cargar las localidades:', error);
            }
        };

        fetchCategories();
        fetchLocations();
    }, [token]);

    const handleGuardar = () => {
        const eventoACrear = {
            name: nombre,
            description: descripcion,
            id_event_category: idSelectedCategory,
            id_event_location: idSelectedLocation,
            start_date: eventDate,
            duration_in_minutes: duracion,
            price: precio,
            enabled_for_enrollment: 1,
            max_assistance: asistenciaMax,
            id_creator_user: idUser,
        };
        
        navigation.navigate('Confirmacion', {
            eventoACrear,
            token,
            categories,
            locations,
            nombre_user,
            idUser,
        });
        console.log(eventoACrear);
    };

    return (
        <View style={styles.container}>
            <h1>Crear un nuevo evento</h1> 
            
            <TextInput
            style={styles.input}
            onChangeText={setNombre}
            value={nombre}
            placeholder="Nombre"
            />

import { TextInput } from 'react-native';

// Replace your existing inputs with TextInput
<TextInput
    style={styles.input}
    onChangeText={setDescripcion}
    value={descripcion}
    placeholder="Descripción"
/>

<TextInput
    style={styles.input}
    onChangeText={text => setDuracion(text)} // Adjusting to handle number input
    value={duracion}
    placeholder="Duración en minutos"
    keyboardType="numeric" // Set keyboard type for number input
/>

<TextInput
    style={styles.input}
    onChangeText={text => setPrecio(text)} // Adjusting to handle number input
    value={precio}
    placeholder="Precio"
    keyboardType="numeric" // Set keyboard type for number input
/>

<TextInput
    style={styles.input}
    onChangeText={text => setAsistenciaMax(text)} // Adjusting to handle number input
    value={asistenciaMax}
    placeholder="Asistencia máxima"
    keyboardType="numeric" // Set keyboard type for number input
/>

<TextInput
    style={styles.input}
    onChangeText={text => {
        setEventDate(text); // Update the date state
    }}
    value={eventDate}
    placeholder="Fecha del evento"
    // Optionally add a specific format, e.g., "YYYY-MM-DD"
    keyboardType="default" // Change as needed for date entry
/>

            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    value={idSelectedCategory}
                    onChange={(item) => setIdSelectedCategory(item.id)}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={locations}
                    labelField="name"
                    valueField="id"
                    placeholder="Localidad"
                    value={idSelectedLocation}
                    onChange={(item) => setIdSelectedLocation(item.id)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secundario} onPress={() => navigation.navigate('Index', { token, id: idUser })}>
                <Text style={styles.buttonText}>Atrás</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        shadowColor: '#0060DD',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
});
