import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password Screen (To be implemented)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbf7c5',
  },
  text: {
    fontSize: 18,
    color: '#05542f',
    fontWeight: 'bold',
  },
});
