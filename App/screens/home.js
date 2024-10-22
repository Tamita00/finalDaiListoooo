import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import eventsApi from '../api/eventsApi';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const decodeTokenManual = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    
    if (!payload) {
      throw new Error('Invalid token');
    }

    const base64Url = payload.replace(/_/g, '/').replace(/-/g, '+');
    const base64 = atob(base64Url);
    const user = JSON.parse(base64);
    return user;
  } catch (error) {
    console.error('Manual token decoding error:', error);
    return null;
  }
};

const Home = ({ route }) => {
  const { token } = route.params;
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Usa useNavigation para la navegación

  useEffect(() => {
    if (token) {
      const decodedUser = decodeTokenManual(token);
      setUser(decodedUser);
    }
    
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.get_Events();
        setEvents(response.data);
        console.log("Token: " + token);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user.username}!</Text>
    
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text style={styles.eventDate}>{item.description}</Text>
          </View>
        )}
      />

      {/* Contenedor para el botón */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CargarEvento', { token })} // Navega a CargarEvento
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Cambié a inicio para un diseño más apilado
    alignItems: 'stretch', // Alineación más amplia
    backgroundColor: '#ecf0f1', // Fondo gris claro
    padding: 30, // Más espacio
  },
  title: {
    fontSize: 32, // Tamaño de fuente más grande
    fontWeight: '900', // Fuente más gruesa
    marginBottom: 30, // Mayor margen inferior
    color: '#2980b9', // Color azul
    textAlign: 'center', // Centrar el texto
  },
  eventItem: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1, // Añadí un borde
    borderColor: '#bdc3c7', // Color del borde
    elevation: 4, // Añadí elevación para un efecto de sombra
  },
  eventTitle: {
    fontSize: 20, // Aumenté el tamaño de la fuente
    fontWeight: 'bold',
    color: '#2c3e50', // Color oscuro
  },
  eventDate: {
    fontSize: 16, // Tamaño de fuente más grande
    color: '#7f8c8d', // Color más suave para la fecha
  },
  buttonContainer: {
    marginTop: 30, // Mayor espacio superior
    marginBottom: 30, // Mayor espacio inferior
    alignSelf: 'center',
  },
  addButton: {
    width: 70, // Aumenté el tamaño del botón
    height: 70,
    borderRadius: 35,
    backgroundColor: '#27ae60', // Color verde
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6, // Elevación más prominente
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 34, // Aumenté el tamaño de la fuente del texto
    fontWeight: 'bold',
  },
});

export default Home;