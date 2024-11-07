// import { useState } from 'react';
import {  useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { postAuth } from './../authService';
import React from 'react';
import Title from '../components/Title';
import Boton from '../components/Boton';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations, nombre_user, idUser  } = route.params;
    let selectedCategory, selectedLocation;

    selectedCategory = categories.find((category) => category.id === eventoACrear.id_event_category);
    selectedLocation = locations.find((location) => location.id === eventoACrear.id_event_location);
    
    const guardarEvento = async () => {
        if(eventoACrear === null){
            console.error("Error al subir evento: ", error)
        }else{
            postAuth('event/', eventoACrear, token)
            alert('Tu evento ha sido creado con éxito!')
            navigation.navigate("Index", { nombre: nombre_user, token: token })
        }
    };

    const eventoNuevo = {
        'Nombre': eventoACrear.name,
        'Descripción': eventoACrear.description,
        'Categoría': selectedCategory ? selectedCategory.name : null,
        'Localidad': selectedLocation ? selectedLocation.name : null,
        'Fecha inicio': eventoACrear.start_date,
        'Duración en minutos': eventoACrear.duration_in_minutes,
        'Precio': eventoACrear.price,
        'Asistencia máxima': eventoACrear.max_assistance,
    };

    return (
        <View style={[styles.boxShadow, styles.container]}>
            
            <Title text={"¿Querés publicar este evento?"}/>
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        <Text style={styles.text}>{`${key}: ${value}`}</Text>
                    </Text>
                ))}
            </View>
            <Boton style={styles.no} text={'No'} onPress={()=> navigation.navigate("Index", { nombre: nombre_user, token: token })}/>
            <Boton style={styles.si} text={'Si'} onPress={guardarEvento}/> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: 'bold',
        color: 'white'
    },
    datosEvento: {
        backgroundColor: 'rgb(0, 123, 255)',
        borderRadius: '5%',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 25,
        shadowOffset: '1%'
    }, 
    boxShadow: {
        shadowColor: "grey",
        shadowOffset: {
          width: 6,
          height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 16,
      },
    no:{
        borderColor: '#007BFF',
        backgroundColor: 'transparent'
    },
    si:{
        backgroundColor:  '#007BFF'
    }
});

