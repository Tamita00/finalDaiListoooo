import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const DateInput = ({ fecha, setFecha }) => {
  
  const handleChange = (newDate) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (newDate.match(datePattern) || newDate === '') {
      setFecha(newDate);  // Solo actualizamos si la fecha es válida o si el campo está vacío
    } else {
      alert('Fecha no válida');
    }
  };

  console.log('fecha en el componente dateInput', fecha);
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={fecha}
        value={fecha}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',  // Aquí el 118em no es una medida válida en react native
    backgroundColor: 'white',
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
    shadowColor: '#0060DD',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, 
    shadowRadius: 10,
    elevation: 5,
    borderColor: 'transparent',
    fontSize: 16,
  },
});

export default DateInput;
