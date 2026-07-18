import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, SignupFormData, FormErrors } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';

interface SignupScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Signup'>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{11}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 11-digit phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('ProfileSetup') }
      ]);
    }, 2000);
  };

  const updateFormData = (field: keyof SignupFormData, value: string): void => {
    setFormData((prev: SignupFormData) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: '' }));
    }
  };

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#FFFFFF',
  });

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
  });

  const getHeaderContainerStyle = (): ViewStyle => ({
    alignItems: 'center',
    marginBottom: 48,
  });

  const getAppTitleStyle = (): TextStyle => ({
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
  });

  const getWelcomeTextStyle = (): TextStyle => ({
    fontSize: 18,
    color: '#6B7280',
  });

  const getFormContainerStyle = (): ViewStyle => ({
    marginBottom: 32,
  });

  const getFormTitleStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  });

  const getTermsTextStyle = (): TextStyle => ({
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 16,
  });

  const getTermsLinkStyle = (): TextStyle => ({
    color: '#3B82F6',
  });

  const getDividerContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  });

  const getDividerLineStyle = (): ViewStyle => ({
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  });

  const getDividerTextStyle = (): TextStyle => ({
    marginHorizontal: 16,
    color: '#6B7280',
  });

  const getLoginContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  });

  const getLoginTextStyle = (): TextStyle => ({
    color: '#6B7280',
  });

  const getLoginLinkStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontWeight: '600',
  });

  return (
    <ScrollView style={getContainerStyle()}>
      <View style={getContentStyle()}>
        {/* Header */}
        <View style={getHeaderContainerStyle()}>
          <Text style={getAppTitleStyle()}>FindIt</Text>
          <Text style={getWelcomeTextStyle()}>Create your account</Text>
        </View>

        {/* Signup Form */}
        <View style={getFormContainerStyle()}>
          <Text style={getFormTitleStyle()}>Sign Up</Text>
          
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChangeText={(value) => updateFormData('firstName', value)}
            error={errors.firstName}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChangeText={(value) => updateFormData('lastName', value)}
            error={errors.lastName}
          />

          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Phone Number"
            placeholder="08012345678"
            value={formData.phoneNumber}
            onChangeText={(value) => updateFormData('phoneNumber', value)}
            keyboardType="phone-pad"
            error={errors.phoneNumber}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title={loading ? "Creating Account..." : "Create Account"}
            onPress={handleSignup}
            disabled={loading}
            loading={loading}
            size="large"
          />
        </View>

        {/* Terms and Privacy */}
        <Text style={getTermsTextStyle()}>
          By creating an account, you agree to our{' '}
          <Text style={getTermsLinkStyle()}>Terms of Service</Text> and{' '}
          <Text style={getTermsLinkStyle()}>Privacy Policy</Text>
        </Text>

        {/* Divider */}
        <View style={getDividerContainerStyle()}>
          <View style={getDividerLineStyle()} />
          <Text style={getDividerTextStyle()}>or</Text>
          <View style={getDividerLineStyle()} />
        </View>

        {/* Social Signup */}
        <Button
          title="Continue with Google"
          variant="outline"
          size="large"
          onPress={() => Alert.alert('Info', 'Google signup not implemented yet')}
          style={{ marginBottom: 16 }}
        />

        {/* Login Link */}
        <View style={getLoginContainerStyle()}>
          <Text style={getLoginTextStyle()}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={getLoginLinkStyle()}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;