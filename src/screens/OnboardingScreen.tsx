import React, { useState } from 'react';
import { View, Text, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Onboarding'>;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Find Your Perfect Roommate',
      description: 'Connect with like-minded students who share your preferences, budget, and lifestyle.',
      icon: '👥',
      color: '#EFF6FF'
    },
    {
      id: 2,
      title: 'Discover Quality Hostels',
      description: 'Browse through verified hostels with detailed information, photos, and reviews.',
      icon: '🏠',
      color: '#F0FDF4'
    },
    {
      id: 3,
      title: 'Chat & Connect',
      description: 'Message potential roommates and hostel owners directly through our secure chat system.',
      icon: '💬',
      color: '#FAF5FF'
    }
  ];

  const nextSlide = (): void => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const skipOnboarding = (): void => {
    navigation.navigate('Login');
  };

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#FFFFFF',
  });

  const getHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
  });

  const getLogoStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
  });

  const getSlideContainerStyle = (slide: Slide): ViewStyle => ({
    flex: 1,
    backgroundColor: slide.color,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
  });

  const getSlideContentStyle = (): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  });

  const getIconStyle = (): TextStyle => ({
    fontSize: 128,
    marginBottom: 32,
  });

  const getTitleStyle = (): TextStyle => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  });

  const getDescriptionStyle = (): TextStyle => ({
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  });

  const getPaginationStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  });

  const getDotStyle = (isActive: boolean): ViewStyle => ({
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: isActive ? '#3B82F6' : '#D1D5DB',
  });

  const getNavigationStyle = (): ViewStyle => ({
    paddingHorizontal: 24,
    paddingBottom: 32,
  });

  const getButtonStyle = (): ViewStyle => ({
    width: '100%',
  });

  const getPreviousButtonStyle = (): ViewStyle => ({
    width: '100%',
    marginTop: 12,
  });

  return (
    <View style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <Text style={getLogoStyle()}>FindIt</Text>
        <Button
          title="Skip"
          variant="outline"
          size="small"
          onPress={skipOnboarding}
        />
      </View>

      {/* Slide Content */}
      <View style={getSlideContainerStyle(slides[currentSlide])}>
        <View style={getSlideContentStyle()}>
          {/* Icon */}
          <Text style={getIconStyle()}>{slides[currentSlide].icon}</Text>
          
          {/* Title */}
          <Text style={getTitleStyle()}>
            {slides[currentSlide].title}
          </Text>
          
          {/* Description */}
          <Text style={getDescriptionStyle()}>
            {slides[currentSlide].description}
          </Text>
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={getPaginationStyle()}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={getDotStyle(index === currentSlide)}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={getNavigationStyle()}>
        <Button
          title={currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={nextSlide}
          size="large"
          style={getButtonStyle()}
        />
        
        {currentSlide > 0 && (
          <Button
            title="Previous"
            variant="outline"
            onPress={() => setCurrentSlide(currentSlide - 1)}
            size="large"
            style={getPreviousButtonStyle()}
          />
        )}
      </View>
    </View>
  );
};

export default OnboardingScreen;