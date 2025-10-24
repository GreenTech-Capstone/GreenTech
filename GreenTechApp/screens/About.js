import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>🌱 About GreenTech Hydroponic System</Text>

      <Text style={styles.paragraph}>
        The GreenTech Hydroponic System is the latest technology in smart farming application designed
        to provide an efficient way to monitor and manage hydroponic plant environments. It employs IoT
        sensors that are connected to a database in order to take measurements of various critical factors like:
      </Text>

      <Text style={styles.bullet}>🌡️ Air Temperature</Text>
      <Text style={styles.bullet}>💧 Water Temperature</Text>
      <Text style={styles.bullet}>💨 Humidity</Text>
      <Text style={styles.bullet}>⚗️ pH Level</Text>
      <Text style={styles.bullet}>🌿 Nutrient Status</Text>

      <Text style={styles.paragraph}>
        The parameters are presented live through the Dashboard which enables the users to monitor
        plant condition at any time and from any place.
      </Text>

      <Text style={styles.subtitle}>⚙️ System Functions</Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>Real-time Monitoring</Text> – Displays updated sensor readings of air and water temperature, humidity, pH, and nutrients.
      </Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>Data Logging</Text> – Automatically sends and stores sensor data to Supabase, ensuring that readings are recorded for history tracking.
      </Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>Alerts System</Text> – Users are notified whenever the readings exceed the normal limits.
      </Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>History Viewer</Text> – Shows previous sensor data trends for analysis and tracking of plant growth.
      </Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>Range Information</Text> – Displays the ideal value ranges for each parameter to help maintain healthy growth conditions.
      </Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>Navigation Menu</Text> – Includes quick access to Alerts, History, Range, Profile Info, Change Password, About, and Logout.
      </Text>

      <Text style={styles.list}>
        • <Text style={styles.bold}>User-Friendly Dashboard</Text> – Icons, visuals, and menus are provided for easy interaction.
      </Text>

      <Text style={styles.subtitle}>📱 How to Use the App</Text>

      <Text style={styles.sectionTitle}>Dashboard Overview</Text>
      <Text style={styles.paragraph}>
        When you open the app, you’ll see the Dashboard showing all sensor parameters such as Air Temp, Water Temp, Humidity, pH, and Nutrients.
        Each parameter card displays the current value and an icon for easy identification.
      </Text>

      <Text style={styles.sectionTitle}>Accessing Options</Text>
      <Text style={styles.paragraph}>
        Tap the three-dot icon (⋮) on any parameter card (e.g., Air Temp). A small menu will appear with these options:
      </Text>

      <Text style={styles.bullet}>• View Alerts – Check warning messages or abnormal readings.</Text>
      <Text style={styles.bullet}>• View History – See previous readings of that parameter.</Text>
      <Text style={styles.bullet}>• View Range – Know the ideal range for that parameter.</Text>

      <Text style={styles.sectionTitle}>Using the Side Menu</Text>
      <Text style={styles.paragraph}>
        Tap the menu icon (☰) at the bottom left corner to open the Side Menu. From here, you can go to:
      </Text>
      <Text style={styles.bullet}>• Profile Info</Text>
      <Text style={styles.bullet}>• Change Password</Text>
      <Text style={styles.bullet}>• About</Text>
      <Text style={styles.bullet}>• Logout</Text>

      <Text style={styles.sectionTitle}>Viewing Notifications</Text>
      <Text style={styles.paragraph}>
        Tap the bell icon 🔔 on the bottom navigation bar to view alerts and system messages.
      </Text>

      <Text style={styles.sectionTitle}>Logging Out</Text>
      <Text style={styles.paragraph}>
        Go to the Side Menu, then tap Logout to securely sign out of your account.
      </Text>

      <Text style={styles.subtitle}>🌾 Our Goal</Text>
      <Text style={styles.paragraph}>
        We aim to transform contemporary hydroponics into an intelligent, eco-friendly, and
        user-friendly farming system, allowing the growers to leverage technology for the efficient
        production of healthy plants.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbf7c5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    color: '#05542f',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Times New Roman',
  },
  subtitle: {
    fontSize: 20,
    color: '#05542f',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    fontFamily: 'Times New Roman',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#05542f',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Times New Roman',
  },
  paragraph: {
    fontSize: 16,
    color: '#05542f',
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 22,
    fontFamily: 'Times New Roman',
  },
  bullet: {
    fontSize: 16,
    color: '#05542f',
    marginLeft: 15,
    marginBottom: 4,
    fontFamily: 'Times New Roman',
  },
  list: {
    fontSize: 16,
    color: '#05542f',
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 22,
    fontFamily: 'Times New Roman',
  },
  bold: {
    fontWeight: 'bold',
  },
});
