import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Modal,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';

interface SettingsScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Settings'>;
}

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  newMatches: boolean;
  messages: boolean;
  hostelUpdates: boolean;
}

interface PrivacySettings {
  profileVisibility: boolean;
  showOnlineStatus: boolean;
  allowMessages: boolean;
  showLocation: boolean;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  university: string;
  department: string;
  joinDate: string;
}

interface SettingItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
}

interface SectionHeaderProps {
  title: string;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    newMatches: true,
    messages: true,
    hostelUpdates: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: true,
    showOnlineStatus: true,
    allowMessages: true,
    showLocation: false,
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  // Mock user data
  const user: UserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    avatar: 'https://via.placeholder.com/80x80',
    university: 'University of Lagos',
    department: 'Computer Science',
    joinDate: 'January 2024',
  };

  const handleLogout = (): void => {
    setShowLogoutModal(false);
    // Navigate to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleDeleteAccount = (): void => {
    setShowDeleteModal(false);
    Alert.alert(
      'Account Deleted',
      'Your account has been successfully deleted.',
      [
        {
          text: 'OK',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
        },
      ]
    );
  };

  // Style functions
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f9fafb',
  });

  const getHeaderStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  });

  const getProfileSectionStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 24,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  });

  const getAvatarStyle = (): ImageStyle => ({
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  });

  const getProfileInfoStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getProfileNameStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  });

  const getProfileEmailStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  });

  const getProfileUniversityStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6b7280',
  });

  const getEditButtonStyle = (): ViewStyle => ({
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  });

  const getEditButtonTextStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  });

  const getSectionHeaderStyle = (): ViewStyle => ({
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingVertical: 12,
  });

  const getSectionHeaderTextStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  });

  const getSettingItemStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const getSettingItemContentStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getSettingItemTitleStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  });

  const getSettingItemSubtitleStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  });

  const getSettingItemRightStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
  });

  const getArrowStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#9ca3af',
    marginLeft: 8,
  });

  const getModalOverlayStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  });

  const getModalContentStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  });

  const getModalTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  });

  const getModalMessageStyle = (): TextStyle => ({
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 20,
  });

  const getModalButtonRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    gap: 12,
  });

  const getCancelButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  });

  const getConfirmButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  });

  const getLogoutButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  });

  const getCancelButtonTextStyle = (): TextStyle => ({
    textAlign: 'center',
    fontWeight: '500',
    color: '#374151',
  });

  const getConfirmButtonTextStyle = (): TextStyle => ({
    textAlign: 'center',
    fontWeight: '500',
    color: '#ffffff',
  });

  const getLogoutButtonTextStyle = (): TextStyle => ({
    textAlign: 'center',
    fontWeight: '500',
    color: '#ffffff',
  });

  const getDangerSectionStyle = (): ViewStyle => ({
    marginTop: 32,
    marginBottom: 32,
  });

  const SettingItem: React.FC<SettingItemProps> = ({ title, subtitle, onPress, rightComponent, showArrow = true }) => (
    <TouchableOpacity
      style={getSettingItemStyle()}
      onPress={onPress}
    >
      <View style={getSettingItemContentStyle()}>
        <Text style={getSettingItemTitleStyle()}>{title}</Text>
        {subtitle && (
          <Text style={getSettingItemSubtitleStyle()}>{subtitle}</Text>
        )}
      </View>
      <View style={getSettingItemRightStyle()}>
        {rightComponent}
        {showArrow && <Text style={getArrowStyle()}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <View style={getSectionHeaderStyle()}>
      <Text style={getSectionHeaderTextStyle()}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <Text style={getHeaderTitleStyle()}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={getProfileSectionStyle()}>
          <Image source={{ uri: user.avatar }} style={getAvatarStyle()} />
          <View style={getProfileInfoStyle()}>
            <Text style={getProfileNameStyle()}>{user.name}</Text>
            <Text style={getProfileEmailStyle()}>{user.email}</Text>
            <Text style={getProfileUniversityStyle()}>{user.university}</Text>
          </View>
          <TouchableOpacity style={getEditButtonStyle()}>
            <Text style={getEditButtonTextStyle()}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <SectionHeader title="Account" />
        <SettingItem
          title="Personal Information"
          subtitle="Update your profile details"
          onPress={() => navigation.navigate('PersonalInfo')}
        />
        <SettingItem
          title="Change Password"
          subtitle="Update your account password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <SettingItem
          title="Location Settings"
          subtitle="Manage your location preferences"
          onPress={() => navigation.navigate('LocationSettings')}
        />

        {/* Notifications */}
        <SectionHeader title="Notifications" />
        <SettingItem
          title="Push Notifications"
          subtitle="Receive notifications on your device"
          rightComponent={
            <Switch
              value={notifications.pushNotifications}
              onValueChange={(value) =>
                setNotifications(prev => ({ ...prev, pushNotifications: value }))
              }
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={notifications.pushNotifications ? '#FFFFFF' : '#FFFFFF'}
            />
          }
          showArrow={false}
        />
        <SettingItem
          title="Email Notifications"
          subtitle="Receive updates via email"
          rightComponent={
            <Switch
              value={notifications.emailNotifications}
              onValueChange={(value) =>
                setNotifications(prev => ({ ...prev, emailNotifications: value }))
              }
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={notifications.emailNotifications ? '#FFFFFF' : '#FFFFFF'}
            />
          }
          showArrow={false}
        />
        <SettingItem
          title="New Matches"
          subtitle="Get notified about new roommate matches"
          rightComponent={
            <Switch
              value={notifications.newMatches}
              onValueChange={(value) =>
                setNotifications(prev => ({ ...prev, newMatches: value }))
              }
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={notifications.newMatches ? '#FFFFFF' : '#FFFFFF'}
            />
          }
          showArrow={false}
        />

        {/* Privacy */}
        <SectionHeader title="Privacy" />
        <SettingItem
          title="Profile Visibility"
          subtitle="Control who can see your profile"
          rightComponent={
            <Switch
              value={privacy.profileVisibility}
              onValueChange={(value) =>
                setPrivacy(prev => ({ ...prev, profileVisibility: value }))
              }
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={privacy.profileVisibility ? '#FFFFFF' : '#FFFFFF'}
            />
          }
          showArrow={false}
        />
        <SettingItem
          title="Show Online Status"
          subtitle="Let others see when you're online"
          rightComponent={
            <Switch
              value={privacy.showOnlineStatus}
              onValueChange={(value) =>
                setPrivacy(prev => ({ ...prev, showOnlineStatus: value }))
              }
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={privacy.showOnlineStatus ? '#FFFFFF' : '#FFFFFF'}
            />
          }
          showArrow={false}
        />

        {/* Support */}
        <SectionHeader title="Support" />
        <SettingItem
          title="Help Center"
          subtitle="Get help and support"
          onPress={() => navigation.navigate('HelpCenter')}
        />
        <SettingItem
          title="Contact Us"
          subtitle="Send us your feedback"
          onPress={() => navigation.navigate('ContactUs')}
        />
        <SettingItem
          title="Terms of Service"
          onPress={() => navigation.navigate('TermsOfService')}
        />
        <SettingItem
          title="Privacy Policy"
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />

        {/* Danger Zone */}
        <View style={getDangerSectionStyle()}>
          <SectionHeader title="Account Actions" />
          <SettingItem
            title="Logout"
            subtitle="Sign out of your account"
            onPress={() => setShowLogoutModal(true)}
          />
          <SettingItem
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={() => setShowDeleteModal(true)}
          />
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
      >
        <View style={getModalOverlayStyle()}>
          <View style={getModalContentStyle()}>
            <Text style={getModalTitleStyle()}>Logout</Text>
            <Text style={getModalMessageStyle()}>
              Are you sure you want to logout?
            </Text>
            <View style={getModalButtonRowStyle()}>
              <TouchableOpacity
                style={getCancelButtonStyle()}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={getCancelButtonTextStyle()}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getLogoutButtonStyle()}
                onPress={handleLogout}
              >
                <Text style={getLogoutButtonTextStyle()}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
      >
        <View style={getModalOverlayStyle()}>
          <View style={getModalContentStyle()}>
            <Text style={getModalTitleStyle()}>Delete Account</Text>
            <Text style={getModalMessageStyle()}>
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </Text>
            <View style={getModalButtonRowStyle()}>
              <TouchableOpacity
                style={getCancelButtonStyle()}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={getCancelButtonTextStyle()}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getConfirmButtonStyle()}
                onPress={handleDeleteAccount}
              >
                <Text style={getConfirmButtonTextStyle()}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;