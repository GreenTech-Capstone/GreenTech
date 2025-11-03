import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SideMenu from './SideMenu';
import { supabase } from './supabase'; // Supabase connection

export default function Dashboard({ navigation }) {
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const iconRefs = useRef({});

  // Local parameters to display
  const [parameters, setParameters] = useState([
    { id: 1, name: 'Air Temperature', key: 'temperature', icon: require('../assets/air.png') },
    { id: 2, name: 'Humidity', key: 'humidity', icon: require('../assets/humidity.png') },
    { id: 3, name: 'Ph Level', key: 'ph_voltage', icon: require('../assets/ph.png') },
    { id: 4, name: 'Nutrient', key: 'ec_voltage', icon: require('../assets/nutrients.png') },
    { id: 5, name: 'Distance', key: 'distance_cm', icon: require('../assets/distance.png') },
  ]);

  // Send sensor data to Supabase
  const sendSensorDataToSupabase = async (sensorData) => {
    const { data, error } = await supabase
      .from('sensor_readings')
      .insert([{
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        ph_voltage: sensorData.ph_voltage,
        ec_voltage: sensorData.ec_voltage,
        distance_cm: sensorData.distance_cm,
        pump_on: sensorData.pump_on ?? false,
      }]);

    if (error) {
      console.log('Supabase insert error:', error);
    } else {
      console.log('✅ Supabase insert success:', data);
    }
  };

  // Fetch latest sensor readings from Supabase
  const fetchSensorData = async () => {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select('created_at, temperature, humidity, ph_voltage, ec_voltage, distance_cm, pump_on')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.log('Error fetching sensor data:', error.message);
    } else if (data && data.length > 0) {
      const latest = data[0];

      // Update parameter values for display
      setParameters((prev) =>
        prev.map((p) => ({
          ...p,
          value: latest[p.key] !== null && latest[p.key] !== undefined
            ? latest[p.key].toString()
            : 'N/A',
        }))
      );

      // Send to Supabase (optional: remove if already stored elsewhere)
      sendSensorDataToSupabase(latest);
    }
  };

  useEffect(() => {
    fetchSensorData(); // fetch once on load
    const interval = setInterval(fetchSensorData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const openMenu = (id) => {
    const node = findNodeHandle(iconRefs.current[id]);
    if (node) {
      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        setMenuPosition({ top: pageY, left: pageX });
        setVisibleMenu(id);
      });
    }
  };

  const closeMenu = () => setVisibleMenu(null);

  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>GreenTech</Text>
      </View>

      {/* Parameters */}
      <ScrollView contentContainerStyle={styles.container}>
        {parameters.map((param) => (
          <View key={param.id} style={styles.card}>
            <View style={styles.leftRow}>
              <Image source={param.icon} style={styles.paramIcon} />
              <View>
                <Text style={styles.paramName}>{param.name}</Text>
                <Text style={styles.paramValue}>{param.value || 'Loading...'}</Text>
              </View>
            </View>

            <TouchableOpacity
              ref={(ref) => (iconRefs.current[param.id] = ref)}
              onPress={() => openMenu(param.id)}
            >
              <MaterialIcons name="more-vert" size={28} color="#05542f" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Pop-up Menu */}
      {visibleMenu !== null && (
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <View
            style={[
              styles.menu,
              {
                position: 'absolute',
                top: menuPosition.top + 5,
                left: menuPosition.left - 120,
              },
            ]}
          >
            <Pressable
              style={styles.menuBox}
              onPress={() => {
                closeMenu();
                navigation.navigate('Alerts');
              }}
            >
              <Text style={styles.menuItem}>View Alerts</Text>
            </Pressable>

            <Pressable
              style={styles.menuBox}
              onPress={() => {
                closeMenu();
                navigation.navigate('History');
              }}
            >
              <Text style={styles.menuItem}>View History</Text>
            </Pressable>

            <Pressable
              style={styles.menuBox}
              onPress={() => {
                closeMenu();
                navigation.navigate('Range');
              }}
            >
              <Text style={styles.menuItem}>View Range</Text>
            </Pressable>
          </View>
        </Pressable>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navWrapper}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <MaterialIcons name="menu" size={32} color="#05542f" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <MaterialIcons name="home" size={32} color="#05542f" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name="notifications" size={32} color="#05542f" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Menu */}
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        username="USERNAME"
        navigation={navigation}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    color: '#05542f',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#dbf7c5',
    borderRadius: 15,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paramIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  paramName: {
    fontSize: 18,
    color: '#05542f',
    fontWeight: 'bold',
  },
  paramValue: {
    fontSize: 16,
    color: '#05542f',
    marginTop: 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  menu: {
    backgroundColor: '#dbf7c5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#05542f',
  },
  menuBox: {
    backgroundColor: '#dbf7c5',
    borderWidth: 2,
    borderColor: '#05542f',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    color: '#05542f',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 35,
    paddingHorizontal: 30,
  },
});
