import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import eventsApi from '../api/eventsApi';  // Importa la API de eventos

const VisualizacionEventos = ({ route, navigation }) => {
  const { eventId } = route.params;  // ID del evento pasado por navegación
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await eventsApi.getEventDetails(eventId);
        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los detalles del evento:', error);
        Alert.alert('Error', 'No se pudieron cargar los detalles del evento.');
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleSubscribe = async () => {
    try {
      const userId = 'usuario123';  // Reemplaza con el ID real del usuario
      const result = await eventsApi.subscribeToEvent(eventId, userId);
      if (result.success) {
        Alert.alert('Éxito', 'Te has suscrito al evento.');
        setEvent({ ...event, subscribers: event.subscribers + 1 });
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error al suscribirse al evento:', error);
      Alert.alert('Error', 'Hubo un problema al suscribirse.');
    }
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text>Fecha: {event.date}</Text>
      <Text>Ubicación: {event.location}</Text>
      <Text>Plazas disponibles: {event.capacity - event.subscribers}</Text>

      {event.capacity > event.subscribers ? (
        <Button title="Suscribirse" onPress={handleSubscribe} />
      ) : (
        <Text style={styles.soldOut}>Localidades agotadas</Text>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Cambié a inicio para un diseño más apilado
    alignItems: 'center', // Mantengo la alineación centrada
    padding: 30, // Aumenté el padding
    backgroundColor: '#f4f4f4', // Fondo gris claro
  },
  title: {
    fontSize: 28, // Tamaño de fuente más grande
    fontWeight: '900', // Grosor de fuente más audaz
    marginBottom: 25, // Mayor margen inferior
    color: '#2c3e50', // Color oscuro para el título
    textAlign: 'center', // Centrar texto
  },
  soldOut: {
    fontSize: 20, // Aumenté el tamaño de la fuente
    color: '#e74c3c', // Color rojo vibrante
    fontWeight: 'bold', // Hacer el texto más audaz
    textAlign: 'center', // Centrar texto
    marginTop: 15, // Añadir margen superior
  },
});

export default VisualizacionEventos;
