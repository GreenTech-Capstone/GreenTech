import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
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
import ResetPasswordConfirm from './screens/ResetPasswordConfirm';
import About from './screens/About';
import HowToUseApp from './screens/HowToUseApp';
import HowToGrowKangkong from './screens/HowToGrowKangkong';
import HowToBuildNFT from './screens/HowToBuildNFT';
import OtherHydroponicPlants from './screens/OtherHydroponicPlants';

// Keep splash visible while loading
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

// Deep linking configuration
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
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <NavigationContainer linking={linking} onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>

        {/* Start Screens */}
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />

        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main Dashboard */}
        <Stack.Screen name="Dashboard" component={Dashboard} />

        {/* Parameter Pages */}
        <Stack.Screen name="Alerts" component={Alerts} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Range" component={Range} />

        {/* Other Screens */}
        <Stack.Screen name="Notifications" component={Notifications} />

        {/* Sidebar Menu Screens */}
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ResetPasswordConfirm" component={ResetPasswordConfirm} />
        <Stack.Screen name="About" component={About} />

        {/* HowTo Screens */}
        <Stack.Screen name="HowToUseApp" component={HowToUseApp} />
        <Stack.Screen name="HowToGrowKangkong" component={HowToGrowKangkong} />
        <Stack.Screen name="HowToBuildNFT" component={HowToBuildNFT} />
        <Stack.Screen name="OtherHydroponicPlants" component={OtherHydroponicPlants} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
