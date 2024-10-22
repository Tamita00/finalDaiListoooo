import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import eventsApi from '../api/eventsApi';  // Importa la API de eventos

const ListadoEventos = ({ navigation }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await eventsApi.get_Events();  // Llama a la API para obtener eventos
        const upcoming = events.filter(event => new Date(event.date) > new Date());
        const past = events.filter(event => new Date(event.date) <= new Date());
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    };
    fetchEvents();
  }, []);

  const renderEvent = (event, isUpcoming) => (
    <View key={event.id} style={styles.event}>
      <Text>{event.name}</Text>
      <Text>Fecha: {event.date}</Text>
      <Button
        title="Ver Detalle"
        onPress={() => navigation.navigate('DetalleEvento', { eventId: event.id })}
      />
      {isUpcoming && (
        <Button
          title="Editar Evento"
          onPress={() => navigation.navigate('CargarEvento', { eventId: event.id })}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Próximos Eventos</Text>
      <FlatList
        data={upcomingEvents}
        renderItem={({ item }) => renderEvent(item, true)}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.header}>Eventos Pasados</Text>
      <FlatList
        data={pastEvents}
        renderItem={({ item }) => renderEvent(item, false)}
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
  event: {
    marginBottom: 20,
  },
});

export default ListadoEventos;
