import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function GetStarted({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>WELCOME!</Text>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('AuthScreen')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 15,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
