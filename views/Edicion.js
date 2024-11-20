import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../components/textInput';
import NumberInput from '../components/numberInput';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations, putAuth } from '../authService';
import DateInput from '../components/dateInput';
import BotonSecundario from '../components/BotonSecundario';

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token, eventoAEditar, idUser, nombre_user } = route.params;
    
    const [nombre, setNombre] = useState(eventoAEditar.name || "");
    const [descripcion, setDescripcion] = useState(eventoAEditar.description || "");
    const [duracion, setDuracion] = useState(eventoAEditar.duration_in_minutes || "");
    const [precio, setPrecio] = useState(eventoAEditar.price || "");
    const [asistenciaMax, setAsistenciaMax] = useState(eventoAEditar.max_assistance || "");
    const [eventDate, setEventDate] = useState(eventoAEditar.start_date ? new Date(eventoAEditar.start_date).toLocaleDateString('es-ES') : "");

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [idSelectedCategory, setIdSelectedCategory] = useState(eventoAEditar.id_event_category || null);
    const [idSelectedLocation, setIdSelectedLocation] = useState(eventoAEditar.id_event_location || null);

    const renderItem = (item) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.start_date}</Text>
        </View>
    );

    const handleGuardar = () => {
        // Aquí se preparan solo los campos que cambiaron
        console.log("ID USER: ",  idUser);
        const eventoEditado = {
            'id': eventoAEditar.id,
            'name': nombre,
            'description': descripcion,
            'id_event_category': idSelectedCategory,
            'id_event_location': idSelectedLocation,
            'start_date': eventDate,
            'duration_in_minutes': duracion,
            'price': precio,
            'enabled_for_enrollment': 1,
            'max_assistance': asistenciaMax,
            'id_creator_user': idUser
        };
        putAuth('event/', token, eventoEditado);
        console.log(eventoEditado);
        navigation.navigate('Index', { token, idUser, nombre_user });
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
            <CustomTextInput placeholder={eventoAEditar.description} value={descripcion} onChangeText={setDescripcion} />
            <NumberInput placeholder={eventoAEditar.duration_in_minutes} value={duracion} onChange={setDuracion} />
            <NumberInput placeholder={eventoAEditar.price} value={precio} onChange={setPrecio} />
            <NumberInput placeholder={eventoAEditar.max_assistance} value={asistenciaMax} onChange={setAsistenciaMax} />
            <DateInput placeholder={eventoAEditar.start_date} value={eventDate} setFecha={setEventDate} />

            
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
