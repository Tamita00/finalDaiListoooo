import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { updateEventApi } from '../authService';

export default function Edicion() {
    const navigation = useNavigation();
    const route = useRoute();
    const { idEvent, token, idUser, evento } = route.params;
    
    // Estado para los campos editables
    const [name, setName] = useState(evento.name);
    const [description, setDescription] = useState(evento.description);
    const [startDate, setStartDate] = useState(new Date(evento.start_date).toLocaleString());
    const [duration, setDuration] = useState(evento.duration_in_minutes.toString());
    const [price, setPrice] = useState(evento.price.toString());

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
        backgroundColor: '#F9FAFB', // Fondo claro
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center', // Alineación central del título
        color: '#333', // Color oscuro para el texto
    },
    input: {
        width: '100%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff', // Fondo blanco para los inputs
        borderWidth: 1,
        borderColor: '#ccc', // Color de borde gris claro
        fontSize: 16,
        color: '#333', // Color de texto oscuro
    },
    button: {
        backgroundColor: '#4CAF50', // Fondo verde para el botón
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center', // Alineación del contenido en el centro
        justifyContent: 'center', // Centrado del texto en el botón
    },
    cancelButton: {
        backgroundColor: 'transparent', // Fondo transparente para el botón de cancelar
        borderWidth: 1,
        borderColor: '#4CAF50', // Borde verde
        paddingVertical: 10, // Espaciado vertical
        paddingHorizontal: 20, // Espaciado horizontal
        borderRadius: 8, // Bordes redondeados
        alignItems: 'center', // Centrado del contenido
    },
    buttonText: {
        color: 'white', // Texto blanco en los botones
        fontSize: 16,
        fontWeight: '600', // Negrita para el texto
    },
});