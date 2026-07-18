import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface ContactUsScreenProps {
  navigation: NavigationProp<RootStackParamList, 'ContactUs'>;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

const ContactUsScreen: React.FC<ContactUsScreenProps> = ({ navigation }) => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'account', label: 'Account Issues' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'bug', label: 'Bug Report' },
  ];

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We\'ll get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@findit.com');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/1234567890');
  };

  const handleLiveChat = () => {
    Alert.alert('Live Chat', 'Live chat feature will be available soon!');
  };

  // Styles
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#FFFFFF',
  });

  const getHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  });

  const getBackButtonStyle = (): ViewStyle => ({
    marginRight: 16,
    padding: 8,
  });

  const getBackButtonTextStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  });

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    paddingHorizontal: 20,
  });

  const getSectionStyle = (): ViewStyle => ({
    marginBottom: 24,
  });

  const getSectionTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  });

  const getQuickContactStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  });

  const getContactOptionStyle = (): ViewStyle => ({
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  });

  const getContactOptionTextStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  });

  const getContactOptionSubtextStyle = (): TextStyle => ({
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  });

  const getFormStyle = (): ViewStyle => ({
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  });

  const getInputGroupStyle = (): ViewStyle => ({
    marginBottom: 16,
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  });

  const getInputStyle = (): TextStyle => ({
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  });

  const getTextAreaStyle = (): TextStyle => ({
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    height: 120,
    textAlignVertical: 'top',
  });

  const getCategoryContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  });

  const getCategoryOptionStyle = (isSelected: boolean): ViewStyle => ({
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: isSelected ? '#3B82F6' : '#D1D5DB',
    backgroundColor: isSelected ? '#EBF4FF' : '#FFFFFF',
  });

  const getCategoryOptionTextStyle = (isSelected: boolean): TextStyle => ({
    fontSize: 14,
    color: isSelected ? '#3B82F6' : '#6B7280',
    fontWeight: isSelected ? '600' : '400',
  });

  const getSubmitButtonStyle = (): ViewStyle => ({
    backgroundColor: isSubmitting ? '#9CA3AF' : '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  });

  const getSubmitButtonTextStyle = (): TextStyle => ({
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  });

  const getInfoBoxStyle = (): ViewStyle => ({
    backgroundColor: '#EBF4FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    marginBottom: 24,
  });

  const getInfoTextStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  });

  const getEmojiStyle = (): TextStyle => ({
    fontSize: 24,
  });

  const getResponseTimeTextStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6B7280',
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <TouchableOpacity
          style={getBackButtonStyle()}
          onPress={() => navigation.goBack()}
        >
          <Text style={getBackButtonTextStyle()}>← Back</Text>
        </TouchableOpacity>
        <Text style={getHeaderTitleStyle()}>Contact Us</Text>
      </View>

      <ScrollView style={getContentStyle()} showsVerticalScrollIndicator={false}>
        {/* Info Box */}
        <View style={getInfoBoxStyle()}>
          <Text style={getInfoTextStyle()}>
            We're here to help! Choose your preferred contact method below or fill out the form to send us a message.
          </Text>
        </View>

        {/* Quick Contact Options */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Quick Contact</Text>
          <View style={getQuickContactStyle()}>
            <TouchableOpacity style={getContactOptionStyle()} onPress={handlePhoneCall}>
              <Text style={getEmojiStyle()}>📞</Text>
              <Text style={getContactOptionTextStyle()}>Call Us</Text>
              <Text style={getContactOptionSubtextStyle()}>+1 (234) 567-890</Text>
            </TouchableOpacity>

            <TouchableOpacity style={getContactOptionStyle()} onPress={handleEmail}>
              <Text style={getEmojiStyle()}>✉️</Text>
              <Text style={getContactOptionTextStyle()}>Email</Text>
              <Text style={getContactOptionSubtextStyle()}>support@findit.com</Text>
            </TouchableOpacity>

            <TouchableOpacity style={getContactOptionStyle()} onPress={handleWhatsApp}>
              <Text style={getEmojiStyle()}>💬</Text>
              <Text style={getContactOptionTextStyle()}>WhatsApp</Text>
              <Text style={getContactOptionSubtextStyle()}>Chat with us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={getContactOptionStyle()} onPress={handleLiveChat}>
              <Text style={getEmojiStyle()}>🔴</Text>
              <Text style={getContactOptionTextStyle()}>Live Chat</Text>
              <Text style={getContactOptionSubtextStyle()}>Coming soon</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Form */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Send us a Message</Text>
          <View style={getFormStyle()}>
            {/* Name */}
            <View style={getInputGroupStyle()}>
              <Text style={getLabelStyle()}>Full Name *</Text>
              <TextInput
                style={getInputStyle()}
                value={form.name}
                onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Email */}
            <View style={getInputGroupStyle()}>
              <Text style={getLabelStyle()}>Email Address *</Text>
              <TextInput
                style={getInputStyle()}
                value={form.email}
                onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Category */}
            <View style={getInputGroupStyle()}>
              <Text style={getLabelStyle()}>Category</Text>
              <View style={getCategoryContainerStyle()}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.value}
                    style={getCategoryOptionStyle(form.category === category.value)}
                    onPress={() => setForm(prev => ({ ...prev, category: category.value }))}
                  >
                    <Text style={getCategoryOptionTextStyle(form.category === category.value)}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Subject */}
            <View style={getInputGroupStyle()}>
              <Text style={getLabelStyle()}>Subject *</Text>
              <TextInput
                style={getInputStyle()}
                value={form.subject}
                onChangeText={(text) => setForm(prev => ({ ...prev, subject: text }))}
                placeholder="Brief description of your inquiry"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Message */}
            <View style={getInputGroupStyle()}>
              <Text style={getLabelStyle()}>Message *</Text>
              <TextInput
                style={getTextAreaStyle()}
                value={form.message}
                onChangeText={(text) => setForm(prev => ({ ...prev, message: text }))}
                placeholder="Please provide details about your inquiry..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={getSubmitButtonStyle()}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={getSubmitButtonTextStyle()}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Response Time Info */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Response Times</Text>
          <View style={{ gap: 8 }}>
            <Text style={getResponseTimeTextStyle()}>
              • Email & Contact Form: Within 24 hours
            </Text>
            <Text style={getResponseTimeTextStyle()}>
              • Phone Support: Monday-Friday, 9 AM - 6 PM
            </Text>
            <Text style={getResponseTimeTextStyle()}>
              • WhatsApp: Usually within 2-4 hours
            </Text>
            <Text style={getResponseTimeTextStyle()}>
              • Emergency Issues: Call for immediate assistance
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;