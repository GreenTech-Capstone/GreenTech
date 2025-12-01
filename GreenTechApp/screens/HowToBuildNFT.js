import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function HowToBuildNFT() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>💧 How to Build a Nutrient Film Technique (NFT) System</Text>

      <Text style={styles.paragraph}>
        NFT is a hydroponic method where a thin stream of nutrient-rich water flows continuously over the plant roots,
        providing water, nutrients, and oxygen at the same time. This method uses up to 90% less water than soil gardening.
      </Text>

      <Text style={styles.subtitle}>🔹 Essential Components</Text>
      <Text style={styles.list}>1. Grow Channels – Food-grade PVC or UV-resistant channels, 4–6 cm high, max 10–12 ft long, slope 1:30–1:40</Text>
      <Text style={styles.list}>2. Reservoir & Pump – 10+ gallon opaque container, 250–400 GPH pump</Text>
      <Text style={styles.list}>3. Net Cups & Medium – Rockwool, clay pebbles, or coco coir</Text>
      <Text style={styles.list}>4. Nutrient Solution & Monitoring – pH 5.5–6.5, EC 1–2 mS/cm, thermometer, pH/EC meters</Text>
      <Text style={styles.list}>5. Optional – Timers, air pumps, filters, backup power</Text>

      <Text style={styles.subtitle}>⚙️ Step-by-Step Setup</Text>
      <Text style={styles.list}>• Plan layout, leave 8–12 inches between channels</Text>
      <Text style={styles.list}>• Build frame and slope channels correctly</Text>
      <Text style={styles.list}>• Connect pump and reservoir, test flow and leaks</Text>
      <Text style={styles.list}>• Add net cups with seedlings</Text>
      <Text style={styles.list}>• Run system, monitor pH, EC, and plant health</Text>

      <Text style={styles.subtitle}>🌱 Best Plants</Text>
      <Text style={styles.list}>• Lettuce, spinach, kale, mustard greens, arugula, tatsoi, herbs, microgreens</Text>
      <Text style={styles.list}>• Avoid large fruiting plants or root crops unless supported</Text>

      <Text style={styles.subtitle}>🛠️ Maintenance Tips</Text>
      <Text style={styles.list}>• Check slope, flow, pH, and EC twice weekly</Text>
      <Text style={styles.list}>• Inspect plant health daily</Text>
      <Text style={styles.list}>• Clean channels to prevent root clogs and algae</Text>
      <Text style={styles.list}>• Ensure pump reliability</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbf7c5' },
  contentContainer: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#05542f', textAlign: 'center', marginBottom: 15, fontFamily: 'Times New Roman' },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: '#05542f', marginTop: 25, marginBottom: 10, fontFamily: 'Times New Roman' },
  paragraph: { fontSize: 16, color: '#05542f', marginBottom: 10, textAlign: 'justify', lineHeight: 22, fontFamily: 'Times New Roman' },
  list: { fontSize: 16, color: '#05542f', marginBottom: 8, textAlign: 'justify', lineHeight: 22, fontFamily: 'Times New Roman' },
});
