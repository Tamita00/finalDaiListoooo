import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, Picker, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getCategories, getLocations } from '../authService';

export default function Formulario() {
    const navigation = useNavigation();

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState("");
    const [precio, setPrecio] = useState("");
    const [asistenciaMax, setAsistenciaMax] = useState("");
    const [eventDate, setEventDate] = useState("");

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idSelectedCategory, idSetSelectedCategory] = useState(null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);

    const route = useRoute();
    const { token, idUser, nombre_user } = route.params;
    console.log(idUser);

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
            "enabled_for_enrollment": 1,
            'max_assistance': asistenciaMax,
            "id_creator_user": idUser
        };
        navigation.navigate('Confirmacion', { eventoACrear: eventoACrear, token: token, categories: categories, locations: locations, nombre_user: nombre_user, idUser: idUser });
        console.log(eventoACrear);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear un nuevo evento</Text>
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
            <TextInput 
                style={styles.input} 
                placeholder="Fecha del evento (YYYY-MM-DD)" 
                value={eventDate} 
                onChangeText={setEventDate} 
            />
            
            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={idSelectedCategory}
                    onValueChange={(itemValue) => idSetSelectedCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una categoría" value={null} />
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </View>
            
            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={idSelectedLocation}
                    onValueChange={(itemValue) => setIdSelectedLocation(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una localidad" value={null} />
                    {locations.map((location) => (
                        <Picker.Item key={location.id} label={location.name} value={location.id} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Index', { token: token, id: idUser })}>
                <Text style={styles.buttonText}>Atrás</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff6f1', // Color suave melón
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Gris oscuro
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 15,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
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
    },
});
