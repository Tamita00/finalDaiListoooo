import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import eventsApi from '../api/eventsApi';

const ListadoParticipantes = ({ route }) => {
  const { eventId } = route.params;
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const eventDetails = await eventsApi.getEventDetails(eventId);
        setParticipants(eventDetails.participants);
      } catch (error) {
        console.error('Error al cargar los participantes:', error);
      }
    };
    fetchParticipants();
  }, [eventId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listado de Participantes</Text>
      <FlatList
        data={participants}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40, // Aumenté el padding para más espacio
    backgroundColor: '#ffffff', // Fondo blanco para un aspecto limpio
  },
  header: {
    fontSize: 32, // Tamaño de fuente más grande
    fontWeight: '900', // Grosor de fuente más audaz
    marginBottom: 20, // Aumenté el margen inferior
    color: '#2980b9', // Color azul para el encabezado
    textAlign: 'center', // Centrar texto
    textTransform: 'uppercase', // Texto en mayúsculas
    borderBottomWidth: 2, // Añadí un borde inferior
    borderBottomColor: '#dcdcdc', // Color del borde
    paddingBottom: 10, // Espacio adicional debajo del encabezado
  },
});

export default ListadoParticipantes;
