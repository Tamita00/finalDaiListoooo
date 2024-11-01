import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React, { useState, useEffect } from 'react';
import BotonSecundario from '../components/BotonSecundario';

export default function DetalleEvento() {
    const route = useRoute();
    const { idEvento, token, idUser } = route.params;
    const navigation = useNavigation();

    const getEvent = async () => {
        const endpoint = 'event/' + idEvento;
        const event = await getAuth(endpoint, token);
        console.log(event);
        return event;
    };

    const enroll = async () => {
        alert('¿?')
    }
    return (
        <View style={[styles.boxShadow, styles.container]}>
            <BotonSecundario style={styles.secundario} text={'Atrás'} onPress={() => navigation.navigate('Index', { token: token, id: idUser})}/>
            <Boton style={styles.principal} text={'Inscribirse'} onPress={enroll}/> 
        </View>
    );
}

const styles = StyleSheet.create({

})