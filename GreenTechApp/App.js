import React, { useCallback, useEffect, useState, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Import Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import GetStarted from './screens/GetStarted';
import AuthScreen from './screens/AuthScreen';
import Alerts from './screens/Alerts';
import History from './screens/History';
import Range from './screens/Range';
import NotificationsScreen from './screens/Notifications';
import Profile from './screens/Profile';
import ChangePassword from './screens/ChangePassword';
import ResetPasswordConfirm from './screens/ResetPasswordConfirm';
import About from './screens/About';
import HowToUseApp from './screens/HowToUseApp';
import HowToGrowKangkong from './screens/HowToGrowKangkong';
import HowToBuildNFT from './screens/HowToBuildNFT';
import OtherHydroponicPlants from './screens/OtherHydroponicPlants';

// Import the new notification setup file
import { registerForPushNotificationsAsync } from './notifications';

// Push Notification Settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

// Deep linking
const prefix = Linking.createURL('/');
const linking = {
  prefixes: ['myapp://', prefix],
  config: {
    screens: {
      GetStarted: 'get-started',
      AuthScreen: 'auth',
      Login: 'login',
      Register: 'register',
      Dashboard: 'dashboard',
      Alerts: 'alerts',
      History: 'history',
      Range: 'range',
      Notifications: 'notifications',
      Profile: 'profile',
      ChangePassword: 'reset-request',
      ResetPasswordConfirm: 'reset-password/:token',
      About: 'about',
      HowToUseApp: 'how-to-use-app',
      HowToGrowKangkong: 'how-to-grow-kangkong',
      HowToBuildNFT: 'how-to-build-nft',
    },
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          TimesNewRoman: require('./assets/fonts/times-new-roman.ttf'),
        });

        // Register device for push notifications
        await registerForPushNotificationsAsync();

        // Foreground notifications listener
        notificationListener.current =
          Notifications.addNotificationReceivedListener(notification => {
            console.log("Notification Received:", notification);
          });

        // When user taps a notification
        responseListener.current =
          Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification Clicked:", response);
          });

      } catch (e) {
        console.warn('Error:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationListener(notificationListener.current);

      if (responseListener.current)
        Notifications.removeNotificationListener(responseListener.current);
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <NavigationContainer linking={linking} onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen name="Alerts" component={Alerts} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Range" component={Range} />

        <Stack.Screen name="Notifications" component={NotificationsScreen} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ResetPasswordConfirm" component={ResetPasswordConfirm} />
        <Stack.Screen name="About" component={About} />

        <Stack.Screen name="HowToUseApp" component={HowToUseApp} />
        <Stack.Screen name="HowToGrowKangkong" component={HowToGrowKangkong} />
        <Stack.Screen name="HowToBuildNFT" component={HowToBuildNFT} />
        <Stack.Screen name="OtherHydroponicPlants" component={OtherHydroponicPlants} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
