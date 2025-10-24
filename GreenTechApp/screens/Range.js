import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Range({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/notifbackground.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>TEMPERATURE</Text>
          <Image source={require('../assets/notifleaf.png')} style={styles.leaf} />
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.levelText}>Level</Text>
          <Text style={styles.rangeText}>Range{'\n'}Air Temperature</Text>
          <Text style={styles.notesText}>Notes</Text>
        </View>

        {/* Normal */}
        <View style={styles.row}>
          <View style={[styles.dot, { backgroundColor: 'green' }]} />
          <Text style={styles.levelName}>Normal</Text>
          <Text style={styles.rangeValue}>24–28°C</Text>
          <Text style={styles.notes}>  Ideal for leafy greens like pechay.</Text>
        </View>

        {/* High */}
        <View style={styles.row}>
          <View style={[styles.dot, { backgroundColor: 'blue' }]} />
          <Text style={styles.levelName}>High</Text>
          <Text style={styles.rangeValue}>Above 30°C</Text>
          <Text style={styles.notes}>  Can cause wilting or bolting.</Text>
        </View>

        {/* Low */}
        <View style={styles.row}>
          <View style={[styles.dot, { backgroundColor: 'red' }]} />
          <Text style={styles.levelName}>Low</Text>
          <Text style={styles.rangeValue}>Below 20°C</Text>
          <Text style={styles.notes}>  Slows growth, possible stressed growth.</Text>
        </View>

        {/* Max Safe Limit */}
        <View style={styles.row}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.levelName}>Max</Text>
          <Text style={styles.rangeValue}>32–35°C</Text>
          <Text style={styles.notes}>  Beyond this, growth stops or plants die.</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: 'contain',
    marginBottom: -50,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004400',
    marginBottom: -30,
  },
  leaf: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    bottom: -70,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#477a4b',
    padding: 8,
    borderRadius: 5,
  },
  levelText: {
    color: '#fff',
    width: '20%',
    fontWeight: 'bold',
  },
  rangeText: {
    color: '#fff',
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  notesText: {
    color: '#fff',
    width: '30%',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'left',
    marginVertical: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 4,
    marginLeft: 2,
  },
  levelName: {
    width: '30%',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#05542f',
  },
  rangeValue: {
    width: '30%',
    fontSize: 14,
    color: '#05542f',
  },
  notes: {
    width: '40%',
    fontSize: 13,
    color: '#05542f',
    fontStyle: 'italic',
    textAlign: 'left',
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
