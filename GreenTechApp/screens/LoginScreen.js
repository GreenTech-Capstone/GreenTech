import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("access", data.access);
        await AsyncStorage.setItem("refresh", data.refresh);
        await AsyncStorage.setItem("username", username);

        setMessage('Login successful');
        navigation.navigate('Dashboard');
      } else {
        setMessage(data.detail || data.error || 'Login failed');
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <ImageBackground source={require('../assets/authscreen.png')} style={styles.background} resizeMode="cover">
      <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <View style={styles.header}>
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
              <Text style={styles.welcome}>Welcome Back</Text>
            </View>

            <View style={styles.form}>
              <TextInput 
                placeholder="Username" 
                value={username} 
                onChangeText={setUsername} 
                style={styles.input} 
              />
              <TextInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
                style={styles.input} 
              />

              {/* Register link */}
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Don't have an account? Register.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>

              {message !== '' && <Text style={styles.message}>{message}</Text>}
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  avoidingView: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 40 },
  header: { alignItems: 'center', marginTop: 30 },
  logo: { width: 120, height: 120 },
  welcome: { fontSize: 36, fontWeight: 'bold', marginTop: 15, color: '#05542f' },
  form: { width: '85%', alignItems: 'center', marginTop: 70 }, // moved lower
  input: { backgroundColor: '#dbf7c5', width: '90%', padding: 12, borderRadius: 10, marginVertical: 8 },
  registerText: { color: '#dbf7c5', fontWeight: 'bold', marginVertical: 10 },
  button: { backgroundColor: '#dbf7c5', paddingVertical: 14, borderRadius: 18, width: '60%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#05542f', fontSize: 16, fontWeight: 'bold' },
  message: { marginTop: 10, color: 'red', textAlign: 'center' },
});
