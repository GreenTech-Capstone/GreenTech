import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GetStarted from '../screens/GetStarted';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Dashboard from '../screens/Dashboard';
import Alerts from '../screens/Alerts';
import History from '../screens/History';
import Range from '../screens/Range';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Alerts" component={Alerts} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Range" component={Range} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
