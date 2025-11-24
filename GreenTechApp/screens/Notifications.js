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
import SideMenu from './SideMenu';
import { supabase } from './supabase';

export default function Notifications({ navigation }) {
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

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      // Fetch the latest sensor reading
      const { data, error } = await supabase
        .from('sensor_readings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) return;

      const latest = data[0];

      // Generate alerts dynamically for all parameters
      const newAlerts = parameters.map((param, idx) => {
        const value = latest[param.key];
        let status = 'info';
        let message = `${param.name} is within ideal range.`;
        let tip = `Maintain current conditions.`;

        if (value < param.min) {
          status = 'warning';
          message = `${param.name} is too low! Current: ${value}`;
          tip = `Increase ${param.name.toLowerCase()} to reach ideal range (${param.min}–${param.max}).`;
        } else if (value > param.max) {
          status = 'alert';
          message = `${param.name} is too high! Current: ${value}`;
          tip = `Reduce ${param.name.toLowerCase()} to reach ideal range (${param.min}–${param.max}).`;
        }

        return { id: idx + 1, param: param.name, status, message, tip };
      });

      setAlerts(newAlerts);
    } catch (err) {
      console.error('Error fetching alerts:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Optional: set up a real-time subscription for new sensor data
    const channel = supabase
      .channel('sensor_updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensor_readings' },
        () => fetchAlerts()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const getStatusElement = (status) => {
    switch (status) {
      case 'warning':
        return <View style={styles.yellowCircle} />;
      case 'alert':
        return <View style={styles.redCircle} />;
      case 'danger':
        return (
          <Image source={require('../assets/dangericon.png')} style={styles.dangerIcon} />
        );
      default:
        return <View style={styles.grayCircle} />;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006837" />
        <Text>Loading alerts...</Text>
      </View>
    );
  }

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

      <View style={styles.notificationBox}>
        <Image source={require('../assets/notifleaf.png')} style={styles.leafIcon} />
        <ScrollView contentContainerStyle={styles.alertList}>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.statusIconWrapper}>
                {getStatusElement(alert.status)}
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.paramName}>{alert.param}</Text>
                <Text style={styles.alertText}>{alert.message}</Text>
                <View style={styles.tipRow}>
                  <Image source={require('../assets/tip.png')} style={styles.tipIcon} />
                  <Text style={styles.tipText}>Tip: {alert.tip}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navWrapper}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <MaterialIcons name="menu" size={32} color="#05542f" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })
            }
          >
            <MaterialIcons name="home" size={32} color="#05542f" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name="notifications" size={32} color="#05542f" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Menu */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} username="USERNAME" navigation={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, paddingTop: 60 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 30, marginTop: 30 },
  logo: { width: 80, height: 80, marginRight: 10 },
  headerText: { fontSize: 40, fontWeight: 'bold', color: '#05542f' },
  notificationBox: { flex: 1, marginHorizontal: 20, backgroundColor: '#c6e4af', borderRadius: 20, paddingTop: 20, paddingBottom: 1, paddingHorizontal: 20, position: 'relative' },
  leafIcon: { width: 120, height: 120, position: 'absolute', top: -90, right: -15 },
  alertList: { paddingBottom: 30 },
  alertCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'rgba(80, 165, 97, 0.8)', padding: 16, borderRadius: 30, marginBottom: 12 },
  statusIconWrapper: { width: 20, alignItems: 'center', justifyContent: 'flex-start' },
  redCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#cf3107', marginTop: 4 },
  yellowCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFD700', marginTop: 4 },
  dangerIcon: { width: 18, height: 18, marginTop: 2 },
  grayCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#aaa', marginTop: 4 },
  alertContent: { flex: 1, paddingLeft: 10, paddingRight: 16 },
  paramName: { fontSize: 16, fontWeight: 'bold', color: '#05542f' },
  alertText: { fontSize: 14, color: '#05542f', marginTop: 4 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 },
  tipIcon: { width: 16, height: 16, marginTop: 2, marginRight: 4 },
  tipText: { fontSize: 13, color: '#444', fontStyle: 'italic', flex: 1, flexWrap: 'wrap' },
  bottomNav: { position: 'absolute', bottom: -10, left: 0, right: 0, alignItems: 'center' },
  navWrapper: { flexDirection: 'row', justifyContent: 'space-between', width: 380, paddingVertical: 50, paddingHorizontal: 50, elevation: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
