import LoginStack from './navigation/LoginStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './views/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <LoginStack/>
    </NavigationContainer>
    </AuthProvider>
  );
}