import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import GetStarted from './screens/GetStarted';
import AuthScreen from './screens/AuthScreen';
import Alerts from './screens/Alerts';
import History from './screens/History';
import Range from './screens/Range';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import ChangePassword from './screens/ChangePassword';
import About from './screens/About';

// Keep splash visible while loading
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          TimesNewRoman: require('./assets/fonts/times-new-roman.ttf'),
        });
      } catch (e) {
        console.warn('Font loading error:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="GetStarted">

        {/* Start Screens */}
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />

        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* Main Dashboard */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />

        {/* Parameter Pages */}
        <Stack.Screen
          name="Alerts"
          component={Alerts}
          options={{
            title: 'Alerts',
            headerStyle: { backgroundColor: '#dbf7c5' },
            headerTintColor: '#05542f',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TimesNewRoman',
            },
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            title: 'History',
            headerStyle: { backgroundColor: '#dbf7c5' },
            headerTintColor: '#05542f',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TimesNewRoman',
            },
          }}
        />
        <Stack.Screen
          name="Range"
          component={Range}
          options={{
            title: 'Range',
            headerStyle: { backgroundColor: '#dbf7c5' },
            headerTintColor: '#05542f',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TimesNewRoman',
            },
          }}
        />

        {/* Other Screens */}
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />

        {/* Sidebar Menu Screens */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile Info',
            headerStyle: { backgroundColor: '#dbf7c5' },
            headerTintColor: '#05542f',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TimesNewRoman',
            },
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: 'Change Password',
            headerStyle: { backgroundColor: '#dbf7c5' },
            headerTintColor: '#05542f',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TimesNewRoman',
            },
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: 'About',
            headerStyle: { backgroundColor: '#dbf7c5' },
            headerTintColor: '#05542f',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TimesNewRoman',
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
