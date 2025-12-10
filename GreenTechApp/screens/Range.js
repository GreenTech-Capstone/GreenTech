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
import { supabase } from './supabase';

export default function Dashboard({ navigation }) {
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const iconRefs = useRef({});

  const [parameters, setParameters] = useState([
    { id: 1, name: 'Air Temperature', key: 'temperature', icon: require('../assets/air.png'), value: 'Loading...' },
    { id: 2, name: 'Humidity', key: 'humidity', icon: require('../assets/humidity.png'), value: 'Loading...' },
    { id: 3, name: 'pH Level', key: 'ph', icon: require('../assets/ph.png'), value: 'Loading...' },
    { id: 4, name: 'Nutrient', key: 'ec', icon: require('../assets/nutrients.png'), value: 'Loading...' },
    { id: 5, name: 'Water Level', key: 'water_level', icon: require('../assets/waterlevel.png'), value: 'Loading...' },
  ]);

  // Correct ranges
  const ranges = {
    humidity: { min: 60, max: 70 },
    temperature: { min: 22, max: 28 },
    ph: { min: 5.5, max: 6.5 },           // FIXED
    ec_voltage: { min: 1.2, max: 2.0 },
    distance_cm: { min: 10, max: 15 },
  };

  const convertVoltageToPH = (voltage) => {
    if (voltage == null) return null;
    const slope = 1.48;
    const intercept = 2.12;
    return voltage * slope + intercept;
  };

  // FIXED LOGIC for PH, EC, WATER LEVEL
  const getCardColor = (key, value) => {
    if (value === 'N/A') return '#dbf7c5';
    const numValue = parseFloat(value);

    let idealKey = key;
    if (key === 'ph') idealKey = 'ph'; // PH now matched to PH range
    if (key === 'ec') idealKey = 'ec_voltage';
    if (key === 'water_level') idealKey = 'distance_cm';

    const range = ranges[idealKey];

    if (!range) return '#dbf7c5';

    if (numValue < range.min) return '#f1d623ff'; // Warning low
    if (numValue > range.max) return '#e91212ff'; // Danger high
    return '#dbf7c5'; // Normal
  };

  const fetchSensorData = async () => {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select('created_at, ph_voltage, ec_voltage, temperature, humidity, distance_cm, pump_on')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.log('Error fetching sensor data:', error.message);
      return;
    }

    if (data && data.length > 0) {
      const latest = data[0];

      setParameters((prev) =>
        prev.map((p) => {
          let value = 'N/A';
          switch (p.key) {
            case 'ph':
              value =
                latest.ph_voltage != null
                  ? convertVoltageToPH(latest.ph_voltage).toFixed(2)
                  : 'N/A';
              break;
            case 'ec':
              value =
                latest.ec_voltage != null ? latest.ec_voltage.toFixed(2) : 'N/A';
              break;
            case 'temperature':
              value =
                latest.temperature != null
                  ? latest.temperature.toFixed(1)
                  : 'N/A';
              break;
            case 'humidity':
              value =
                latest.humidity != null ? latest.humidity.toFixed(1) : 'N/A';
              break;
            case 'water_level':
              value =
                latest.distance_cm != null
                  ? latest.distance_cm.toFixed(1)
                  : 'N/A';
              break;
          }
          return { ...p, value: value.toString() };
        })
      );
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 10000);
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

  const mapParamKeyForScreens = (key) => {
    if (key === 'ph') return 'ph_voltage';
    if (key === 'ec') return 'ec_voltage';
    if (key === 'water_level') return 'distance_cm';
    return key;
  };

  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>GreenTech</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {parameters.map((param) => (
          <View
            key={param.id}
            style={[
              styles.card,
              { backgroundColor: getCardColor(param.key, param.value) },
            ]}
          >
            <View style={styles.leftRow}>
              <Image source={param.icon} style={styles.paramIcon} />
              <View>
                <Text style={styles.paramName}>{param.name}</Text>
                <Text style={styles.paramValue}>{param.value}</Text>
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
                const param = parameters.find((p) => p.id === visibleMenu);
                if (param)
                  navigation.navigate('Alerts', {
                    paramKey: mapParamKeyForScreens(param.key),
                    paramName: param.name,
                  });
              }}
            >
              <Text style={styles.menuItem}>View Alerts</Text>
            </Pressable>

            <Pressable
              style={styles.menuBox}
              onPress={() => {
                closeMenu();
                const param = parameters.find((p) => p.id === visibleMenu);
                if (param)
                  navigation.navigate('History', {
                    paramKey: mapParamKeyForScreens(param.key),
                    paramName: param.name,
                  });
              }}
            >
              <Text style={styles.menuItem}>View History</Text>
            </Pressable>

            <Pressable
              style={styles.menuBox}
              onPress={() => {
                closeMenu();
                const param = parameters.find((p) => p.id === visibleMenu);
                if (param)
                  navigation.navigate('Range', {
                    paramKey: mapParamKeyForScreens(param.key),
                    paramName: param.name,
                  });
              }}
            >
              <Text style={styles.menuItem}>View Range</Text>
            </Pressable>
          </View>
        </Pressable>
      )}

      <View style={styles.bottomNav}>
        <View style={styles.navWrapper}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <MaterialIcons name="menu" size={32} color="#05542f" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <MaterialIcons name="home" size={32} color="#05542f" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialIcons name="notifications" size={32} color="#05542f" />
          </TouchableOpacity>
        </View>
      </View>

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
  background: { flex: 1, paddingTop: 60 },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 80, height: 80, marginBottom: 8 },
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
    borderRadius: 15,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  paramIcon: { width: 40, height: 40, marginRight: 12 },
  paramName: { fontSize: 18, color: '#05542f', fontWeight: 'bold' },
  paramValue: { fontSize: 16, color: '#05542f', marginTop: 4 },
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
  menuItem: { fontSize: 16, color: '#05542f', textAlign: 'center' },
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
