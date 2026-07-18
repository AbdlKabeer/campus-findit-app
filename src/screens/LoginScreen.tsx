import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, LoginFormData, FormErrors } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';

interface LoginScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Login'>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home')
    }, 1500);
  };

  const updateFormData = (field: keyof LoginFormData, value: string): void => {
    setFormData((prev: LoginFormData) => ({ ...prev, [field]: value }));
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

  const getForgotPasswordStyle = (): ViewStyle => ({
    alignSelf: 'flex-end',
    marginBottom: 24,
  });

  const getForgotPasswordTextStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontWeight: '500',
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

  const getSignupContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  });

  const getSignupTextStyle = (): TextStyle => ({
    color: '#6B7280',
  });

  const getSignupLinkStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontWeight: '600',
  });

  return (
    <ScrollView style={getContainerStyle()}>
      <View style={getContentStyle()}>
        {/* Header */}
        <View style={getHeaderContainerStyle()}>
          <Text style={getAppTitleStyle()}>FindIt</Text>
          <Text style={getWelcomeTextStyle()}>Welcome back!</Text>
        </View>

        {/* Login Form */}
        <View style={getFormContainerStyle()}>
          <Text style={getFormTitleStyle()}>Sign In</Text>
          
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
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            error={errors.password}
          />

          <TouchableOpacity 
            style={getForgotPasswordStyle()}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={getForgotPasswordTextStyle()}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            disabled={loading}
            loading={loading}
            size="large"
          />
        </View>

        {/* Divider */}
        <View style={getDividerContainerStyle()}>
          <View style={getDividerLineStyle()} />
          <Text style={getDividerTextStyle()}>or</Text>
          <View style={getDividerLineStyle()} />
        </View>

        {/* Social Login */}
        <Button
          title="Continue with Google"
          variant="outline"
          size="large"
          onPress={() => Alert.alert('Info', 'Google login not implemented yet')}
          style={{ marginBottom: 16 }}
        />

        {/* Sign Up Link */}
        <View style={getSignupContainerStyle()}>
          <Text style={getSignupTextStyle()}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={getSignupLinkStyle()}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;