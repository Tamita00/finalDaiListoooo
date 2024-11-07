import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/textInput';
import { StyleSheet, Text, View } from 'react-native';
import { registerUser } from '../authService';
import BotonSecundario from '../components/BotonSecundario';
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
        const userData = {
          "first_name": nombre,
          "last_name" : apellido,
          "username"  : username,
          "password"  : contrasena 
        };
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
          <p>Ya tienes cuenta?</p>
            <BotonSecundario text ="Inicia sesión" onPress={() => navigation.navigate('Login')}/>
        </View>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    width: '80%0',
    flex: 1,
    backgroundColor: '#F8F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '60%',
    marginBottom: 20
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});