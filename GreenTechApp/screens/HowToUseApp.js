import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function HowToUseApp() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>📱 How to Use the App</Text>

      <Text style={styles.sectionTitle}>Dashboard Overview</Text>
      <Text style={styles.paragraph}>
        The Dashboard displays all sensor parameters such as Air Temp, Water Temp, Humidity, pH, and Nutrients.
        Each card shows the current live reading and an icon for quick identification.
      </Text>

      <Text style={styles.sectionTitle}>Accessing Options</Text>
      <Text style={styles.paragraph}>
        Tap the three-dot icon (⋮) on any parameter (e.g., Air Temp). A menu will appear with:
      </Text>
      <Text style={styles.bullet}>• View Alerts – Shows warnings or abnormal readings.</Text>
      <Text style={styles.bullet}>• View History – Displays previous readings.</Text>
      <Text style={styles.bullet}>• View Range – Shows ideal values.</Text>

      <Text style={styles.sectionTitle}>Using the Side Menu</Text>
      <Text style={styles.paragraph}>
        Tap the menu icon (☰) to access:
      </Text>
      <Text style={styles.bullet}>• Profile Info</Text>
      <Text style={styles.bullet}>• Change Password</Text>
      <Text style={styles.bullet}>• About</Text>
      <Text style={styles.bullet}>• Logout</Text>

      <Text style={styles.sectionTitle}>Viewing Notifications</Text>
      <Text style={styles.paragraph}>
        Tap the 🔔 bell icon to view alerts and system notifications.
      </Text>

      <Text style={styles.sectionTitle}>Logging Out</Text>
      <Text style={styles.paragraph}>
        Open the Side Menu and tap Logout to securely exit your account.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbf7c5' },
  contentContainer: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#05542f', textAlign: 'center', marginBottom: 15, fontFamily: 'Times New Roman' },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: '#05542f', marginTop: 25, marginBottom: 10, fontFamily: 'Times New Roman' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#05542f', marginTop: 10, marginBottom: 5, fontFamily: 'Times New Roman' },
  paragraph: { fontSize: 16, color: '#05542f', marginBottom: 10, textAlign: 'justify', lineHeight: 22, fontFamily: 'Times New Roman' },
  bullet: { fontSize: 16, color: '#05542f', marginLeft: 15, marginBottom: 4, fontFamily: 'Times New Roman' },
});
