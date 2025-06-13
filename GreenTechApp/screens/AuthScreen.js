import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
} from 'react-native';

export default function AuthScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/authscreen.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Top light green section with logo */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Leaf near login button */}
        <Image
          source={require('../assets/leaves.png')}
          style={styles.leaf}
          resizeMode="contain"
        />

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
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
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  logo: {
    width: 140,
    height: 140,
    position: 'absolute',
    top: 80,
  },
  leaf: {
    width: 100,
    height: 100,
    position: 'absolute',
    left: 30,
    bottom: 275, // adjust to stick just above login button
    zIndex: 1,
  },
  button: {
    backgroundColor: '#dbf7c5',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 25,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#05542f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
