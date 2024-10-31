import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/textInput';
import { StyleSheet, Text, View } from 'react-native';
import { registerUser } from '../authService';
import React, {useState} from 'react';
import Boton from '../components/Boton';
import Title from '../components/Title';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigation = useNavigation();
  
    const handleRegister = async () => {
      try {
        const userData = { nombre, apellido, username, contrasena };
        await registerUser(userData);
        navigation.navigate('Login');
      } catch (error) {
        alert('Error al registrar');
      }
    }
    return (
      <View style={styles.container}>
        <Title text={"Registrate"}/>
        <View style={styles.inputContainer}>
          <CustomTextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.inputContainer} />
          <CustomTextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.inputContainer} />
          <CustomTextInput placeholder="Usuario" value={username} onChangeText={setUsername} style={styles.inputContainer} />
          <CustomTextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} secureTextEntry style={styles.inputContainer} />
          <Boton text="Registrarse" onPress={handleRegister} />
        </View>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "#F8F9FD",
    width: '100%',
    backgroundColor: 'white',  
    borderWidth: 0,
    borderRadius: 20,  
    marginTop: 35, 
    padding: 30,
    shadowColor: '#cff0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1, 
    shadowRadius: 10,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'space-between',
    marginBottom: 100,
    marginTop: 20
  }
});