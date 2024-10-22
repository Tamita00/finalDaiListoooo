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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ListadoParticipantes;
