import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function About({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>🌱 About GreenTech Hydroponic System</Text>

      <Text style={styles.paragraph}>
        The GreenTech Hydroponic System is a smart farming solution designed to help growers efficiently
        monitor, control, and maintain healthy hydroponic plant environments. Through IoT-based sensors
        and real-time monitoring, the system ensures accurate readings of critical factors such as:
      </Text>

      <Text style={styles.bullet}>🌡️ Air Temperature</Text>
      <Text style={styles.bullet}>💧 Water Temperature</Text>
      <Text style={styles.bullet}>💨 Humidity</Text>
      <Text style={styles.bullet}>⚗️ pH Level</Text>
      <Text style={styles.bullet}>🌿 Nutrient Status</Text>

      <Text style={styles.paragraph}>
        These parameters are displayed on the Dashboard, allowing users to track their hydroponic setup
        anytime, anywhere.
      </Text>

      <Text style={styles.subtitle}>🌾 Our Goal</Text>
      <Text style={styles.paragraph}>
        Our mission is to transform modern hydroponics into a smart, sustainable, and eco-friendly system
        that empowers growers to enhance plant production with advanced monitoring technology.
      </Text>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HowToUseApp')}
        >
          <Text style={styles.buttonText}>How to Use the App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HowToGrowKangkong')}
        >
          <Text style={styles.buttonText}>How to Grow a Kangkong</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HowToBuildNFT')}
        >
          <Text style={styles.buttonText}>How to Build a NFT Setup</Text>
        </TouchableOpacity>

        {/* ✅ NEW BUTTON BELOW */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OtherHydroponicPlants')}
        >
          <Text style={styles.buttonText}>Other Hydroponic Plants</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbf7c5' },
  contentContainer: { padding: 20, paddingBottom: 60 },
  logo: { width: 80, height: 80, alignSelf: 'center', marginBottom: 15 },
  title: {
    fontSize: 22,
    color: '#05542f',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Times New Roman',
  },
  subtitle: {
    fontSize: 20,
    color: '#05542f',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    fontFamily: 'Times New Roman',
  },
  paragraph: {
    fontSize: 16,
    color: '#05542f',
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 22,
    fontFamily: 'Times New Roman',
  },
  bullet: {
    fontSize: 16,
    color: '#05542f',
    marginLeft: 15,
    marginBottom: 4,
    fontFamily: 'Times New Roman',
  },
  buttonContainer: { marginTop: 20 },
  button: {
    backgroundColor: '#006837',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#dbf7c5',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
});
