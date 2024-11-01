import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../components/textInput';
import NumberInput from '../components/numberInput';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations, postAuth } from '../authService';
import DateInput from '../components/dateInput';
import BotonSecundario from '../components/BotonSecundario';

export default function Formulario() {
    const navigation = useNavigation();
    
    const [ nombre, setNombre ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ duracion, setDuracion ] = useState("");
    const [ precio, setPrecio ] = useState("");
    const [ asistenciaMax, setAsistenciaMax ] = useState("");
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const [ eventDate, setEventDate] = useState("");
    
    const [categories, setCategories ] = useState([]);
    const [idSelectedCategory, idSetSelectedCategory] = useState(null);
    const [locations, setLocations]  = useState([]);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);
    
    const route = useRoute();
    const { token, idUser, nombre_user } = route.params;  
    console.log(idUser);

    const renderItem = (item) => (
        <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.start_date}</Text>
        </View>
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
    
        fetchCategories();
        fetchLocations();
    }, [token]); //

    function handleGuardar(){
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
        navigation.navigate('Confirmacion', {eventoACrear: eventoACrear, token: token, categories: categories, locations: locations, nombre_user: nombre_user, idUser: idUser});
        console.log(eventoACrear);
    }

    return (
        <View style={styles.container}>
            <Title text="Crear un nuevo evento" />
            <CustomTextInput placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
            <CustomTextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion}/>
            <NumberInput placeholder="Duración en minutos" value={duracion} onChange={setDuracion}/>
            <NumberInput placeholder="Precio" value={precio} onChange={setPrecio}/>
            <NumberInput placeholder="Asistencia máxima" value={asistenciaMax} onChange={setAsistenciaMax}/>
            <DateInput date={eventDate} setFecha={setEventDate}/>
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
            <Boton text={"Guardar"} onPress={handleGuardar} />
            <BotonSecundario style={styles.secundario} text={'Atrás'} onPress={() => navigation.navigate('Index', { token: token, id: idUser})}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 15,
        shadowColor: '#0060DD',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3, 
        shadowRadius: 10,
        elevation: 5,
        borderColor: 'transparent',
        fontSize: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 20,
    },
    boton: {
        backgroundColor: '#4CAF50', 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 3, 
    },
    botonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#f9f9f9',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
    },
});
