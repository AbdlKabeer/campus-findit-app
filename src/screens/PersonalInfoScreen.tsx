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
import Picker from '../components/Picker';

type PersonalInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PersonalInfo'
>;

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();

  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    age: '22',
    gender: 'Male',
    religion: 'Christianity',
    bio: 'Computer Science student looking for a quiet roommate.',
    university: 'University of Lagos',
    department: 'Computer Science',
    academicLevel: 'Undergraduate',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const academicLevelOptions = [
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Graduate', value: 'Graduate' },
    { label: 'PhD', value: 'PhD' },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16) {
      newErrors.age = 'Age must be a valid number and at least 16';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success',
        'Personal information updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update personal information. Please try again.');
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChangeText={(text) => updateFormData('firstName', text)}
            error={errors.firstName}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChangeText={(text) => updateFormData('lastName', text)}
            error={errors.lastName}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => updateFormData('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChangeText={(text) => updateFormData('phoneNumber', text)}
            keyboardType="phone-pad"
            error={errors.phoneNumber}
          />

          <Input
            label="Age"
            placeholder="Enter your age"
            value={formData.age}
            onChangeText={(text) => updateFormData('age', text)}
            keyboardType="numeric"
            error={errors.age}
          />

          <Picker
            label="Gender"
            placeholder="Select your gender"
            value={formData.gender}
            onValueChange={(value) => updateFormData('gender', value)}
            options={genderOptions}
          />

          <Input
            label="Religion"
            placeholder="Enter your religion"
            value={formData.religion}
            onChangeText={(text) => updateFormData('religion', text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          
          <Input
            label="University"
            placeholder="Enter your university"
            value={formData.university}
            onChangeText={(text) => updateFormData('university', text)}
            error={errors.university}
          />

          <Input
            label="Department"
            placeholder="Enter your department"
            value={formData.department}
            onChangeText={(text) => updateFormData('department', text)}
            error={errors.department}
          />

          <Picker
            label="Academic Level"
            placeholder="Select your academic level"
            value={formData.academicLevel}
            onValueChange={(value) => updateFormData('academicLevel', value)}
            options={academicLevelOptions}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About You</Text>
          
          <Input
            label="Bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChangeText={(text) => updateFormData('bio', text)}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Verification</Text>
          
          <TouchableOpacity
            style={styles.livenessButton}
            onPress={() => navigation.navigate('LivenessCheck', {
              nextScreen: 'PersonalInfo',
              onComplete: () => {
                Alert.alert('Identity Verified', 'Your identity has been successfully verified for enhanced security.');
              }
            })}
          >
            <View style={styles.livenessButtonContent}>
              <Text style={styles.livenessButtonIcon}>🔒</Text>
              <View style={styles.livenessButtonText}>
                <Text style={styles.livenessButtonTitle}>Verify Identity</Text>
                <Text style={styles.livenessButtonSubtitle}>
                  Complete a quick liveness check to enhance your account security
                </Text>
              </View>
              <Text style={styles.livenessButtonArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
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
  buttonContainer: {
    marginTop: 32,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  livenessButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 16,
    marginTop: 8,
  },
  livenessButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livenessButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  livenessButtonText: {
    flex: 1,
  },
  livenessButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  livenessButtonSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  livenessButtonArrow: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 8,
  },
});

export default PersonalInfoScreen;