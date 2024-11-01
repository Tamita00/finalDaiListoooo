import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import Formulario from '../views/Formulario';
import Confirmacion from '../views/Confirmacion';
import DetalleEvento from '../views/DetalleEvento';
import Panel from '../views/Panel';
import DetalleEventoAdmin from '../views/DetalleEventoAdmin';
import { useAuth } from '../views/AuthContext';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {


  const { isAuthenticated } = useAuth();



  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isAuthenticated  ? (
      <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Panel" component={Panel} />
      </>
    ) : (
      <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </>
    )}
    <Stack.Screen name="Formulario" component={Formulario} />
    <Stack.Screen name="Confirmacion" component={Confirmacion} />
    <Stack.Screen name="DetalleEvento" component={DetalleEvento} />
    <Stack.Screen name="DetalleEventoAdmin" component={DetalleEventoAdmin} />
  </Stack.Navigator>
  );
};

export default LoginNavigation;
