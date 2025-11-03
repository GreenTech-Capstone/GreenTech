import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from './supabase.js'; // adjust path if needed

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select('id, created_at, temperature, humidity, ph_voltage, ec_voltage, distance_cm, pump_on')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistoryData(data || []);
      console.log('✅ Supabase data fetched:', data);
    } catch (error) {
      console.error('Error fetching sensor data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();

    // Optional: real-time subscription
    const channel = supabase
      .channel('sensor_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensor_readings' },
        (payload) => {
          setHistoryData((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006837" />
        <Text>Loading sensor history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor History</Text>
      {historyData.length === 0 ? (
        <Text style={styles.noData}>No sensor data available.</Text>
      ) : (
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.timestamp}>
                {new Date(item.created_at).toLocaleString()}
              </Text>
              <Text>🌡 Temperature: {item.temperature ?? 'N/A'} °C</Text>
              <Text>💨 Humidity: {item.humidity ?? 'N/A'} %</Text>
              <Text>🔬 pH Voltage: {item.ph_voltage ?? 'N/A'} V</Text>
              <Text>⚡ EC Voltage: {item.ec_voltage ?? 'N/A'} V</Text>
              <Text>📏 Distance: {item.distance_cm ?? 'N/A'} cm</Text>
              <Text>💧 Pump: {item.pump_on ? 'On' : 'Off'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbf7c5', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#006837', textAlign: 'center' },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  timestamp: { fontWeight: 'bold', marginBottom: 5, color: '#444' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noData: { textAlign: 'center', color: '#777', marginTop: 20 },
});
