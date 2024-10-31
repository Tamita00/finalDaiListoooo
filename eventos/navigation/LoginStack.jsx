import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import Index from '../views/Index';

const LoginNavigation = () => {
    const LoginStack = createNativeStackNavigator();
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen name="Home" component={Home}/>
        <LoginStack.Screen name="Login" component={Login}/>
        <LoginStack.Screen name="Register" component={Register}/>
        <LoginStack.Screen name="Index" component={Index}/>
      </LoginStack.Navigator>
  );
}
export default LoginNavigation;