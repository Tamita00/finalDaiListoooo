import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../components/textInput';
import NumberInput from '../components/numberInput';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations, postAuth } from '../authService';
import DateInput from '../components/dateInput';

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
    const [idSelectedCategory, idSetSelectedCategory] = useState(null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);

    const renderItem = (item) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.start_date}</Text>
        </View>
    );

    const handleGuardar = () => (
        alert('Datos guardados!')
    );

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

        console.log('eventoAEditar', eventoAEditar);
        fetchCategories();
        fetchLocations();
    }, [token]);

    return (
        <View style={styles.container}>
            <Text style={styles.saludo}>Editar evento</Text>
            <CustomTextInput placeholder="Nombre" value={eventoAEditar.name} onChangeText={setNombre} />
            <CustomTextInput placeholder="Descripción" value={eventoAEditar.description} onChangeText={setDescripcion} />
            <NumberInput placeholder="Duración en minutos" value={eventoAEditar.duration_in_minutes} onChange={setDuracion} />
            <NumberInput placeholder="Precio" value={eventoAEditar.price} onChange={setPrecio} />
            <NumberInput placeholder="Asistencia máxima" value={eventoAEditar.max_assistance} onChange={setAsistenciaMax} />
            <DateInput date={eventDate} setFecha={setEventDate} />
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    value={idSelectedCategory}
                    onChange={(item) => {
                        idSetSelectedCategory(item.id);
                    }}
                    renderItem={(item) => renderItem(item)}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={locations}
                    labelField="name"
                    valueField="id"
                    placeholder="Localidad"
                    value={idSelectedLocation}
                    onChange={(item) => {
                        setIdSelectedLocation(item.id);
                    }}
                    renderItem={(item) => renderItem(item)}
                />
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
    dropdownContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3, 
        shadowRadius: 10,
        elevation: 5,
        borderColor: 'transparent',
        fontSize: 16,
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
