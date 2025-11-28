import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground,
} from 'react-native';
import { BASE_URL } from '../config';

export default function ResetPasswordConfirm({ route, navigation }) {
  const { token } = route.params;
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!newPass || !confirmPass) return Alert.alert("Error", "Please fill all fields");
    if (newPass !== confirmPass) return Alert.alert("Error", "Passwords do not match");

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/password-reset-confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: newPass }),
      });

      if (response.ok) {
        Alert.alert("Success", "Password has been reset");
        navigation.navigate('LoginScreen');
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error || "Failed to reset password");
      }
    } catch (error) {
      Alert.alert("Error", "Server issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/Password Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Set New Password</Text>
        <TextInput
          placeholder="New Password"
          secureTextEntry
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />
        <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Processing..." : "Reset Password"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  container: { width: '85%', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#05542f', marginBottom: 20 },
  input: { width: '100%', backgroundColor: '#dbf7c5', padding: 12, borderRadius: 10, marginVertical: 10, color: '#05542f' },
  button: { backgroundColor: '#dbf7c5', paddingVertical: 14, borderRadius: 18, width: '60%', alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#05542f', fontWeight: 'bold', fontSize: 16 },
});
