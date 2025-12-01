import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export default function ChangePassword({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("access");

      const response = await fetch(`${BASE_URL}/api/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password changed successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.error || "Password change failed");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Password Background.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.avoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require('../assets/password.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Change Password</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor="#2e6e4e"
              />

              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#2e6e4e"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleChangePassword}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Saving..." : "Change Password"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  avoidingView: { flex: 1 },
  container: { flex: 1, alignItems: 'center', paddingVertical: 40 },
  header: { alignItems: 'center', marginTop: 15 },
  logo: { width: 120, height: 120 },
  title: { fontSize: 35, fontWeight: 'bold', marginTop: 10, color: '#05542f' },
  form: { width: '85%', alignItems: 'center', marginTop: 20 },
  input: { backgroundColor: '#dbf7c5', width: '90%', padding: 12, borderRadius: 10, marginVertical: 10, color: '#05542f' },
  button: { backgroundColor: '#dbf7c5', paddingVertical: 14, borderRadius: 18, width: '60%', alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#05542f', fontSize: 16, fontWeight: 'bold' },
});
