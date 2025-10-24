import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History() {
  const [historyData, setHistoryData] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await fetch('http://127.0.0.1:8000/api/sensordata/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setHistoryData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor History</Text>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.timestamp}</Text>
            <Text>Air Temp: {item.air_temp}</Text>
            <Text>Water Temp: {item.water_temp}</Text>
            <Text>Humidity: {item.humidity}</Text>
            <Text>pH: {item.ph_level}</Text>
            <Text>Nutrients: {item.nutrients}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 10,
  },
});
