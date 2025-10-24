import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Alerts() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alerts</Text>
      <Text>No alerts at the moment.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
