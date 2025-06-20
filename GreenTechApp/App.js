import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import GetStarted from './screens/GetStarted';
import AuthScreen from './screens/AuthScreen';
import Alerts from './screens/Alerts';
import History from './screens/History';
import Range from './screens/Range';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile'; // ✅ Add this
import ChangePassword from './screens/ChangePassword'; // ✅ Add this
import About from './screens/About'; // ✅ Add this

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load custom font
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
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: '#05542f',
          }}
        />
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
