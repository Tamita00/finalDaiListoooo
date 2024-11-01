import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const DateInput = ({ fecha, setFecha }) => {
  const handleChange = (newDate) => {
    setFecha(newDate);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={fecha}
        onChangeText={handleChange}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
      width: '118em',
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
      fontSize: 16
  }
});

export default DateInput;
