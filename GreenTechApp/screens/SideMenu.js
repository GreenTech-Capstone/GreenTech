import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SideMenu({ visible, onClose, navigation }) {
  const [username, setUsername] = useState('USERNAME');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log('Failed to fetch username:', error);
      }
    };

    if (visible) {
      fetchUsername(); // Load username only when the menu is visible
    }
  }, [visible]);

  const handleLogout = async () => {
    try {
      onClose();
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'GetStarted' }],
      });
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.userSection}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.username}>{username}</Text>
          </View>

          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate('Profile');
              }}
            >
              <MaterialIcons name="person" size={24} color="#dbf7c5" />
              <Text style={styles.menuText}>Profile Info</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate('ChangePassword');
              }}
            >
              <MaterialIcons name="lock" size={24} color="#dbf7c5" />
              <Text style={styles.menuText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate('About');
              }}
            >
              <FontAwesome name="info-circle" size={24} color="#dbf7c5" />
              <Text style={styles.menuText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="#dbf7c5" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    width: '70%',
    backgroundColor: '#006837',
    justifyContent: 'flex-start',
  },
  backdrop: {
    flex: 1,
  },
  userSection: {
    backgroundColor: '#dbf7c5',
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: '#05542f',
    fontWeight: 'bold',
  },
  menuSection: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  menuText: {
    color: '#dbf7c5',
    fontSize: 16,
    marginLeft: 16,
  },
});
