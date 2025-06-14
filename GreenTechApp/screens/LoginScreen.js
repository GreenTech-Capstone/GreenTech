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
import Checkbox from 'expo-checkbox';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.3.84:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        navigation.navigate('Dashboard');
      } else {
        setMessage(data.error || 'Login failed');
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
            {/* Top Logo and Welcome */}
            <View style={styles.header}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.welcome}>Welcome Back</Text>
            </View>

            {/* Form */}
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

              <View style={styles.optionsRow}>
                <View style={styles.rememberContainer}>
                  <Checkbox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    color={rememberMe ? '#05542f' : undefined}
                  />
                  <Text style={styles.rememberText}> Remember Me</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>

              {message !== '' && <Text style={styles.message}>{message}</Text>}
            </View>

            {/* Decorative Leaf */}
            <Image
              source={require('../assets/leaves.png')}
              style={styles.leaf}
              resizeMode="contain"
            />
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
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcome: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#05542f',
  },
  form: {
    width: '85%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#dbf7c5',
    width: '90%',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    color: '#dbf7c5',
  },
  forgot: {
    color: '#dbf7c5',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#dbf7c5',
    paddingVertical: 14,
    borderRadius: 18,
    width: '60%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#05542f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaf: {
    width: 100,
    height: 100,
    marginBottom: -140,
    bottom: 390,
    left: -130,
  },
  message: {
    marginTop: 10,
    color: 'red',
  },
});
