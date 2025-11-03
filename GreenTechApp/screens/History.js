import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from './supabase.js'; // adjust path

// Pass `route` to get the parameter key from navigation
export default function History({ route }) {
  const { paramKey, paramName } = route.params; // e.g., paramKey='temperature', paramName='Air Temperature'

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSensorData = async () => {
    setLoading(true);
    try {
      // Fetch only the relevant column + timestamp
      const { data, error } = await supabase
        .from('sensor_readings')
        .select(`created_at, ${paramKey}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistoryData(data || []);
      console.log('✅ Supabase data fetched for', paramKey, data);
    } catch (error) {
      console.error('Error fetching sensor data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();

    // Optional: real-time updates for new rows
    const channel = supabase
      .channel(`sensor_changes_${paramKey}`)
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
        <Text>Loading {paramName} history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{paramName} History</Text>
      {historyData.length === 0 ? (
        <Text style={styles.noData}>No {paramName} data available.</Text>
      ) : (
        <FlatList
          data={historyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.timestamp}>
                {new Date(item.created_at).toLocaleString()}
              </Text>
              <Text>
                {paramName}: {item[paramKey] ?? 'N/A'}
              </Text>
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
