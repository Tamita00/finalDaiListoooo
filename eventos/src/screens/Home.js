import React from 'react';
import { View, Text } from 'react-native';

const Home = ({ route }) => {
  const { nombre, apellido } = route.params;

  return (
    <View>
      <Text>Bienvenido {nombre} {apellido}</Text>
    </View>
  );
};

export default Home;
