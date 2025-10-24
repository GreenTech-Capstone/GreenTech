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
import { supabase } from './supabase'; // <-- import Supabase

export default function Dashboard({ navigation }) {
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const iconRefs = useRef({});

  // Example sensor parameters
  const [parameters, setParameters] = useState([
    { id: 1, name: 'Air Temp', value: 26, icon: require('../assets/air.png') },
    { id: 2, name: 'Water Temp', value: 22, icon: require('../assets/water.png') },
    { id: 3, name: 'Humidity', value: 60, icon: require('../assets/humidity.png') },
    { id: 4, name: 'pH Level', value: 6.2, icon: require('../assets/ph.png') },
    { id: 5, name: 'Nutrients', value: 'Optimal', icon: require('../assets/nutrients.png') },
  ]);

  // Send sensor data to Supabase
  const sendSensorDataToSupabase = async (sensorData) => {
    const { data, error } = await supabase
      .from('sensor_readings')
      .insert([sensorData]);

    if (error) {
      console.log('Supabase insert error:', error);
    } else {
      console.log('Supabase insert success:', data);
    }
  };

  // Example: send parameters to Supabase on mount
  useEffect(() => {
    parameters.forEach((param) => {
      if (typeof param.value === 'number') {
        sendSensorDataToSupabase({
          user: 'jhush',
          parameter: param.name,
          value: param.value,
        });
      }
    });
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
      {/* Centered GreenTech Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>GreenTech</Text>
      </View>

      {/* Parameters Section */}
      <ScrollView contentContainerStyle={styles.container}>
        {parameters.map((param) => (
          <View key={param.id} style={styles.card}>
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
