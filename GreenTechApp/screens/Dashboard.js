import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [search, setSearch] = useState('');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const parameters = [
    { id: 1, name: 'Air Temp', value: '26°C', icon: require('../assets/air.png') },
    { id: 2, name: 'Water Temp', value: '22°C', icon: require('../assets/water.png') },
    { id: 3, name: 'Humidity', value: '60%', icon: require('../assets/humidity.png') },
    { id: 4, name: 'pH Level', value: '6.2', icon: require('../assets/ph.png') },
    { id: 5, name: 'Nutrients', value: 'Optimal', icon: require('../assets/nutrients.png') },
  ];

  const iconRefs = useRef({});

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
      <View style={styles.searchRow}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TextInput
          placeholder="Search parameter..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#444"
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {parameters
          .filter((param) =>
            param.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((param) => (
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

      {visibleMenu !== null && (
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <View style={[styles.menu, { position: 'absolute', top: menuPosition.top + 5, left: menuPosition.left - 120 }]}>
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

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => console.log('Menu')}>
          <MaterialIcons name="menu" size={32} color="#05542f" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Home')}>
          <MaterialIcons name="home" size={32} color="#05542f" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications" size={32} color="#05542f" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 50,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#dbf7c5',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#06542f',
    elevation: 10,
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
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
