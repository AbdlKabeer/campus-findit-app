import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface ForgotPasswordScreenProps {
  navigation: NavigationProp<RootStackParamList, 'ForgotPassword'>;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmailSent(true);
      Alert.alert(
        'Reset Email Sent',
        'We have sent a password reset link to your email address. Please check your inbox and follow the instructions.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setEmailSent(false);
    await handleSendResetEmail();
  };

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#F9FAFB',
  });

  const getHeaderStyle = (): ViewStyle => ({
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  });

  const getBackButtonStyle = (): ViewStyle => ({
    marginRight: 16,
    padding: 8,
  });

  const getBackButtonTextStyle = (): TextStyle => ({
    fontSize: 18,
    color: '#3B82F6',
    fontWeight: '600',
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  });

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  });

  const getIconContainerStyle = (): ViewStyle => ({
    alignItems: 'center',
    marginBottom: 30,
  });

  const getIconStyle = (): TextStyle => ({
    fontSize: 64,
    marginBottom: 16,
  });

  const getTitleStyle = (): TextStyle => ({
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  });

  const getSubtitleStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  });

  const getFormContainerStyle = (): ViewStyle => ({
    marginBottom: 30,
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  });

  const getInputStyle = (): TextStyle => ({
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 20,
  });

  const getSendButtonStyle = (): ViewStyle => ({
    backgroundColor: isLoading ? '#9CA3AF' : '#3B82F6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  });

  const getSendButtonTextStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  });

  const getSuccessContainerStyle = (): ViewStyle => ({
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  });

  const getSuccessIconStyle = (): TextStyle => ({
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  });

  const getSuccessTextStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  });

  const getResendButtonStyle = (): ViewStyle => ({
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  });

  const getResendButtonTextStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  });

  const getBackToLoginStyle = (): ViewStyle => ({
    alignItems: 'center',
    marginTop: 20,
  });

  const getBackToLoginTextStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  });

  const getHelpTextStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 30,
  });

  const getHelpLinkStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontWeight: '600',
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={getHeaderStyle()}>
          <TouchableOpacity
            style={getBackButtonStyle()}
            onPress={() => navigation.goBack()}
          >
            <Text style={getBackButtonTextStyle()}>←</Text>
          </TouchableOpacity>
          <Text style={getHeaderTitleStyle()}>Reset Password</Text>
        </View>

        <ScrollView style={getContentStyle()} showsVerticalScrollIndicator={false}>
          {/* Icon and Title */}
          <View style={getIconContainerStyle()}>
            <Text style={getIconStyle()}>🔐</Text>
            <Text style={getTitleStyle()}>Forgot Password?</Text>
            <Text style={getSubtitleStyle()}>
              {emailSent
                ? 'Check your email for reset instructions'
                : 'Enter your email address and we\'ll send you a link to reset your password'}
            </Text>
          </View>

          {emailSent ? (
            /* Success State */
            <View style={getSuccessContainerStyle()}>
              <Text style={getSuccessIconStyle()}>✉️</Text>
              <Text style={getSuccessTextStyle()}>
                We've sent a password reset link to{'\n'}
                <Text style={{ fontWeight: '600' }}>{email}</Text>
              </Text>
              <TouchableOpacity
                style={getResendButtonStyle()}
                onPress={handleResendEmail}
              >
                <Text style={getResendButtonTextStyle()}>Resend Email</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Form */
            <View style={getFormContainerStyle()}>
              <Text style={getLabelStyle()}>Email Address</Text>
              <TextInput
                style={getInputStyle()}
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />

              <TouchableOpacity
                style={getSendButtonStyle()}
                onPress={handleSendResetEmail}
                disabled={isLoading}
              >
                <Text style={getSendButtonTextStyle()}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Back to Login */}
          <TouchableOpacity
            style={getBackToLoginStyle()}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={getBackToLoginTextStyle()}>Back to Login</Text>
          </TouchableOpacity>

          {/* Help Text */}
          <Text style={getHelpTextStyle()}>
            Didn't receive the email? Check your spam folder or{' '}
            <Text style={getHelpLinkStyle()}>contact support</Text> for help.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;