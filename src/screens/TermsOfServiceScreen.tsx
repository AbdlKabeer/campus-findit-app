import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type TermsOfServiceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TermsOfService'
>;

const TermsOfServiceScreen: React.FC = () => {
  const navigation = useNavigation<TermsOfServiceScreenNavigationProp>();

  const termsData = [
    {
      id: '1',
      title: '1. Acceptance of Terms',
      content: `By accessing and using the FindIt mobile application ("App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") govern your use of our mobile application operated by FindIt ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.`,
    },
    {
      id: '2',
      title: '2. Description of Service',
      content: `FindIt is a platform that connects students and young professionals with roommates and accommodation options including hostels, shared apartments, and other housing solutions.

Our services include:
• Roommate matching based on preferences and compatibility
• Hostel and accommodation listings and booking
• Secure messaging between users
• Profile creation and management
• Location-based search and recommendations
• Payment processing for bookings`,
    },
    {
      id: '3',
      title: '3. User Accounts and Registration',
      content: `To use certain features of the App, you must register for an account. You agree to:
• Provide accurate, current, and complete information during registration
• Maintain and update your information to keep it accurate and current
• Keep your password secure and confidential
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use of your account

You must be at least 18 years old to create an account. If you are under 18, you may only use the App with parental consent and supervision.`,
    },
    {
      id: '4',
      title: '4. User Conduct and Responsibilities',
      content: `You agree to use the App responsibly and in accordance with these Terms. You will not:
• Provide false, misleading, or inaccurate information
• Impersonate another person or entity
• Harass, abuse, or harm other users
• Post inappropriate, offensive, or illegal content
• Attempt to gain unauthorized access to the App or other users' accounts
• Use the App for commercial purposes without our consent
• Violate any applicable laws or regulations

We reserve the right to suspend or terminate accounts that violate these terms.`,
    },
    {
      id: '5',
      title: '5. Privacy and Data Protection',
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our App.

By using the App, you consent to:
• Collection and use of your information as described in our Privacy Policy
• Processing of your data for service provision and improvement
• Sharing of certain information with other users for matching purposes
• Use of location data to provide relevant recommendations

You can review our full Privacy Policy in the app settings.`,
    },
    {
      id: '6',
      title: '6. Payments and Bookings',
      content: `When you make bookings through the App:
• All prices are displayed in Nigerian Naira (NGN) unless otherwise stated
• Payment is required at the time of booking
• Cancellation policies vary by accommodation provider
• Refunds are subject to the specific terms of each booking
• We may charge service fees for certain transactions
• You are responsible for any applicable taxes

We use secure third-party payment processors and do not store your full payment information.`,
    },
    {
      id: '7',
      title: '7. Intellectual Property',
      content: `The App and its original content, features, and functionality are owned by FindIt and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You may not:
• Copy, modify, or distribute our content without permission
• Use our trademarks or logos without authorization
• Reverse engineer or attempt to extract source code
• Create derivative works based on our App

User-generated content remains your property, but you grant us a license to use it for service provision.`,
    },
    {
      id: '8',
      title: '8. Disclaimers and Limitations',
      content: `The App is provided "as is" without warranties of any kind. We do not guarantee:
• Uninterrupted or error-free service
• Accuracy of user-provided information
• Successful roommate matches or accommodation bookings
• Security of communications between users

We are not responsible for:
• Actions or conduct of other users
• Quality or condition of accommodations
• Disputes between users
• Loss of data or service interruptions

Our liability is limited to the maximum extent permitted by law.`,
    },
    {
      id: '9',
      title: '9. Termination',
      content: `We may terminate or suspend your account and access to the App immediately, without prior notice, for any reason, including:
• Violation of these Terms
• Fraudulent or illegal activity
• Abuse of other users
• Extended periods of inactivity

Upon termination:
• Your right to use the App ceases immediately
• We may delete your account and data
• Outstanding obligations remain in effect
• Certain provisions of these Terms survive termination`,
    },
    {
      id: '10',
      title: '10. Changes to Terms',
      content: `We reserve the right to modify these Terms at any time. We will notify users of significant changes through:
• In-app notifications
• Email notifications
• Updates to this page

Continued use of the App after changes constitutes acceptance of the new Terms. If you disagree with changes, you should stop using the App.`,
    },
    {
      id: '11',
      title: '11. Governing Law and Disputes',
      content: `These Terms are governed by the laws of Nigeria. Any disputes arising from these Terms or use of the App will be resolved through:
• Good faith negotiation
• Mediation if negotiation fails
• Arbitration in Lagos, Nigeria
• Nigerian courts as a last resort

You agree to resolve disputes individually and waive any right to class action proceedings.`,
    },
    {
      id: '12',
      title: '12. Contact Information',
      content: `If you have questions about these Terms of Service, please contact us:

Email: legal@findit.com
Phone: +234 801 234 5678
Address: FindIt Legal Department
123 Victoria Island, Lagos, Nigeria

We will respond to inquiries within 5 business days.

Last updated: January 2024`,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>FindIt Terms of Service</Text>
          <Text style={styles.introText}>
            Please read these Terms of Service carefully before using our application. 
            By using FindIt, you agree to be bound by these terms.
          </Text>
          <View style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedText}>Last updated: January 2024</Text>
          </View>
        </View>

        {termsData.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Agreement</Text>
          <Text style={styles.footerText}>
            By continuing to use FindIt, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Service.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions?</Text>
          <Text style={styles.contactText}>
            If you have any questions about these Terms of Service, 
            please contact our legal team at legal@findit.com
          </Text>
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
  introSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  lastUpdated: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionContent: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  footerSection: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: '#fff8f0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9500',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default TermsOfServiceScreen;