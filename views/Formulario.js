import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations, postAuth } from '../authService';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Importar Ionicons


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
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);
    
    const route = useRoute();
    const { token, idUser, nombre_user } = route.params;  

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
        }
        navigation.navigate('Confirmacion', { eventoACrear, token, categories, locations, nombre_user, idUser });
        console.log(eventoACrear);
    }

    const renderItem = (item) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.navigate('Index', { token, id: idUser })}
        >
        <Ionicons name="arrow-back" size={24} color="#fff" />  {/* Icono de flecha hacia atrás */}
    </TouchableOpacity>
            
            {/* Reemplazando Title por Text */}
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
                keyboardType="numeric"
                value={duracion}
                onChangeText={setDuracion}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                keyboardType="numeric"
                value={precio}
                onChangeText={setPrecio}
            />
            <TextInput
                style={styles.input}
                placeholder="Asistencia máxima"
                keyboardType="numeric"
                value={asistenciaMax}
                onChangeText={setAsistenciaMax}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de evento"
                value={eventDate}
                onChangeText={setEventDate}
            />

            {/* Dropdown para categorías */}
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    value={idSelectedCategory}
                    onChange={(item) => setIdSelectedCategory(item.id)}
                    renderItem={renderItem}
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
                    renderItem={renderItem}
                />
            </View>

            {/* Botones */}
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

            
        </View>
    );
}
const styles = StyleSheet.create({
    buttonBack: {
        position: 'absolute', // Posicionamos el botón en la esquina superior izquierda
        top: 20, // Espacio desde la parte superior
        left: 10, // Espacio desde la parte izquierda
        padding: 8, // Relleno pequeño
        backgroundColor: '#F9FAFB', // Color del fondo del botón
        borderRadius: 50, // Botón redondeado
        shadowColor: ' #D4F4D4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonTextFlecha: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB', // Fondo claro
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20, // Un pequeño ajuste para alinearlo con el diseño general
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d1d1d6', // Color más suave para bordes
        fontSize: 16,
    },
    dropdownContainer: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonPrimary: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#4CAF50', // Color verde para el botón primario
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonSecondary: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#007BFF', // Color azul para el botón secundario
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff', // Texto blanco en los botones
        fontWeight: '600',
    },
    item: {
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee', // Color sutil para el borde de los ítems
    },
    itemText: {
        fontSize: 16,
        color: '#333', // Texto oscuro para los ítems
    },
});
