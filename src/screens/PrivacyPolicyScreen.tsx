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

type PrivacyPolicyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PrivacyPolicy'
>;

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();

  const privacyData = [
    {
      id: '1',
      title: '1. Information We Collect',
      content: `We collect several types of information to provide and improve our services:

Personal Information:
• Name, email address, phone number
• Date of birth and gender
• Profile photos and descriptions
• Educational institution and program
• Location data (with your permission)

Usage Information:
• App usage patterns and preferences
• Device information (model, operating system)
• IP address and connection data
• Search queries and interactions

Communication Data:
• Messages sent through our platform
• Support requests and feedback
• Call logs for customer service

We only collect information that is necessary for providing our services.`,
    },
    {
      id: '2',
      title: '2. How We Use Your Information',
      content: `We use your information for the following purposes:

Service Provision:
• Create and manage your account
• Match you with compatible roommates
• Show relevant accommodation listings
• Process bookings and payments
• Provide customer support

Communication:
• Send important service updates
• Respond to your inquiries
• Notify you of matches and messages
• Share promotional content (with consent)

Improvement and Analytics:
• Analyze usage patterns to improve our app
• Develop new features and services
• Conduct research and analytics
• Ensure platform safety and security

We never sell your personal information to third parties.`,
    },
    {
      id: '3',
      title: '3. Information Sharing',
      content: `We share your information only in specific circumstances:

With Other Users:
• Profile information for matching purposes
• Basic contact details when you connect
• Messages you choose to send
• Reviews and ratings you provide

With Service Providers:
• Payment processors for transactions
• Cloud storage providers for data hosting
• Analytics services for app improvement
• Customer support tools

Legal Requirements:
• When required by law or legal process
• To protect our rights and safety
• To prevent fraud or illegal activities
• In case of business transfers or mergers

We require all third parties to protect your information and use it only for specified purposes.`,
    },
    {
      id: '4',
      title: '4. Data Security',
      content: `We implement comprehensive security measures to protect your information:

Technical Safeguards:
• Encryption of data in transit and at rest
• Secure servers and databases
• Regular security audits and updates
• Access controls and authentication

Operational Safeguards:
• Employee training on data protection
• Limited access to personal information
• Regular monitoring for suspicious activity
• Incident response procedures

Physical Safeguards:
• Secure data centers
• Controlled access to facilities
• Environmental protections
• Backup and recovery systems

While we strive to protect your information, no method of transmission over the internet is 100% secure.`,
    },
    {
      id: '5',
      title: '5. Your Privacy Rights',
      content: `You have several rights regarding your personal information:

Access and Portability:
• Request a copy of your personal data
• Download your information in a portable format
• View how your data is being used

Correction and Updates:
• Update your profile information
• Correct inaccurate data
• Add missing information

Deletion and Restriction:
• Delete your account and associated data
• Request removal of specific information
• Limit how we process your data

Consent Management:
• Withdraw consent for data processing
• Opt out of marketing communications
• Control location data sharing

To exercise these rights, contact us through the app settings or email privacy@findit.com.`,
    },
    {
      id: '6',
      title: '6. Location Information',
      content: `Location data helps us provide better services:

How We Use Location:
• Show nearby accommodations and roommates
• Provide location-based recommendations
• Improve search results relevance
• Enable safety features

Types of Location Data:
• Precise GPS coordinates (with permission)
• Approximate location from IP address
• Location you manually enter
• Check-in locations at accommodations

Your Control:
• Enable or disable location services anytime
• Choose precision level (exact or approximate)
• Control sharing with other users
• Delete location history

Location data is encrypted and stored securely. You can manage location settings in your device settings or app preferences.`,
    },
    {
      id: '7',
      title: '7. Cookies and Tracking',
      content: `We use various technologies to enhance your experience:

Types of Cookies:
• Essential cookies for app functionality
• Analytics cookies for usage insights
• Preference cookies for personalization
• Security cookies for fraud prevention

Other Tracking Technologies:
• Mobile device identifiers
• Web beacons and pixels
• Local storage technologies
• Session replay tools

Your Choices:
• Manage cookie preferences in settings
• Opt out of analytics tracking
• Control advertising preferences
• Clear stored data anytime

These technologies help us provide a better, more secure experience while respecting your privacy preferences.`,
    },
    {
      id: '8',
      title: '8. Children\'s Privacy',
      content: `Protecting children's privacy is important to us:

Age Requirements:
• Our service is intended for users 18 and older
• We do not knowingly collect data from children under 13
• Users 13-17 require parental consent
• We verify age during registration

If We Learn of Child Data:
• We will delete the information promptly
• We will terminate the account
• We will notify parents if possible
• We will improve our age verification

Parental Rights:
• Parents can request deletion of child's data
• Parents can review information collected
• Parents can refuse further collection
• Parents can contact us with concerns

If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
      id: '9',
      title: '9. International Data Transfers',
      content: `Your information may be transferred internationally:

Where We Transfer Data:
• To our servers in secure data centers
• To service providers in other countries
• For backup and disaster recovery
• For global service provision

Safeguards We Use:
• Adequate protection standards
• Contractual data protection clauses
• Regular compliance assessments
• Encryption during transfer

Your Rights:
• Information about transfer destinations
• Details of safeguards in place
• Right to object to transfers
• Complaint procedures

We ensure all international transfers comply with applicable data protection laws and maintain the same level of protection.`,
    },
    {
      id: '10',
      title: '10. Data Retention',
      content: `We retain your information only as long as necessary:

Account Information:
• Retained while your account is active
• Deleted within 30 days of account closure
• Some information may be retained for legal compliance
• Anonymized data may be kept for analytics

Communication Data:
• Messages retained for service provision
• Support requests kept for quality assurance
• Marketing preferences stored until withdrawal
• Legal communications retained as required

Automatic Deletion:
• Inactive accounts after 2 years
• Temporary files and caches regularly
• Backup data according to retention schedules
• Analytics data after aggregation

You can request deletion of your data at any time through app settings or by contacting us.`,
    },
    {
      id: '11',
      title: '11. Changes to This Policy',
      content: `We may update this Privacy Policy periodically:

When We Update:
• To reflect changes in our practices
• To comply with new legal requirements
• To improve clarity and transparency
• To add new features or services

How We Notify You:
• In-app notifications for significant changes
• Email notifications to registered users
• Updates posted on this page
• Prominent notices in the app

Your Continued Use:
• Constitutes acceptance of changes
• You can review changes before accepting
• You can delete your account if you disagree
• Previous versions available upon request

We encourage you to review this policy regularly to stay informed about how we protect your information.`,
    },
    {
      id: '12',
      title: '12. Contact Us',
      content: `If you have questions about this Privacy Policy or our data practices:

Privacy Team:
Email: privacy@findit.com
Phone: +234 801 234 5678
Response time: Within 5 business days

Data Protection Officer:
Email: dpo@findit.com
For formal complaints and requests

Mailing Address:
FindIt Privacy Department
123 Victoria Island
Lagos, Nigeria

Regulatory Authority:
You can also contact the Nigerian Data Protection Commission (NDPC) if you have concerns about our data practices.

We are committed to addressing your privacy concerns promptly and transparently.

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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>FindIt Privacy Policy</Text>
          <Text style={styles.introText}>
            Your privacy is important to us. This Privacy Policy explains how we collect, 
            use, and protect your information when you use our application.
          </Text>
          <View style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedText}>Last updated: January 2024</Text>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>🔒 Privacy at a Glance</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>🛡️</Text>
              <Text style={styles.summaryItemTitle}>Data Protection</Text>
              <Text style={styles.summaryItemText}>We encrypt and secure your data</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>🎯</Text>
              <Text style={styles.summaryItemTitle}>Limited Use</Text>
              <Text style={styles.summaryItemText}>Data used only for our services</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>🚫</Text>
              <Text style={styles.summaryItemTitle}>No Selling</Text>
              <Text style={styles.summaryItemText}>We never sell your information</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>⚙️</Text>
              <Text style={styles.summaryItemTitle}>Your Control</Text>
              <Text style={styles.summaryItemText}>Manage your privacy settings</Text>
            </View>
          </View>
        </View>

        {privacyData.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Your Privacy Matters</Text>
          <Text style={styles.footerText}>
            We are committed to protecting your privacy and being transparent about our data practices. 
            If you have any questions or concerns, please don't hesitate to contact us.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Privacy?</Text>
          <Text style={styles.contactText}>
            Contact our Privacy Team at privacy@findit.com or through the Help Center in the app.
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
  summarySection: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  summaryItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryItemText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
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
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
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
    backgroundColor: '#fff0f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#e91e63',
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

export default PrivacyPolicyScreen;