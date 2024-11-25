import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, Button, Picker, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getCategories, getLocations } from '../authService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de atrás

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

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || eventDate;
        setShowDatePicker(false);  // Ocultar el picker después de seleccionar
        setEventDate(currentDate);
    };

    const handleGuardar = () => {
        const eventoACrear = {
            'name': nombre,
            'description': descripcion,
            'id_event_category': idSelectedCategory,
            'id_event_location': idSelectedLocation,
            'start_date': eventDate.toISOString(),
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
    };

    return (
        <View style={styles.container}>
            
            {/* Flecha para regresar atrás */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
            </TouchableOpacity>
            
            <Text style={styles.title}>Crear un nuevo evento</Text>
            
            {/* Mostrar la fecha seleccionada */}
            <Text>Fecha seleccionada: {eventDate.toLocaleDateString()}</Text>

            {/* Botón para mostrar el selector de fecha */}
            <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
            
            {/* Mostrar DateTimePicker si el estado showDatePicker es true */}
            {showDatePicker && (
                <DateTimePicker
                    value={eventDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Otros campos de entrada */}
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
            <TextInput style={styles.input} placeholder="Duración en minutos" value={duracion} onChangeText={setDuracion} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Asistencia máxima" value={asistenciaMax} onChangeText={setAsistenciaMax} keyboardType="numeric" />
            
            <View style={styles.dropdownContainer}>
                <Picker selectedValue={idSelectedCategory} onValueChange={setIdSelectedCategory}>
                    <Picker.Item label="Categoría" value={null} />
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </View>

            <View style={styles.dropdownContainer}>
                <Picker selectedValue={idSelectedLocation} onValueChange={setIdSelectedLocation}>
                    <Picker.Item label="Localidad" value={null} />
                    {locations.map((location) => (
                        <Picker.Item key={location.id} label={location.name} value={location.id} />
                    ))}
                </Picker>
            </View>

            <Button title="Guardar" onPress={handleGuardar} color="#28a745" />
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10,
    },
});
