import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateEventApi } from '../authService';

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { idEvent, token, idUser, eventoAEditar } = route.params;

    // Estado para los campos editables
    const [name, setName] = useState(eventoAEditar.name);
    const [description, setDescription] = useState(eventoAEditar.description);
    const [startDate, setStartDate] = useState(new Date(eventoAEditar.start_date).toLocaleString());
    const [duration, setDuration] = useState(eventoAEditar.duration_in_minutes.toString());
    const [price, setPrice] = useState(eventoAEditar.price.toString());

    // Función para manejar el envío de datos (simulando una actualización)
    
    // Llamada a la API para actualizar el evento
const handleUpdateEvent = async () => {
    try {
      const updatedEvent = {
        name,
        description,
        start_date: new Date(startDate).toISOString(), // Asegúrate de formatear correctamente la fecha
        duration_in_minutes: parseInt(duration, 10),
        price: parseFloat(price),
      };
  
      // Llamada a la función updateEventApi pasando los parámetros necesarios
      const response = await updateEventApi(idEvent, updatedEvent, token);
  
      if (response.success) {
        Alert.alert('Evento actualizado', 'Los cambios se guardaron correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No se pudo actualizar el evento');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar el evento');
    }
  };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Evento</Text>

            {/* Input para el nombre */}
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nombre del evento"
            />
            
            {/* Input para la descripción */}
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Descripción del evento"
            />
            
            {/* Input para la fecha de inicio */}
            <TextInput
                style={styles.input}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="Fecha de inicio"
            />
            
            {/* Input para la duración */}
            <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholder="Duración (minutos)"
            />
            
            {/* Input para el precio */}
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="Precio"
            />

            {/* Botón para guardar los cambios */}
            <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>

            {/* Botón para cancelar */}
            <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007BFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
