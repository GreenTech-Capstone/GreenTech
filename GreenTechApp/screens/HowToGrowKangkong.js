import React from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';

export default function HowToGrowKangkong() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>🥬 How to Grow Kangkong (Water Spinach)</Text>

      <Text style={styles.paragraph}>
        Kangkong (Ipomoea aquatica), or water spinach, is a fast-growing leafy vegetable ideal for hydroponics.
        Growing hydroponically eliminates soil-borne diseases and promotes faster nutrient absorption.
      </Text>

      <Text style={styles.subtitle}>🌿 Benefits of Hydroponic Kangkong</Text>
      <Text style={styles.list}>• Faster growth and frequent harvest cycles</Text>
      <Text style={styles.list}>• Higher yields in small spaces</Text>
      <Text style={styles.list}>• Minimal water consumption through recirculation</Text>
      <Text style={styles.list}>• Cleaner, pesticide-free leaves</Text>

      <Text style={styles.subtitle}>📏 Ideal Conditions</Text>
      <Text style={styles.list}>• pH: 5.5 – 6.5</Text>
      <Text style={styles.list}>• EC: 1.5 – 2.5 mS/cm</Text>
      <Text style={styles.list}>• Temperature: 20–30°C</Text>
      <Text style={styles.list}>• Humidity: 60–80%</Text>
      <Text style={styles.list}>• Distance: 10–15 cm / 4–6 inches</Text>

      <Text style={styles.subtitle}>💧 Best Hydroponic Systems</Text>
      <Text style={styles.list}>• Nutrient Film Technique (NFT)</Text>
      <Text style={styles.list}>• Deep Water Culture (DWC)</Text>
      <Text style={styles.list}>• Aeroponics</Text>

      <Text style={styles.subtitle}>🌱 PROCESS ON HOW TO PLANT</Text>

      {/* Step 1 */}
      <Image source={require('../assets/Step1.png')} style={styles.image} />
      <Text style={styles.stepTitle}>Step 1: Soak Seeds</Text>
      <Text style={styles.paragraph}>
        Soak kangkong seeds in water for 12–24 hours before planting. This softens the seed coat and improves germination.
        Use at least 10 seeds for a small hydroponic setup. Plants grown from seeds take slightly longer to establish than cuttings.
      </Text>

      {/* Step 2 */}
      <Image source={require('../assets/Step2.png')} style={styles.image} />
      <Text style={styles.stepTitle}>Step 2: Germinate Seeds in a Tray</Text>
      <Text style={styles.paragraph}>
        Place potting soil or sponge cubes in a seedling tray. Create small holes (~0.5 in / 13 mm deep) and plant 1–2 seeds per hole.
        Keep the medium moist but not waterlogged. Germination occurs within 2–5 days under consistent moisture and proper oxygenation.
      </Text>

      {/* Step 3 */}
      <Image source={require('../assets/Step3.png')} style={styles.image} />
      <Text style={styles.stepTitle}>Step 3: Transplant Seedlings</Text>
      <Text style={styles.paragraph}>
        Transplant seedlings to the NFT system when they are 4–6 inches (10–15 cm) tall and have at least 4 well-developed leaves.
        Harden off seedlings by gradually exposing them to sunlight for 4–5 days before transferring outdoors or to a full NFT setup.
      </Text>

      <Text style={styles.subtitle}>📏 Seed to Harvest</Text>
      <Text style={styles.list}>• Germination: 2–5 days after soaking</Text>
      <Text style={styles.list}>• Transplant: 4–6 inches tall with 4+ leaves</Text>
      <Text style={styles.list}>• Harvest: 30–45 days, using cut-and-come-again method</Text>

      <Text style={styles.subtitle}>🍽️ Culinary & Health Benefits</Text>
      <Text style={styles.list}>• Rich in Vitamin A, C, and Iron</Text>
      <Text style={styles.list}>• High in antioxidants</Text>
      <Text style={styles.list}>• Great for stir-fry, soups, salads, and more</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbf7c5' },
  contentContainer: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#05542f', textAlign: 'center', marginBottom: 15, fontFamily: 'Times New Roman' },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: '#05542f', marginTop: 25, marginBottom: 10, fontFamily: 'Times New Roman' },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: '#05542f', marginTop: 15, marginBottom: 8, fontFamily: 'Times New Roman' },
  paragraph: { fontSize: 16, color: '#05542f', marginBottom: 10, textAlign: 'justify', lineHeight: 22, fontFamily: 'Times New Roman' },
  list: { fontSize: 16, color: '#05542f', marginBottom: 8, textAlign: 'justify', lineHeight: 22, fontFamily: 'Times New Roman' },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 10, borderRadius: 8 },
});
