import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { supabase } from './supabase.js';

export default function AlertScreen({ route }) {
  const { paramKey, paramName } = route.params || { paramKey: 'humidity', paramName: 'Humidity' };

  const [currentValue, setCurrentValue] = useState(null);
  const [loading, setLoading] = useState(true);

  const ranges = {
    humidity: { min: 60, max: 70 },
    temperature: { min: 22, max: 28 },
    water_temperature: { min: 20, max: 24 },
    ph_voltage: { min: 6.0, max: 6.5 },
    ec_voltage: { min: 1.5, max: 2.5 },
    distance_cm: { min: 15, max: 20 },
  };

  const convertVoltageToPH = (voltage) => voltage != null ? voltage * 1.48 + 2.12 : null;

  const fetchLatestData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select(paramKey)
        .order('created_at', { ascending: false })
        .limit(1);
      if (error) throw error;
      if (data && data.length > 0) {
        let value = data[0][paramKey];
        if (paramKey === 'ph_voltage') value = convertVoltageToPH(value);
        setCurrentValue(value);
      }
    } catch (err) {
      console.error('Error fetching data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData();
    const channel = supabase
      .channel(`sensor_changes_${paramKey}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_readings' }, (payload) => {
        let value = payload.new[paramKey];
        if (paramKey === 'ph_voltage') value = convertVoltageToPH(value);
        setCurrentValue(value);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const getTips = (key, value) => {
    const tips = [];
    const addTip = (text) => {
      const splitIndex = text.indexOf(':');
      if (splitIndex !== -1) {
        tips.push(
          <Text key={tips.length} style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>{text.slice(0, splitIndex + 1)}</Text>
            <Text>{text.slice(splitIndex + 1)}</Text>
          </Text>
        );
      } else {
        tips.push(<Text key={tips.length} style={{ marginBottom: 6 }}>{text}</Text>);
      }
    };

    if (key === 'humidity') {
      if (value < 60) {
        [
          '• Use a Humidifier: Place an ultrasonic humidifier in the growing area to increase moisture in the air, ideally near a circulation fan to distribute mist evenly.',
          '• Install a Misting System: Set up a misting system to inject fine water droplets into the air periodically.',
          '• Reduce Ventilation Speed: Lower fan speed temporarily to stabilize humidity levels.',
          '• Add Water Surface Area: Use trays of water or pebble trays to increase evaporation.',
          '• Hang Damp Cloths/Towels: Moisture evaporates into the air as they dry.',
          '• Group Plants Together: Creates a microclimate with higher localized humidity.',
          '• Monitor Conditions: Use a hygrometer to maintain stable RH levels.',
          '• Seal the Growing Area: Check for and seal air leaks to keep moisture contained.'
        ].forEach(addTip);
      } else if (value > 70) {
        [
          '• Increase ventilation: Install or increase the speed of exhaust fans to remove humid air from the grow space and replace it with drier, fresh air.',
          '• Improve air circulation: Use oscillating fans inside the grow area to ensure air is moving around the plants and prevent stagnant pockets of humid air.',
          '• Use a dehumidifier: A specialized dehumidifier will actively remove excess moisture from the air.',
          '• Monitor conditions: Use a hygrometer to ensure RH is within 60-80% for kangkong.',
          '• Optimize plant spacing and pruning: Avoid overcrowding and prune foliage to reduce water vapor release.',
          '• Minimize excess water: Wipe spills and avoid overfilling the reservoir.',
          '• Adjust watering schedule: Check substrate moisture and use timers for precise delivery.',
          '• Control temperature: Maintain 25-30°C to influence relative humidity.'
        ].forEach(addTip);
      }
    }

    if (key === 'temperature' || key === 'water_temperature') {
      if (value < 22) {
        [
          '• Provide Heating: Use space heaters, infrared heaters, or HVAC systems to raise air temperature.',
          '• Warm the Nutrient Solution: Use submersible heaters or root zone heating mats to maintain 18-24°C.',
          '• Improve Insulation: Insulate walls, floors, and ceilings to retain heat.',
          '• Use Reflective Materials/Grow Tents: Keep warmth concentrated where plants grow.',
          '• Monitor Conditions: Use thermometer/hygrometer to check air and solution temps.',
          '• Automate Controls: Smart sensors can adjust heating devices automatically.'
        ].forEach(addTip);
      } else if (value > 28) {
        [
          '• Increase Ventilation and Airflow: Boost fans to remove hot air and ensure consistent movement around plants.',
          '• Shade the System: Use shade cloth or move out of direct sunlight to reduce heat stress.',
          '• Cool the Nutrient Solution: Add ice packs, cool water, or use reflective wraps to reduce solution temperature.',
          '• Install a Water Chiller: Maintains nutrient solution at 18–24°C.',
          '• Use AC or Evaporative Coolers: Regulate indoor/greenhouse temperature.',
          '• Adjust Lighting Schedule: Run lights during cooler hours.',
          '• Ensure Reservoir Health: Aerate nutrient solution and use beneficial bacteria or H2O2 to prevent root rot.'
        ].forEach(addTip);
      }
    }

    const others = [];
    if (key === 'ph_voltage') {
      if (value < 6.0) {
        others.push(
          '• Gradually raise pH: Use a commercial pH Up solution containing potassium hydroxide or carbonate.',
          '• Add gradually: Avoid sudden large adjustments; stir and wait before retesting.',
          '• Alternative temporary methods: Baking soda, crushed eggshells, or limestone can raise pH slowly.',
          '• Monitor daily: Check pH and calibrate meters regularly.',
          '• Use quality water: Distilled or RO water ensures a more stable pH.'
        );
      } else if (value > 6.5) {
        others.push(
          '• Lower pH: Use commercial pH Down solutions like phosphoric acid or citric acid, diluted before adding.',
          '• Add slowly: Small increments and thorough mixing to avoid shocking plants.',
          '• Monitor regularly: Daily checks and adjustments as pH drifts naturally.',
          '• Safety precautions: Wear gloves and goggles when handling concentrated solutions.',
          '• Use suitable water: RO or distilled water helps maintain stable pH.'
        );
      }
    }

    if (key === 'ec_voltage') {
      if (value < 1.5) {
        others.push(
          '• Gradually add nutrients: Increase nutrient concentration slowly while monitoring EC.',
          '• Stir and remeasure: Ensure EC stabilizes before adding more.',
          '• Adjust pH as needed: Maintain 5.5–6.5 for nutrient availability.',
          '• Monitor plant response and keep logs of Nutrient/pH.'
        );
      } else if (value > 2.5) {
        others.push(
          '• Dilute with fresh water: Reduce nutrient concentration to bring EC to 1.5–2.5 mS/cm.',
          '• Mix thoroughly and remeasure: Repeat until EC is within optimal range.',
          '• Adjust pH accordingly after dilution.',
          '• Monitor daily and consider routine flushing or full solution replacement every 1–2 weeks.'
        );
      }
    }

    if (key === 'distance_cm') {
      if (value < 15) others.push('• Thin seedlings: Maintain 15–20 cm spacing to improve airflow and reduce disease risk.');
      else if (value > 20) others.push('• Add more seedlings: Maintain 15–20 cm spacing for uniform growth and resource usage.');
    }

    others.forEach(addTip);

    return tips;
  };

  const notifications = [];
  if (currentValue !== null) {
    const idealRange = ranges[paramKey] || { min: 0, max: 100 };
    if (currentValue < idealRange.min) notifications.push({ type: 'warning', message: `${paramName} too low! Current: ${currentValue.toFixed(2)}`, color: 'yellow' });
    else if (currentValue > idealRange.max) notifications.push({ type: 'alert', message: `${paramName} too high! Current: ${currentValue.toFixed(2)}`, color: 'red' });
    else notifications.push({ type: 'info', message: `${paramName} optimal: ${currentValue.toFixed(2)} (Ideal: ${idealRange.min}–${idealRange.max})`, color: 'green' });
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006837" />
        <Text>Loading {paramName} data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>{paramName.toUpperCase()}</Text>
      </View>

      <Text style={styles.alertLabel}>ALERT</Text>

      <View style={styles.indicators}>
        <View style={styles.indicator}>
          <View style={[styles.circle, { backgroundColor: 'red' }]} />
          <Text style={styles.indicatorText}>ALERT!</Text>
        </View>
        <View style={styles.indicator}>
          <View style={[styles.circle, { backgroundColor: 'yellow' }]} />
          <Text style={styles.indicatorText}>WARNING!</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {notifications.map((note, index) => (
          <View key={index} style={styles.notification}>
            {note.type !== 'info' && <View style={[styles.dot, { backgroundColor: note.color }]} />}
            <Text style={styles.notificationText}>{note.message}</Text>
          </View>
        ))}

        {currentValue !== null && (
          <View style={styles.tipContainer}>
            <Text style={styles.tipLabel}>💡 Tip</Text>
            {getTips(paramKey, currentValue)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dff3d1', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  logo: { width: 40, height: 40, marginRight: 10 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#006837' },
  alertLabel: { fontSize: 20, fontWeight: 'bold', color: 'white', backgroundColor: '#006837', textAlign: 'center', paddingVertical: 6, borderRadius: 5, marginVertical: 10 },
  indicators: { flexDirection: 'row', marginBottom: 10 },
  indicator: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  circle: { width: 15, height: 15, borderRadius: 7.5, marginRight: 5 },
  indicatorText: { fontSize: 14, fontWeight: 'bold' },
  scrollContainer: { flex: 1, marginTop: 10 },
  notification: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#c6e5b7', borderRadius: 8, padding: 10, marginBottom: 8 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  notificationText: { fontSize: 14 },
  tipContainer: { padding: 10, backgroundColor: '#d1f0b4ff', borderRadius: 8, marginTop: 12 },
  tipLabel: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
