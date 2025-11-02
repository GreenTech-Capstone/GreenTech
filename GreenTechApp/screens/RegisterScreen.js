import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://10.0.1.154:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registered successfully. Redirecting...');
        // ✅ Save username for SideMenu
        await AsyncStorage.setItem('username', username);
        navigation.navigate('Dashboard');
      } else {
        setMessage(data.username || data.email || data.password || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/authscreen.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.welcome}>Create Account</Text>
            </View>

            <View style={styles.form}>
              <Image
                source={require('../assets/leaves.png')}
                style={styles.leaf}
                resizeMode="contain"
              />

              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>REGISTER</Text>
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  avoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 90,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: -20,
  },
  welcome: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: -15,
    color: '#05542f',
  },
  form: {
    width: '75%',
    alignItems: 'center',
    marginTop: -10,
  },
  leaf: {
    width: 100,
    height: 100,
    marginBottom: -49,
    left: -120,
  },
  input: {
    backgroundColor: '#dbf7c5',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#dbf7c5',
    paddingVertical: 10,
    borderRadius: 18,
    width: '60%',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#05542f',
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    color: 'red',
  },
});
