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
    padding: 30,
    backgroundColor: '#f8f9fa', // Fondo gris muy claro
  },
  header: {
    fontSize: 28, // Tamaño de fuente más grande
    fontWeight: '800', // Grosor de fuente más audaz
    marginBottom: 15,
    color: '#34495e', // Color oscuro para el encabezado
    textAlign: 'center', // Centrar texto
  },
  event: {
    marginBottom: 25, // Aumenté el margen inferior
    padding: 15, // Añadido padding para separar del fondo
    backgroundColor: '#ffffff', // Fondo blanco para cada evento
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Color de sombra
    shadowOffset: { width: 0, height: 3 }, // Desplazamiento de sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 5, // Difuminado de la sombra
    elevation: 4, // Elevación para Android
  },
});

export default ListadoEventos;
