import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';

type HelpCenterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HelpCenter'
>;

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpCenterScreen: React.FC = () => {
  const navigation = useNavigation<HelpCenterScreenNavigationProp>();
  
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, tap the "Sign Up" button on the login screen, fill in your details including your email, password, and basic information, then verify your email address.',
    },
    {
      id: '2',
      category: 'account',
      question: 'I forgot my password. How can I reset it?',
      answer: 'On the login screen, tap "Forgot Password", enter your email address, and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
    },
    {
      id: '3',
      category: 'roommates',
      question: 'How does the roommate matching work?',
      answer: 'Our algorithm matches you with potential roommates based on your preferences, lifestyle, study habits, and location. You can view profiles, chat, and decide if you\'d like to room together.',
    },
    {
      id: '4',
      category: 'roommates',
      question: 'Can I filter roommate searches?',
      answer: 'Yes! You can filter by gender, age range, study program, lifestyle preferences, budget range, and location. Use the filter options in the roommate search section.',
    },
    {
      id: '5',
      category: 'hostels',
      question: 'How do I book a hostel room?',
      answer: 'Browse available hostels, select your preferred room type, check availability for your dates, and complete the booking process. You\'ll receive a confirmation email with details.',
    },
    {
      id: '6',
      category: 'hostels',
      question: 'Can I cancel my hostel booking?',
      answer: 'Cancellation policies vary by hostel. Check the specific cancellation terms in your booking confirmation. Most hostels allow free cancellation up to 24-48 hours before check-in.',
    },
    {
      id: '7',
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, debit cards, bank transfers, and mobile money payments. All transactions are secure and encrypted.',
    },
    {
      id: '8',
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption and secure payment processors. We never store your full payment details on our servers.',
    },
    {
      id: '9',
      category: 'general',
      question: 'Is FindIt free to use?',
      answer: 'Basic features like browsing roommates and hostels are free. Some premium features and booking services may have associated fees, which are clearly displayed.',
    },
    {
      id: '10',
      category: 'general',
      question: 'How do I report inappropriate behavior?',
      answer: 'You can report users by tapping the report button on their profile or in chat. We take all reports seriously and will investigate promptly.',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📋' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'roommates', name: 'Roommates', icon: '🏠' },
    { id: 'hostels', name: 'Hostels', icon: '🏨' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'general', name: 'General', icon: '❓' },
  ];

  const contactOptions = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get help via email',
      icon: '📧',
      action: () => Linking.openURL('mailto:support@findit.com'),
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call us directly',
      icon: '📞',
      action: () => Linking.openURL('tel:+2348012345678'),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Chat with us on WhatsApp',
      icon: '💬',
      action: () => Linking.openURL('https://wa.me/2348012345678'),
    },
    {
      id: 'form',
      title: 'Contact Form',
      description: 'Send us a message',
      icon: '📝',
      action: () => setShowContactForm(true),
    },
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSubmitContactForm = async () => {
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Message Sent',
        'Thank you for contacting us! We\'ll get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowContactForm(false);
              setContactForm({ subject: '', message: '' });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showContactForm) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowContactForm(false)}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.formDescription}>
            Have a question or need help? Send us a message and we'll get back to you as soon as possible.
          </Text>

          <Input
            label="Subject"
            placeholder="What's this about?"
            value={contactForm.subject}
            onChangeText={(text) => setContactForm(prev => ({ ...prev, subject: text }))}
            style={styles.input}
          />

          <Input
            label="Message"
            placeholder="Describe your issue or question..."
            value={contactForm.message}
            onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
            multiline
            numberOfLines={6}
            style={[styles.input, styles.messageInput]}
          />

          <Button
            title="Send Message"
            onPress={handleSubmitContactForm}
            loading={loading}
            style={styles.submitButton}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          👋 How can we help you today?
        </Text>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.contactOption}
                onPress={option.action}
              >
                <Text style={styles.contactIcon}>{option.icon}</Text>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Topic</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQ List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions ({filteredFAQs.length})
          </Text>
          {filteredFAQs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleFAQ(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqToggle}>
                  {expandedFAQ === faq.id ? '−' : '+'}
                </Text>
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.bottomTitle}>Still need help?</Text>
          <Text style={styles.bottomText}>
            Our support team is available 24/7 to assist you with any questions or issues.
          </Text>
          <Button
            title="Contact Support"
            onPress={() => setShowContactForm(true)}
            style={styles.contactButton}
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
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactOption: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  faqItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginRight: 12,
  },
  faqToggle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginTop: 12,
  },
  bottomSection: {
    backgroundColor: '#f0f8ff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  bottomTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  bottomText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    minWidth: 150,
  },
  formDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    marginTop: 16,
    marginBottom: 40,
  },
});

export default HelpCenterScreen;