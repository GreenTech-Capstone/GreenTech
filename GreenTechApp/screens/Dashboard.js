import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Button title="View Alerts" onPress={() => navigation.navigate('Alerts')} />
      <Button title="View History" onPress={() => navigation.navigate('History')} />
      <Button title="View Range Data" onPress={() => navigation.navigate('Range')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
