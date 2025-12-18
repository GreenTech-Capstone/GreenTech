import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Range({ navigation, route }) {
  const { paramKey, paramName } = route?.params || { paramKey: 'temperature', paramName: 'Air Temperature' };

  const rangesData = {
    temperature: [
      { level: 'Low', value: '15–18 °C', notes: 'Growth slows', color: 'yellow' },
      { level: 'Normal', value: '22–28 °C', notes: 'Best growth', color: 'green' },
      { level: 'High', value: '30–35 °C', notes: 'Stress, slower growth', color: 'red' },
      { level: 'Max', value: '38 °C', notes: 'Leaves may burn', color: 'orange' },
    ],
    humidity: [
      { level: 'Low', value: '40–50 %', notes: 'May cause leaf wilting', color: 'yellow' },
      { level: 'Normal', value: '60–80 %', notes: 'Ideal for leaf expansion', color: 'green' },
      { level: 'High', value: '80–85 %', notes: 'Risk of fungal issues', color: 'red' },
      { level: 'Max', value: '90 %', notes: 'Poor transpiration, disease risk', color: 'orange' },
    ],
    ph_voltage: [
      { level: 'Low', value: '5.0', notes: 'Nutrient uptake begins to be limited', color: 'yellow' },
      { level: 'Normal', value: '5.5–6.5', notes: 'Ideal for most nutrients', color: 'green' },
      { level: 'High', value: '7.0', notes: 'Some nutrients like Fe less available', color: 'red' },
      { level: 'Max', value: '7.5', notes: 'Severe nutrient deficiency', color: 'orange' },
    ],
    ec_voltage: [
      { level: 'Low', value: '4cm', notes: 'May cause nutrient deficiency', color: 'yellow' },
      { level: 'Normal', value: '5-7cm', notes: 'Good growth', color: 'green' },
      { level: 'High', value: '8-10cm', notes: 'Risk of salt stress', color: 'red' },
      { level: 'Max', value: '11cm', notes: 'Growth severely inhibited', color: 'orange' },
    ],
    distance_cm: [
      { level: 'Low', value: '50%', notes: 'Crowding, poor aeration', color: 'yellow' },
      { level: 'Normal', value: '60%', notes: 'Best growth', color: 'green' },
      { level: 'High', value: '70%', notes: 'May reduce yield per area', color: 'red' },
      { level: 'Max', value: '80%', notes: 'Too sparse, inefficient space use', color: 'orange' },
    ],
  };

  const paramRanges = rangesData[paramKey] || [];

  return (
    <ImageBackground
      source={require('../assets/notifbackground.png')}
      style={styles.background}
    >

      {/* BACK BUTTON AT THE TOP */}
      <TouchableOpacity
        style={styles.backButtonTop}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={28} color="#05542f" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>{paramName} Range</Text>
        <Image source={require('../assets/notifleaf.png')} style={styles.leaf} />
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.levelText}>Level</Text>
        <Text style={styles.rangeText}>Range</Text>
        <Text style={styles.notesText}>Notes</Text>
      </View>

      <FlatList
        data={paramRanges}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.levelName}>{item.level}</Text>
            <Text style={styles.rangeValue}>{item.value}</Text>
            <Text style={styles.notes}>{item.notes}</Text>
          </View>
        )}
      />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', padding: 20 },

  /* NEW BACK BUTTON TOP STYLE */
  backButtonTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  logo: { width: 70, height: 80, resizeMode: 'contain' },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#004400' },
  leaf: { width: 90, height: 90, resizeMode: 'contain' },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#477a4b',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10
  },

  levelText: { color: '#fff', width: '20%', fontWeight: 'bold' },
  rangeText: { color: '#fff', width: '40%', fontWeight: 'bold', textAlign: 'center' },
  notesText: { color: '#fff', width: '40%', fontWeight: 'bold', textAlign: 'left' },

  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },

  levelName: { width: '20%', fontSize: 14, fontWeight: 'bold', color: '#05542f' },
  rangeValue: { width: '40%', fontSize: 14, textAlign: 'center', color: '#05542f' },
  notes: { width: '40%', fontSize: 13, color: '#05542f', fontStyle: 'italic', textAlign: 'left' },

  backText: { fontSize: 16, marginLeft: 6, color: '#05542f', fontWeight: 'bold' },
});