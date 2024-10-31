import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/textInput';
import { StyleSheet, View } from 'react-native';
import { loginUser } from '../authService';
import React, {useState} from 'react';
import Title from '../components/Title';
import Boton from '../components/Boton';

export default function Login() {
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    if (!username || !contrasena) {
      alert('Por favor, completa todos los campos');
      return;
    }
    try {
      const credentials = { username, contrasena };
      const user = await loginUser(credentials);
      navigation.navigate('Index', { nombre: user.username});
      console.log("username:", username);
      console.log("contrasena:", contrasena);
    } catch (error) {
      alert('Error al iniciar sesión');
      console.error('Error en el login:', error);
    }
  };
  return (
    <View style={styles.container}>
        <Title text={"Inicio sesión"} />
        <View style={styles.inputContainer}>
            <CustomTextInput placeholder="Usuario" value={username} onChangeText={setUsername} style={styles.inputContainer} />
            <CustomTextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} secureTextEntry style={styles.inputContainer} />
            <Boton text="Iniciar Sesión" onPress={handleLogin} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        background: "#F8F9FD",
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