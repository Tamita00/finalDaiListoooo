import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const DateInput = ({ fecha, setFecha, placeholder }) => {
  const [error, setError] = useState('');

  // Función para formatear la fecha en formato dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Añade un 0 si es menor a 10
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función que maneja el cambio de texto en el input
  const handleChange = (newDate) => {
    setFecha(newDate);

    // Validación del formato dd/mm/yyyy
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (newDate && !newDate.match(datePattern)) {
      setError('Fecha no válida. Usa el formato dd/mm/yyyy');
    } else {
      setError('');
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={fecha}
        placeholder={placeholder ? formatDate(placeholder) : ''}
        onChangeText={handleChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default DateInput;