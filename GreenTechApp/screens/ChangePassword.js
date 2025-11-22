import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { BASE_URL } from '../config';

export default function ChangePassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) return Alert.alert("Error", "Enter your email");

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert("Success", "Reset link sent to your email.");
      } else {
        Alert.alert("Error", "Failed to send reset email.");
      }

    } catch (error) {
      Alert.alert("Error", "Server issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Reset Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Sending..." : "Send Reset Link"}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbf7c5', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#05542f', marginBottom: 30 },
  input: { width: '100%', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginVertical: 8 },
  button: { backgroundColor: '#05542f', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 18, marginTop: 20 },
  buttonText: { color: '#dbf7c5', fontWeight: 'bold', fontSize: 16 },
});
