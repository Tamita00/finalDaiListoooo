import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations } from '../authService';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Formulario() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, idUser, nombre_user } = route.params;

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState("");
    const [precio, setPrecio] = useState("");
    const [asistenciaMax, setAsistenciaMax] = useState("");
    const [eventDate, setEventDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

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

    const handleGuardar = () => {
        const eventoACrear = {
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
        navigation.navigate('Confirmacion', { eventoACrear, token, categories, locations, nombre_user, idUser });
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false); // Cerrar el picker después de seleccionar la fecha
        if (date) {
            setEventDate(date);
        }
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            {/* Flecha para regresar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Index', { token, id: idUser })}>
                <Ionicons name="arrow-back" size={30} color="#757575" />
            </TouchableOpacity>

            <Text style={styles.title}>Crear un nuevo evento</Text>

            {/* Campos de texto */}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                textAlign="center"
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                textAlign="center"
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Duración en minutos"
                value={duracion}
                onChangeText={setDuracion}
                textAlign="center"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                onChangeText={setPrecio}
                textAlign="center"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Asistencia máxima"
                value={asistenciaMax}
                onChangeText={setAsistenciaMax}
                textAlign="center"
                keyboardType="numeric"
            />

            {/* Selector de fecha con DateTimePicker */}
            <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
                <TextInput
                    style={styles.dateInput}
                    value={formatDate(eventDate)} // Formatear la fecha para mostrarla
                    editable={false}
                    placeholder="Fecha del evento"
                />
            </TouchableOpacity>
            
            {showDatePicker && (
                <DateTimePicker
                    value={eventDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Dropdown para categorías */}
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    value={idSelectedCategory}
                    onChange={(item) => setIdSelectedCategory(item.id)}
                    style={styles.dropdown}
                    selectedTextStyle={{ textAlign: "center" }}
                />
            </View>

            {/* Dropdown para localidades */}
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={locations}
                    labelField="name"
                    valueField="id"
                    placeholder="Localidad"
                    value={idSelectedLocation}
                    onChange={(item) => setIdSelectedLocation(item.id)}
                    style={styles.dropdown}
                    selectedTextStyle={{ textAlign: "center" }}
                />
            </View>

            {/* Botón guardar */}
            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        color: '#212121',
        textAlign: 'center',
        marginVertical: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
    },
    dateInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 15,
        color: '#666',
        textAlign: "center"
    },
    dropdownContainer: {
        width: '100%',
        marginBottom: 15,
        borderRadius: 8,
    },
    dropdown: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
