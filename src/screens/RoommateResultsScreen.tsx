import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList, RoommateSearchFilters } from '../types';
import Button from '../components/Button';

interface RoommateResultsScreenProps {
  navigation: NavigationProp<RootStackParamList, 'RoommateResults'>;
  route: RouteProp<RootStackParamList, 'RoommateResults'>;
}

interface RoommatePreferences {
  smoking: string;
  studyHabits: string;
}

interface Roommate {
  id: number;
  name: string;
  age: number;
  gender: string;
  department: string;
  academicLevel: string;
  university: string;
  religion: string;
  budget: string;
  compatibility: number;
  bio: string;
  preferences: RoommatePreferences;
  lastActive: string;
  verified: boolean;
}

interface SortOption {
  label: string;
  value: string;
}

interface RoommateCardProps {
  roommate: Roommate;
}

const RoommateResultsScreen: React.FC<RoommateResultsScreenProps> = ({ navigation, route }) => {
  const { filters = {} } = route.params || {};
  const [sortBy, setSortBy] = useState<string>('compatibility');

  // Mock data for roommate results
  const [roommates] = useState<Roommate[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 21,
      gender: 'Female',
      department: 'Computer Science',
      academicLevel: '300 Level',
      university: 'University of Lagos',
      religion: 'Christianity',
      budget: '₦50,000 - ₦100,000',
      compatibility: 95,
      bio: 'Love coding and reading. Looking for a quiet study partner who shares similar interests.',
      preferences: {
        smoking: 'Non-smoker',
        studyHabits: 'Very quiet',
      },
      lastActive: '2 hours ago',
      verified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 22,
      gender: 'Male',
      department: 'Engineering',
      academicLevel: '400 Level',
      university: 'University of Ibadan',
      religion: 'Christianity',
      budget: '₦50,000 - ₦100,000',
      compatibility: 88,
      bio: 'Engineering student who loves sports and music. Easy-going and respectful.',
      preferences: {
        smoking: 'Non-smoker',
        studyHabits: 'Moderate',
      },
      lastActive: '1 day ago',
      verified: true,
    },
    {
      id: 3,
      name: 'Aisha Ibrahim',
      age: 20,
      gender: 'Female',
      department: 'Medicine',
      academicLevel: '200 Level',
      university: 'Ahmadu Bello University',
      religion: 'Islam',
      budget: '₦100,000 - ₦200,000',
      compatibility: 82,
      bio: 'Medical student with a passion for helping others. Looking for a serious study partner.',
      preferences: {
        smoking: 'Non-smoker',
        studyHabits: 'Very quiet',
      },
      lastActive: '3 hours ago',
      verified: false,
    },
    {
      id: 4,
      name: 'David Okafor',
      age: 23,
      gender: 'Male',
      department: 'Business Administration',
      academicLevel: '400 Level',
      university: 'University of Nigeria',
      religion: 'Christianity',
      budget: '₦50,000 - ₦100,000',
      compatibility: 78,
      bio: 'Business student and entrepreneur. Love networking and meeting new people.',
      preferences: {
        smoking: 'Occasional smoker',
        studyHabits: 'Social',
      },
      lastActive: '5 hours ago',
      verified: true,
    },
    {
      id: 5,
      name: 'Fatima Yusuf',
      age: 21,
      gender: 'Female',
      department: 'Law',
      academicLevel: '300 Level',
      university: 'University of Abuja',
      religion: 'Islam',
      budget: '₦100,000 - ₦200,000',
      compatibility: 75,
      bio: 'Law student with strong academic focus. Looking for someone who values education.',
      preferences: {
        smoking: 'Non-smoker',
        studyHabits: 'Very quiet',
      },
      lastActive: '1 hour ago',
      verified: true,
    },
  ]);

  const sortOptions: SortOption[] = [
    { label: 'Compatibility', value: 'compatibility' },
    { label: 'Recently Active', value: 'lastActive' },
    { label: 'Age', value: 'age' },
    { label: 'Budget', value: 'budget' },
  ];

  const getCompatibilityColor = (score: number): { backgroundColor: string; color: string } => {
    if (score >= 90) return { backgroundColor: '#dcfce7', color: '#16a34a' };
    if (score >= 80) return { backgroundColor: '#dbeafe', color: '#2563eb' };
    if (score >= 70) return { backgroundColor: '#fef3c7', color: '#d97706' };
    return { backgroundColor: '#fee2e2', color: '#dc2626' };
  };

  const handleConnect = (roommate: Roommate): void => {
    Alert.alert(
      'Send Connection Request',
      `Send a connection request to ${roommate.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Request', 
          onPress: () => {
            Alert.alert('Success', 'Connection request sent!');
          }
        },
      ]
    );
  };

  const handleMessage = (roommate: Roommate): void => {
    navigation.navigate('Chat', { 
      conversationId: `conversation_${roommate.id}`, 
      contactName: roommate.name 
    });
  };

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f9fafb',
  });

  const getHeaderStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  });

  const getHeaderSubtitleStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  });

  const getSortContainerStyle = (): ViewStyle => ({
    paddingHorizontal: 24,
  });

  const getSortButtonStyle = (isSelected: boolean): ViewStyle => ({
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: isSelected ? '#2563eb' : '#ffffff',
    borderColor: isSelected ? '#2563eb' : '#d1d5db',
  });

  const getSortButtonTextStyle = (isSelected: boolean): TextStyle => ({
    fontSize: 14,
    fontWeight: '500',
    color: isSelected ? '#ffffff' : '#374151',
  });

  const getResultsContainerStyle = (): ViewStyle => ({
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  });

  const getCardStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  });

  const getCardHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  });

  const getCardHeaderLeftStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getNameRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  });

  const getNameStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 8,
  });

  const getVerifiedBadgeStyle = (): ViewStyle => ({
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 4,
  });

  const getVerifiedTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 12,
  });

  const getAgeGenderStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
  });

  const getLastActiveStyle = (): TextStyle => ({
    color: '#9ca3af',
    fontSize: 12,
  });

  const getCompatibilityBadgeStyle = (score: number): ViewStyle => ({
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    ...getCompatibilityColor(score),
  });

  const getCompatibilityTextStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '600',
  });

  const getInfoSectionStyle = (): ViewStyle => ({
    marginBottom: 12,
  });

  const getInfoRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  });

  const getInfoLabelStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  });

  const getInfoValueStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  });

  const getBioStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  });

  const getButtonRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    gap: 12,
  });

  const getConnectButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  });

  const getMessageButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  });

  const getConnectButtonTextStyle = (): TextStyle => ({
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  });

  const getMessageButtonTextStyle = (): TextStyle => ({
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  });

  const RoommateCard: React.FC<RoommateCardProps> = ({ roommate }) => (
    <View style={getCardStyle()}>
      {/* Header */}
      <View style={getCardHeaderStyle()}>
        <View style={getCardHeaderLeftStyle()}>
          <View style={getNameRowStyle()}>
            <Text style={getNameStyle()}>{roommate.name}</Text>
            {roommate.verified && (
              <View style={getVerifiedBadgeStyle()}>
                <Text style={getVerifiedTextStyle()}>✓</Text>
              </View>
            )}
          </View>
          <Text style={getAgeGenderStyle()}>{roommate.age} years • {roommate.gender}</Text>
          <Text style={getLastActiveStyle()}>{roommate.lastActive}</Text>
        </View>
        
        <View style={getCompatibilityBadgeStyle(roommate.compatibility)}>
          <Text style={[getCompatibilityTextStyle(), { color: getCompatibilityColor(roommate.compatibility).color }]}>
            {roommate.compatibility}% match
          </Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={getInfoSectionStyle()}>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>University:</Text>
          <Text style={getInfoValueStyle()}>{roommate.university}</Text>
        </View>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>Department:</Text>
          <Text style={getInfoValueStyle()}>{roommate.department}</Text>
        </View>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>Level:</Text>
          <Text style={getInfoValueStyle()}>{roommate.academicLevel}</Text>
        </View>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>Budget:</Text>
          <Text style={getInfoValueStyle()}>{roommate.budget}</Text>
        </View>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>Religion:</Text>
          <Text style={getInfoValueStyle()}>{roommate.religion}</Text>
        </View>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>Study Habits:</Text>
          <Text style={getInfoValueStyle()}>{roommate.preferences.studyHabits}</Text>
        </View>
        <View style={getInfoRowStyle()}>
          <Text style={getInfoLabelStyle()}>Smoking:</Text>
          <Text style={getInfoValueStyle()}>{roommate.preferences.smoking}</Text>
        </View>
      </View>

      {/* Bio */}
      <Text style={getBioStyle()}>{roommate.bio}</Text>

      {/* Action Buttons */}
      <View style={getButtonRowStyle()}>
        <TouchableOpacity
          style={getConnectButtonStyle()}
          onPress={() => handleConnect(roommate)}
        >
          <Text style={getConnectButtonTextStyle()}>Connect</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={getMessageButtonStyle()}
          onPress={() => handleMessage(roommate)}
        >
          <Text style={getMessageButtonTextStyle()}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <Text style={getHeaderTitleStyle()}>Roommate Results</Text>
        <Text style={getHeaderSubtitleStyle()}>
          Found {roommates.length} potential roommates
        </Text>
        
        {/* Sort Options */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={getSortContainerStyle()}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={getSortButtonStyle(sortBy === option.value)}
              onPress={() => setSortBy(option.value)}
            >
              <Text style={getSortButtonTextStyle(sortBy === option.value)}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results List */}
      <ScrollView style={getResultsContainerStyle()}>
        {roommates.map((roommate) => (
          <RoommateCard key={roommate.id} roommate={roommate} />
        ))}

        {/* Load More */}
        <Button
          title="Load More Results"
          variant="outline"
          onPress={() => Alert.alert('Info', 'Loading more results...')}
          style={{ marginBottom: 32 }}
        />
      </ScrollView>
    </View>
  );
};

export default RoommateResultsScreen;