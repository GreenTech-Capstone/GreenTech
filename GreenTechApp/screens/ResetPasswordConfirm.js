import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { BASE_URL } from "../config";

export default function ResetPasswordConfirm({ route, navigation }) {
  const { token } = route.params;  // GET TOKEN PASSED FROM EMAIL SCREEN
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async () => {
    if (!password || !confirm)
      return Alert.alert("Error", "Please enter all fields");

    if (password !== confirm)
      return Alert.alert("Error", "Passwords do not match");

    try {
      const response = await fetch(`${BASE_URL}/api/password-reset-confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password changed successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.error || "Reset failed");
      }
    } catch (err) {
      Alert.alert("Error", "Server connection failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: "#dbf7c5",
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#05542f",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText: { color: "white", fontSize: 16, textAlign: "center" },
});
