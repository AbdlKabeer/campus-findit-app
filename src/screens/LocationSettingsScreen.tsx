import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import Picker from '../components/Picker';

type LocationSettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LocationSettings'
>;

const LocationSettingsScreen: React.FC = () => {
  const navigation = useNavigation<LocationSettingsScreenNavigationProp>();

  const [settings, setSettings] = useState({
    enableLocationServices: true,
    shareLocationWithRoommates: true,
    showNearbyHostels: true,
    autoDetectLocation: false,
    currentLocation: 'Lagos, Nigeria',
    preferredArea: 'Victoria Island',
    searchRadius: '10',
  });

  const [loading, setLoading] = useState(false);

  const areaOptions = [
    { label: 'Victoria Island', value: 'Victoria Island' },
    { label: 'Ikoyi', value: 'Ikoyi' },
    { label: 'Lekki', value: 'Lekki' },
    { label: 'Surulere', value: 'Surulere' },
    { label: 'Ikeja', value: 'Ikeja' },
    { label: 'Yaba', value: 'Yaba' },
    { label: 'Mainland', value: 'Mainland' },
    { label: 'Ajah', value: 'Ajah' },
  ];

  const radiusOptions = [
    { label: '5 km', value: '5' },
    { label: '10 km', value: '10' },
    { label: '15 km', value: '15' },
    { label: '20 km', value: '20' },
    { label: '25 km', value: '25' },
    { label: '50 km', value: '50' },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success',
        'Location settings updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update location settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDetectLocation = () => {
    Alert.alert(
      'Detect Location',
      'This will use your device GPS to automatically detect your current location. Make sure location services are enabled.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Detect',
          onPress: () => {
            // Simulate location detection
            updateSetting('currentLocation', 'Lekki Phase 1, Lagos, Nigeria');
            Alert.alert('Success', 'Location detected successfully!');
          },
        },
      ]
    );
  };

  const SettingRow: React.FC<{
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }> = ({ title, description, value, onValueChange }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
        thumbColor={value ? '#ffffff' : '#ffffff'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Services</Text>
          
          <SettingRow
            title="Enable Location Services"
            description="Allow the app to access your location for better recommendations"
            value={settings.enableLocationServices}
            onValueChange={(value) => updateSetting('enableLocationServices', value)}
          />

          <SettingRow
            title="Auto-Detect Location"
            description="Automatically detect your current location using GPS"
            value={settings.autoDetectLocation}
            onValueChange={(value) => updateSetting('autoDetectLocation', value)}
          />

          <View style={styles.locationContainer}>
            <Input
              label="Current Location"
              placeholder="Enter your current location"
              value={settings.currentLocation}
              onChangeText={(text) => updateSetting('currentLocation', text)}
              style={styles.locationInput}
            />
            <TouchableOpacity
              style={styles.detectButton}
              onPress={handleDetectLocation}
            >
              <Text style={styles.detectButtonText}>📍 Detect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Preferences</Text>
          
          <Picker
            label="Preferred Area"
            placeholder="Select your preferred area"
            value={settings.preferredArea}
            onValueChange={(value) => updateSetting('preferredArea', value)}
            options={areaOptions}
          />

          <Picker
            label="Search Radius"
            placeholder="Select search radius"
            value={settings.searchRadius}
            onValueChange={(value) => updateSetting('searchRadius', value)}
            options={radiusOptions}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Sharing</Text>
          
          <SettingRow
            title="Share Location with Roommates"
            description="Allow potential roommates to see your general location"
            value={settings.shareLocationWithRoommates}
            onValueChange={(value) => updateSetting('shareLocationWithRoommates', value)}
          />

          <SettingRow
            title="Show Nearby Hostels"
            description="Display hostels and accommodations near your location"
            value={settings.showNearbyHostels}
            onValueChange={(value) => updateSetting('showNearbyHostels', value)}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🔒 Privacy Notice</Text>
          <Text style={styles.infoText}>
            Your exact location is never shared publicly. We only use your location to provide better recommendations and match you with nearby roommates and hostels. You can disable location services at any time.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Settings"
            onPress={handleSave}
            loading={loading}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  locationInput: {
    flex: 1,
    marginRight: 12,
  },
  detectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  detectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
});

export default LocationSettingsScreen;