import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations } from '../authService';

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, eventoAEditar, idUser } = route.params;

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

        if (eventoAEditar?.start_date) {
            const formattedDate = new Date(eventoAEditar.start_date).toLocaleDateString('es-ES');
            setEventDate(formattedDate);
        }
    }, [eventoAEditar, token]);

    const renderItem = (item) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.start_date}</Text>
        </View>
    );

    const handleGuardar = () => {
        const eventoEditado = {
            'name': nombre,
            'description': descripcion,
            'id_event_category': idSelectedCategory,
            'id_event_location': idSelectedLocation,
            'start_date': eventDate,
            'duration_in_minutes': duracion,
            'price': precio,
            "enabled_for_enrollment": 1,
            'max_assistance': asistenciaMax,
            "id_creator_user": idUser
        };
        navigation.navigate('Confirmacion', { eventoEditado, token, categories, locations, idUser });
    };

    const handleDateChange = (newDate) => {
        const formattedDate = new Date(newDate).toISOString();
        setEventDate(formattedDate);
    };

    return (
        <View style={styles.container}>
            {/* Flecha para regresar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Panel', { token, id: idUser })}>
                <Ionicons name="arrow-back" size={30} color="#757575" />
            </TouchableOpacity>

            <Text style={styles.title}>Editar evento</Text>

            <TextInput
                style={styles.input}
                placeholder={eventoAEditar.name}
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
                placeholder="Asistencia máxima"
                value={asistenciaMax}
                keyboardType="numeric"
                onChangeText={setAsistenciaMax}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha del evento"
                value={eventDate}
                onChangeText={handleDateChange}
            />

            <View style={styles.dropdownContainer}>
                <Dropdown
                    value={eventoAEditar.id_event_category}
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    onChange={(item) => setIdSelectedCategory(item.id)}
                    renderItem={(item) => renderItem(item)}
                />
            </View>

            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={locations}
                    labelField="name"
                    valueField="id"
                    placeholder="Localidad"
                    value={eventoAEditar.id_event_location}
                    onChange={(item) => setIdSelectedLocation(item.id)}
                    renderItem={(item) => renderItem(item)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

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
    input: {
        width: '40%',
        padding: 15,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        width: '40%',
        paddingVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 15,
    },
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    itemDate: {
        fontSize: 12,
        color: '#888',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSecondary: {
        width: '40%',
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonSecondaryText: {
        color: '#333',
        fontSize: 16,
    },
});
