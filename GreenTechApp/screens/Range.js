import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Range() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ideal Sensor Ranges</Text>
      <Text>🌡️ Air Temp: 18 - 30°C</Text>
      <Text>💧 Water Temp: 20 - 25°C</Text>
      <Text>💨 Humidity: 50% - 70%</Text>
      <Text>🧪 pH Level: 5.5 - 6.5</Text>
      <Text>🌱 Nutrients: Optimal range varies by crop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
