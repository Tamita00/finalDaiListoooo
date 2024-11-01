import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import Index from '../views/Index';
import Formulario from '../views/Formulario';
import Confirmacion from '../views/Confirmacion';
import DetalleEvento from '../views/DetalleEvento';
import Panel from '../views/Panel';
import DetalleEventoAdmin from '../views/DetalleEventoAdmin';

const Stack = createNativeStackNavigator();

const LoginNavigation = ({ isSignedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isSignedIn ? (
      <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Index" component={Index} />
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
