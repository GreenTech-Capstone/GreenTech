import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import SideMenu from './SideMenu';
import { supabase } from './supabase';

export default function NotificationsScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const parameters = [
    { name: 'Air Temp', key: 'temperature', min: 22, max: 28 },
    { name: 'Water Temp', key: 'distance_cm', min: 10, max: 15 },
    { name: 'Humidity', key: 'humidity', min: 60, max: 70 },
    { name: 'pH Level', key: 'ph_voltage', min: 5.5, max: 6.5 },
    { name: 'Nutrients', key: 'ec_voltage', min: 1.2, max: 2.0 },
  ];

  const sendPush = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null,
    });
  };

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sensor_readings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data?.length) return;

      const latest = data[0];

      const time = new Date(latest.created_at).toLocaleTimeString();
      const date = new Date(latest.created_at).toLocaleDateString();

      const newAlerts = parameters.map((param, idx) => {
        const value = latest[param.key];
        let status = "info";
        let message = `${param.name} is normal`;
        let tip = `All good`;

        if (value < param.min) {
          status = "warning";
          message = `${param.name} too low!`;
          tip = `Increase ${param.name}`;
          sendPush(`${param.name} Warning`, `${param.name} is too low! Affected value: ${value}`);
        } else if (value > param.max) {
          status = "alert";
          message = `${param.name} too high!`;
          tip = `Reduce ${param.name}`;
          sendPush(`${param.name} Alert`, `${param.name} is too high! Current: ${value}`);
        }

        return {
          id: idx + 1,
          param: param.name,
          status,
          message,
          tip,
          date,
          time,
        };
      });

      setAlerts(newAlerts);
    } catch (e) {
      console.log("Alert Error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    const channel = supabase
      .channel('sensor_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensor_readings' }, () => {
        fetchAlerts();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/notifbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.headerRow}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#006837" />
        </View>
      ) : (
        <View style={styles.notificationBox}>
          <ScrollView contentContainerStyle={styles.alertList}>
            {alerts.map((alert) => (
              <View key={alert.id} style={styles.alertCard}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>{alert.param}</Text>
                <Text style={{ color: "#fff" }}>{alert.message}</Text>
                <Text style={{ color: "#eee", fontStyle: "italic" }}>
                  {alert.date} {alert.time}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <MaterialIcons name="menu" size={32} color="#05542f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })}>
          <MaterialIcons name="home" size={32} color="#05542f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications" size={32} color="#05542f" />
        </TouchableOpacity>
      </View>

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, paddingTop: 60 },
  headerRow: { flexDirection: 'row', paddingHorizontal: 20 },
  logo: { width: 80, height: 80, marginRight: 10 },
  headerText: { fontSize: 40, fontWeight: 'bold', color: '#05542f' },
  notificationBox: { flex: 1, margin: 20, backgroundColor: '#c6e4af', padding: 20, borderRadius: 20 },
  alertCard: { padding: 15, backgroundColor: "#4a9f58", borderRadius: 15, marginBottom: 10 },
  bottomNav: { position: "absolute", bottom: 30, flexDirection: "row", justifyContent: "space-around", width: "100%" }
});
