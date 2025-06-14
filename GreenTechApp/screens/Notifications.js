import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SideMenu from './SideMenu'; // Ensure SideMenu is in same directory

export default function Notifications({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const alerts = [
    {
      id: 1,
      param: 'Air Temp',
      status: 'alert',
      message: 'Air temperature too high!',
      tip: 'Improve airflow or add shading to reduce temperature.',
    },
    {
      id: 2,
      param: 'Water Temp',
      status: 'warning',
      message: 'Water temperature too low! Roots may slow down.',
      tip: 'Use a water heater or move systems to a warmer area.',
    },
    {
      id: 3,
      param: 'Humidity',
      status: 'warning',
      message: 'Humidity dropped below 40%.',
      tip: 'Use a humidifier or place water trays near plants.',
    },
    {
      id: 4,
      param: 'pH Level',
      status: 'danger',
      message: 'pH is out of range!',
      tip: 'Adjust pH using pH up/down solutions.',
    },
    {
      id: 5,
      param: 'Nutrients',
      status: 'alert',
      message: 'Nutrient levels dropping.',
      tip: 'Add nutrient solution based on your plant’s growth stage.',
    },
  ];

  const getStatusElement = (status) => {
    switch (status) {
      case 'warning':
        return <View style={styles.yellowCircle} />;
      case 'alert':
        return <View style={styles.redCircle} />;
      case 'danger':
        return (
          <Image
            source={require('../assets/dangericon.png')}
            style={styles.dangerIcon}
          />
        );
      default:
        return <View style={styles.grayCircle} />;
    }
  };

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
        <Image
          source={require('../assets/notifleaf.png')}
          style={styles.leafIcon}
        />
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
                  <Image
                    source={require('../assets/tip.png')}
                    style={styles.tipIcon}
                  />
                  <Text style={styles.tipText}>Tip: {alert.tip}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar */}
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

      {/* Slide-up Menu Modal */}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#05542f',
  },
  notificationBox: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#c6e4af',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  leafIcon: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: -90,
    right: -15,
  },
  alertList: {
    paddingBottom: 30,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(80, 165, 97, 0.8)',
    padding: 16,
    borderRadius: 30,
    marginBottom: 12,
  },
  statusIconWrapper: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  redCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#cf3107',
    marginTop: 4,
  },
  yellowCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFD700',
    marginTop: 4,
  },
  dangerIcon: {
    width: 18,
    height: 18,
    marginTop: 2,
  },
  grayCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#aaa',
    marginTop: 4,
  },
  alertContent: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 16,
  },
  paramName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#05542f',
  },
  alertText: {
    fontSize: 14,
    color: '#05542f',
    marginTop: 4,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  tipIcon: {
    width: 16,
    height: 16,
    marginTop: 2,
    marginRight: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic',
    flex: 1,
    flexWrap: 'wrap',
  },
  bottomNav: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 380,
    paddingVertical: 50,
    paddingHorizontal: 50,
    elevation: 5,
  },
});
