import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Boton from '../components/Boton';
import Title from '../components/Title';
import React from 'react';

export default function Home() {
    const navigation = useNavigation();
    const saludo = "Hola! Un gusto tenerte en nuestra aplicación";

    return (
        <View style={styles.container}>
            <Title text={saludo} />
            <Boton text={"Iniciar sesión"} onPress={() => navigation.navigate('Login')} />
            <Boton text={"Registrarse"} onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 35,
        width: '100%',
        borderRadius: 20,
        shadowColor: '#cff0ff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    }
});
