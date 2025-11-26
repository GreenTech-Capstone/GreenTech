import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { BASE_URL } from "../config";

export default function ResetPasswordConfirm({ route, navigation }) {
  const { token } = route.params; // <-- GET TOKEN FROM EMAIL LINK

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newPass || !confirmPass)
      return Alert.alert("Error", "Please fill all fields");

    if (newPass !== confirmPass)
      return Alert.alert("Error", "Passwords do not match");

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/api/password-reset-confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          password: newPass,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Your password has been reset!");
        navigation.navigate("LoginScreen");
      } else {
        Alert.alert("Error", data.error || "Invalid or expired token");
      }
    } catch (error) {
      Alert.alert("Error", "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Password Background.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require("../assets/password.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Create New Password</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
                placeholderTextColor="#2e6e4e"
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPass}
                onChangeText={setConfirmPass}
                placeholderTextColor="#2e6e4e"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Processing..." : "Reset Password"}
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
  background: { flex: 1, width: "100%", height: "100%" },
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  logo: { width: 120, height: 120 },
  title: { fontSize: 30, color: "#05542f", marginTop: 10, fontWeight: "bold" },
  form: { width: "85%", marginTop: 20 },
  input: {
    backgroundColor: "#dbf7c5",
    padding: 12,
    borderRadius: 10,
    color: "#05542f",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#dbf7c5",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#05542f", fontSize: 18, fontWeight: "bold" },
});
