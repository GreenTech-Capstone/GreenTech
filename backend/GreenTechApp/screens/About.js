import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GreenTech App</Text>
      <Text style={styles.content}>Version 1.0</Text>
      <Text style={styles.content}>Developed for Smart Agriculture Monitoring.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbf7c5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#05542f',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#05542f',
    textAlign: 'center',
    marginVertical: 5,
  },
});
