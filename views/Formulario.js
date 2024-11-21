import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, Button, Picker } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para la flecha de atrás
import { getCategories, getLocations } from '../authService';
import DateTimePicker from '@react-native-community/datetimepicker';  // Importa el DateTimePicker

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
                console.log("lcatoins: "+ data);
                setCategories(data);
            } catch (error) {
                console.error('(UseEffect) Error al cargar las categorías:', error);
            }
        };

        const fetchLocations = async () => {
            try {
                const data = await getLocations(token);
                console.log("lcatoins: "+ data);
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
        setShowDatePicker(false);
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
        console.log(eventoACrear);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear un nuevo evento</Text>

            {/* Nombre */}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />

            {/* Descripción */}
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
            />

            {/* Duración */}
            <TextInput
                style={styles.input}
                placeholder="Duración en minutos"
                value={duracion}
                onChangeText={setDuracion}
                keyboardType="numeric"
            />

            {/* Precio */}
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                onChangeText={setPrecio}
                keyboardType="numeric"
            />

            {/* Asistencia máxima */}
            <TextInput
                style={styles.input}
                placeholder="Asistencia máxima"
                value={asistenciaMax}
                onChangeText={setAsistenciaMax}
                keyboardType="numeric"
            />

            {/* Selector de fecha */}
            <Text>Fecha del evento</Text>
            <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker
                    value={eventDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Categoría */}
            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={idSelectedCategory}
                    onValueChange={setIdSelectedCategory}
                >
                    <Picker.Item label="Categoría" value={null} />
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </View>

            {/* Localidad */}
            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={idSelectedLocation}
                    onValueChange={setIdSelectedLocation}
                >
                    <Picker.Item label="Localidad" value={null} />
                    {locations.map((location) => (
                        <Picker.Item key={location.id} label={location.name} value={location.id} />
                    ))}
                </Picker>
            </View>

            {/* Botón Guardar */}
            <Button title="Guardar" onPress={handleGuardar} color="#28a745" />

            {/* Botón Atrás */}
            <Button
                title="Atrás"
                onPress={() => navigation.navigate('Index', { token: token, id: idUser })}
                color="#28a745"
            />
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
});
