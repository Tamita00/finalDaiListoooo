import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginStack from './navigation/LoginStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <LoginStack/>
    </NavigationContainer>
  );
}

//https://uiverse.io/Smit-Prajapati/swift-liger-76
//https://reactnavigation.org/docs/navigating 