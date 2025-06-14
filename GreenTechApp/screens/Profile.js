import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastName: '',
    age: '',
    address: '',
    contact: '',
    gender: '',
    birthday: '',
  });

  const [isEditing, setIsEditing] = useState(false); // Default to view mode

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const keys = ['name', 'lastName', 'age', 'address', 'contact', 'gender', 'birthday'];
        const data = {};
        for (let key of keys) {
          data[key] = (await AsyncStorage.getItem(key)) || '';
        }
        setUserInfo(data);
      } catch (e) {
        console.log('Failed to load user info:', e);
      }
    };

    loadUserInfo();
  }, []);

  const handleSave = async () => {
    try {
      for (const [key, value] of Object.entries(userInfo)) {
        await AsyncStorage.setItem(key, value);
      }
      Alert.alert('Success', 'Profile information saved.');
      setIsEditing(false);
    } catch (e) {
      console.log('Failed to save user info:', e);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ImageBackground
      source={require('../assets/notifbackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.header}>
            <Image
              source={require('../assets/user.png')}
              style={styles.userIcon}
            />
            <Text style={styles.title}>Profile Information</Text>
          </View>

          {isEditing ? (
            <>
              {[
                { label: 'Name', key: 'name' },
                { label: 'Last Name', key: 'lastName' },
                { label: 'Age', key: 'age', keyboard: 'numeric' },
                { label: 'Address', key: 'address' },
                { label: 'Contact Number', key: 'contact', keyboard: 'phone-pad' },
                { label: 'Gender', key: 'gender' },
                { label: 'Birthday', key: 'birthday', placeholder: 'YYYY-MM-DD' },
              ].map(({ label, key, keyboard = 'default', placeholder }) => (
                <View key={key} style={styles.inputBox}>
                  <Text style={styles.label}>{label}</Text>
                  <TextInput
                    style={styles.input}
                    value={userInfo[key]}
                    onChangeText={(value) => handleChange(key, value)}
                    placeholder={placeholder || `Enter ${label}`}
                    placeholderTextColor="#7ca18b"
                    keyboardType={keyboard}
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {Object.entries(userInfo).map(([key, value]) => (
                <View key={key} style={styles.row}>
                  <Text style={styles.cellLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                  <Text style={styles.cellValue}>{value}</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                <Text style={styles.editText}>Edit Information</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#05542f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#05542f',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#05542f',
    borderWidth: 1,
    borderColor: '#05542f',
  },
  saveButton: {
    backgroundColor: '#05542f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveText: {
    color: '#dbf7c5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffffaa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cellLabel: {
    fontWeight: 'bold',
    color: '#05542f',
    width: '40%',
  },
  cellValue: {
    color: '#05542f',
    width: '60%',
  },
  editButton: {
    backgroundColor: '#05542f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  editText: {
    color: '#dbf7c5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
