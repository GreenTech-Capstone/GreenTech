import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { supabase } from './supabase.js'; // adjust path

export default function AlertScreen({ route }) {
  const { paramKey, paramName } = route.params || { paramKey: 'humidity', paramName: 'Humidity' };

  const [currentValue, setCurrentValue] = useState(null);
  const [loading, setLoading] = useState(true);

  const ranges = {
    humidity: { min: 60, max: 70 },
    air_temperature: { min: 22, max: 28 },
    water_temperature: { min: 20, max: 24 },
    ph_voltage: { min: 5.5, max: 6.5 },
    ec_voltage: { min: 1.2, max: 2.0 },
    distance_cm: { min: 10, max: 15 },
  };

  const idealRange = ranges[paramKey] || { min: 0, max: 100 };

  const fetchLatestData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select(`${paramKey}`)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) setCurrentValue(data[0][paramKey]);
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
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensor_readings' },
        (payload) => setCurrentValue(payload.new[paramKey])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const notifications = [];
  let tip = '';

  if (currentValue !== null) {
    if (currentValue < idealRange.min) {
      tip = `💡 Tip: ${paramName} is too low. Take corrective action.`;
      notifications.push({ type: 'warning', message: `${paramName} too low! Current: ${currentValue}`, color: 'yellow' });
    } else if (currentValue > idealRange.max) {
      tip = `💡 Tip: ${paramName} is too high. Take corrective action.`;
      notifications.push({ type: 'alert', message: `${paramName} too high! Current: ${currentValue}`, color: 'red' });
    } else {
      tip = `💡 Tip: ${paramName} is ideal. Maintain current conditions.`;
      notifications.push({
        type: 'info',
        message: `${paramName} is optimal: ${currentValue} (Ideal: ${idealRange.min}–${idealRange.max})`,
        color: 'green'
      });
    }
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

      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>{tip}</Text>
      </View>

      <ScrollView style={styles.notificationContainer}>
        {notifications.map((note, index) => (
          <View key={index} style={styles.notification}>
            {note.type !== 'info' && <View style={[styles.dot, { backgroundColor: note.color }]} />}
            <Text style={styles.notificationText}>{note.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dff3d1', padding: 20 },
  
  // Header moved lower with marginTop
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  logo: { width: 40, height: 40, marginRight: 10 }, // same height as text
  title: { fontSize: 30, fontWeight: 'bold', color: '#006837' },

  alertLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#006837',
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 5,
    marginVertical: 10
  },

  indicators: { flexDirection: 'row', marginBottom: 10 },
  indicator: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  circle: { width: 15, height: 15, borderRadius: 7.5, marginRight: 5 },
  indicatorText: { fontSize: 14, fontWeight: 'bold' },

  notificationContainer: { flex: 1, marginTop: 10 },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c6e5b7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8
  },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  notificationText: { fontSize: 14 },

  tipContainer: {
    padding: 12,
    backgroundColor: '#e6f4d9',
    borderRadius: 8,
    marginTop: 40
  },
  tipText: { fontSize: 14, color: '#555' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
