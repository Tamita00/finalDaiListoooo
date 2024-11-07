{/*
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

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, eventoAEditar, idUser } = route.params;
 
    const [ nombre, setNombre ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ duracion, setDuracion ] = useState("");
    const [ precio, setPrecio ] = useState("");
    const [ asistenciaMax, setAsistenciaMax ] = useState("");
    const [ eventDate, setEventDate] = useState("");
 
    const [categories, setCategories ] = useState([]);
    const [locations, setLocations]  = useState([]);
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);
 
    const renderItem = (item) => (
        <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.start_date}</Text>
        </View>
    );
    function handleGuardar(){
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
        }
        navigation.navigate('Confirmacion', {eventoEditado: eventoEditado, token: token, categories: categories, locations: locations, nombre_user: nombre_user, idUser: idUser});
        console.log(eventoEditado);
    }
    const handleDateChange = (newDate) => {
        const formattedDate = new Date(newDate).toISOString();
        setEventDate(formattedDate);
    }; 
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
        console.log('eventoAEditar.start_date', eventoAEditar.start_date);
        fetchCategories();
        fetchLocations();
        if (eventoAEditar?.start_date) {
            const formattedDate = new Date(eventoAEditar.start_date).toLocaleDateString(); 
            console.log("formattedDate:",formattedDate);
            setEventDate(formattedDate);
        }
    }, [eventoAEditar], [token]);
    return (
        <View style={styles.container}>
            <Title text='Editar evento'/>
            <CustomTextInput placeholder="Nombre" value={eventoAEditar.name} onChangeText={setNombre}/>
            <CustomTextInput placeholder="Descripción" value={eventoAEditar.description} onChangeText={setDescripcion}/>
            <NumberInput placeholder="Duración en minutos" value={eventoAEditar.duration_in_minutes} onChange={setDuracion}/>
            <NumberInput placeholder="Precio" value={eventoAEditar.price} onChange={setPrecio}/>
            <NumberInput placeholder="Asistencia máxima" value={eventoAEditar.max_assistance} onChange={setAsistenciaMax}/>
            <DateInput value={eventDate} setFecha={handleDateChange}/>
            <View style={styles.dropdownContainer}>
                <Dropdown
                    value = {eventoAEditar.id_event_category}
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    onChange={(item) => {
                        setIdSelectedCategory(item.id);
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
                    value={eventoAEditar.id_event_location}
                    onChange={(item) => {
                        setIdSelectedLocation(item.id);
                    }}
                    renderItem={(item) => renderItem(item)}
                />
            </View>
            <Boton text={"Guardar"} onPress={handleGuardar} />
            <BotonSecundario style={styles.secundario} text={'Atrás'} onPress={() => navigation.navigate('Panel', { token: token, id: idUser})}/>
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
    datosEvento: {
        width: '100%',
        maxWidth: 600,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
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
});
*/}

import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../components/textInput';
import NumberInput from '../components/numberInput';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations } from '../authService';
import DateInput from '../components/dateInput';
import BotonSecundario from '../components/BotonSecundario';

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, eventoAEditar, idUser } = route.params;
    
    const [ nombre, setNombre ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ duracion, setDuracion ] = useState("");
    const [ precio, setPrecio ] = useState("");
    const [ asistenciaMax, setAsistenciaMax ] = useState("");
    const [ eventDate, setEventDate] = useState("");  // Este es el estado de la fecha
    
    const [categories, setCategories ] = useState([]);
    const [locations, setLocations]  = useState([]);
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);

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
            'start_date': eventDate,  // Fecha formateada (ISO 8601)
            'duration_in_minutes': duracion,
            'price': precio,
            "enabled_for_enrollment": 1,
            'max_assistance': asistenciaMax,
            "id_creator_user": idUser
        };
        navigation.navigate('Confirmacion', { eventoEditado, token, categories, locations, idUser });
        console.log(eventoEditado);
    };

    const handleDateChange = (newDate) => {
        const formattedDate = new Date(newDate).toISOString();  // Convertimos la fecha al formato ISO
        setEventDate(formattedDate);  // Actualizamos el estado con la fecha formateada
    };

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

        console.log('eventoAEditar.start_date', eventoAEditar.start_date);
        fetchCategories();
        fetchLocations();

        // Formateamos la fecha al recibirla de eventoAEditar
        if (eventoAEditar?.start_date) {
            const formattedDate = new Date(eventoAEditar.start_date).toLocaleDateString('es-ES');  // Aquí puedes elegir el formato que prefieras
            console.log("formattedDate:", formattedDate);
            setEventDate(formattedDate);  // Establecemos la fecha en el estado
        }
    }, [eventoAEditar, token]);  // Dependemos de eventoAEditar y token para recargar los datos

    return (
        <View style={styles.container}>
            <Title text='Editar evento' />
            <CustomTextInput placeholder={eventoAEditar.name} value={nombre} onChangeText={setNombre} />
            <CustomTextInput placeholder="Descripción" value={eventoAEditar.description} onChangeText={setDescripcion} />
            <NumberInput placeholder="Duración en minutos" value={eventoAEditar.duration_in_minutes} onChange={setDuracion} />
            <NumberInput placeholder="Precio" value={eventoAEditar.price} onChange={setPrecio} />
            <NumberInput placeholder="Asistencia máxima" value={eventoAEditar.max_assistance} onChange={setAsistenciaMax} />
            <DateInput fecha={eventoAEditar.start_date} setFecha={handleDateChange} />
            
            <View style={styles.dropdownContainer}>
                <Dropdown
                    value={eventoAEditar.id_event_category}
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    onChange={(item) => {
                        setIdSelectedCategory(item.id);
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
                    value={eventoAEditar.id_event_location}
                    onChange={(item) => {
                        setIdSelectedLocation(item.id);
                    }}
                    renderItem={(item) => renderItem(item)}
                />
            </View>

            <Boton text={"Guardar"} onPress={handleGuardar} />
            <BotonSecundario style={styles.secundario} text={'Atrás'} onPress={() => navigation.navigate('Panel', { token: token, id: idUser })} />
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
    secundario: {
        marginTop: 20,
    },
});
