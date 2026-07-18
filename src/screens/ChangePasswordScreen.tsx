import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';

type ChangePasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChangePassword'
>;

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation<ChangePasswordScreenNavigationProp>();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword && formData.currentPassword.trim()) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success',
        'Password changed successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please check your current password and try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '#e0e0e0' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const strengthLevels = [
      { text: 'Very Weak', color: '#ff4444' },
      { text: 'Weak', color: '#ff8800' },
      { text: 'Fair', color: '#ffaa00' },
      { text: 'Good', color: '#88cc00' },
      { text: 'Strong', color: '#00cc44' },
    ];

    return { strength, ...strengthLevels[strength - 1] || strengthLevels[0] };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>
            Choose a strong password to keep your account secure. Your password should be at least 8 characters long and include a mix of letters, numbers, and symbols.
          </Text>

          <Input
            label="Current Password"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChangeText={(text) => updateFormData('currentPassword', text)}
            secureTextEntry={!showPasswords.current}
            error={errors.currentPassword}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => togglePasswordVisibility('current')}
          >
            <Text style={styles.toggleButtonText}>
              {showPasswords.current ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>

          <Input
            label="New Password"
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChangeText={(text) => updateFormData('newPassword', text)}
            secureTextEntry={!showPasswords.new}
            error={errors.newPassword}
            style={styles.input}
          />

          {formData.newPassword.length > 0 && (
            <View style={styles.passwordStrengthContainer}>
              <View style={styles.passwordStrengthBar}>
                <View
                  style={[
                    styles.passwordStrengthFill,
                    {
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                {passwordStrength.text}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => togglePasswordVisibility('new')}
          >
            <Text style={styles.toggleButtonText}>
              {showPasswords.new ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>

          <Input
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateFormData('confirmPassword', text)}
            secureTextEntry={!showPasswords.confirm}
            error={errors.confirmPassword}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => togglePasswordVisibility('confirm')}
          >
            <Text style={styles.toggleButtonText}>
              {showPasswords.confirm ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordRequirements}>
          <Text style={styles.requirementsTitle}>Password Requirements:</Text>
          <Text style={styles.requirementItem}>• At least 8 characters long</Text>
          <Text style={styles.requirementItem}>• Contains uppercase and lowercase letters</Text>
          <Text style={styles.requirementItem}>• Contains at least one number</Text>
          <Text style={styles.requirementItem}>• Different from your current password</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Change Password"
            onPress={handleChangePassword}
            loading={loading}
            style={styles.changeButton}
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
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  passwordStrengthContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  passwordRequirements: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 40,
  },
  changeButton: {
    backgroundColor: '#007AFF',
  },
});

export default ChangePasswordScreen;