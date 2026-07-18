import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  onPress: () => void;
}

interface RecentMatch {
  id: number;
  name: string;
  department: string;
  compatibility: string;
}

interface FeaturedHostel {
  id: number;
  name: string;
  price: string;
  rating: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const quickActions: QuickAction[] = [
    {
      title: 'Find Roommates',
      description: 'Search for compatible roommates',
      icon: '👥',
      color: '#EFF6FF',
      borderColor: '#BFDBFE',
      onPress: () => navigation.navigate('RoommateSearch'),
    },
    {
      title: 'Browse Hostels',
      description: 'Explore available hostels',
      icon: '🏠',
      color: '#F0FDF4',
      borderColor: '#BBF7D0',
      onPress: () => navigation.navigate('HostelListing'),
    },
    {
      title: 'Messages',
      description: 'Chat with connections',
      icon: '💬',
      color: '#FAF5FF',
      borderColor: '#E9D5FF',
      onPress: () => navigation.navigate('Chat', { conversationId: '1', contactName: 'Messages' }),
    },
    {
      title: 'Settings',
      description: 'Manage your account',
      icon: '⚙️',
      color: '#F9FAFB',
      borderColor: '#E5E7EB',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  const recentMatches: RecentMatch[] = [
    { id: 1, name: 'Sarah Johnson', department: 'Computer Science', compatibility: '95%' },
    { id: 2, name: 'Michael Chen', department: 'Engineering', compatibility: '88%' },
    { id: 3, name: 'Aisha Ibrahim', department: 'Medicine', compatibility: '82%' },
  ];

  const featuredHostels: FeaturedHostel[] = [
    { id: 1, name: 'Green Valley Hostel', price: '₦45,000', rating: '4.8' },
    { id: 2, name: 'Campus View Lodge', price: '₦38,000', rating: '4.6' },
    { id: 3, name: 'Student Haven', price: '₦52,000', rating: '4.9' },
  ];

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#F9FAFB',
  });

  const getHeaderStyle = (): ViewStyle => ({
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
  });

  const getHeaderRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const getWelcomeTextStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  });

  const getSubtitleStyle = (): TextStyle => ({
    color: '#6B7280',
    marginTop: 4,
  });

  const getProfileButtonStyle = (): ViewStyle => ({
    width: 40,
    height: 40,
    backgroundColor: '#DBEAFE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  });

  const getProfileIconStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontSize: 18,
  });

  const getSectionStyle = (): ViewStyle => ({
    paddingHorizontal: 24,
    paddingVertical: 24,
  });

  const getSectionTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  });

  const getQuickActionsRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  });

  const getQuickActionStyle = (action: QuickAction): ViewStyle => ({
    width: '48%',
    backgroundColor: action.color,
    borderColor: action.borderColor,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  });

  const getActionIconStyle = (): TextStyle => ({
    fontSize: 24,
    marginBottom: 8,
  });

  const getActionTitleStyle = (): TextStyle => ({
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  });

  const getActionDescriptionStyle = (): TextStyle => ({
    fontSize: 12,
    color: '#6B7280',
  });

  const getSectionHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  });

  const getViewAllStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontWeight: '500',
  });

  const getMatchCardStyle = (): ViewStyle => ({
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 192,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  });

  const getMatchAvatarStyle = (): ViewStyle => ({
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  });

  const getMatchAvatarTextStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontSize: 18,
  });

  const getMatchNameStyle = (): TextStyle => ({
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  });

  const getMatchDepartmentStyle = (): TextStyle => ({
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  });

  const getCompatibilityBadgeStyle = (): ViewStyle => ({
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  });

  const getCompatibilityTextStyle = (): TextStyle => ({
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '500',
  });

  const getHostelCardStyle = (): ViewStyle => ({
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  });

  const getHostelRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  });

  const getHostelInfoStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getHostelNameStyle = (): TextStyle => ({
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  });

  const getHostelPriceStyle = (): TextStyle => ({
    color: '#3B82F6',
    fontWeight: 'bold',
    fontSize: 18,
  });

  const getRatingRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
  });

  const getRatingTextStyle = (): TextStyle => ({
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  });

  return (
    <ScrollView style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <View style={getHeaderRowStyle()}>
          <View>
            <Text style={getWelcomeTextStyle()}>Welcome back!</Text>
            <Text style={getSubtitleStyle()}>Find your perfect match today</Text>
          </View>
          <TouchableOpacity 
            style={getProfileButtonStyle()}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={getProfileIconStyle()}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={getSectionStyle()}>
        <Text style={getSectionTitleStyle()}>Quick Actions</Text>
        <View style={getQuickActionsRowStyle()}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={getQuickActionStyle(action)}
              onPress={action.onPress}
            >
              <Text style={getActionIconStyle()}>{action.icon}</Text>
              <Text style={getActionTitleStyle()}>{action.title}</Text>
              <Text style={getActionDescriptionStyle()}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Matches */}
      <View style={getSectionStyle()}>
        <View style={getSectionHeaderStyle()}>
          <Text style={getSectionTitleStyle()}>Recent Matches</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RoommateResults', {})}>
            <Text style={getViewAllStyle()}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={getMatchCardStyle()}
              onPress={() => navigation.navigate('Chat', { conversationId: match.id.toString(), contactName: match.name })}
            >
              <View style={getMatchAvatarStyle()}>
                <Text style={getMatchAvatarTextStyle()}>👤</Text>
              </View>
              <Text style={getMatchNameStyle()}>{match.name}</Text>
              <Text style={getMatchDepartmentStyle()}>{match.department}</Text>
              <View style={getCompatibilityBadgeStyle()}>
                <Text style={getCompatibilityTextStyle()}>{match.compatibility}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Hostels */}
      <View style={getSectionStyle()}>
        <View style={getSectionHeaderStyle()}>
          <Text style={getSectionTitleStyle()}>Featured Hostels</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HostelListing')}>
            <Text style={getViewAllStyle()}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {featuredHostels.map((hostel) => (
          <TouchableOpacity
            key={hostel.id}
            style={getHostelCardStyle()}
            onPress={() => navigation.navigate('HostelDetails', { hostelId: hostel.id.toString() })}
          >
            <View style={getHostelRowStyle()}>
              <View style={getHostelInfoStyle()}>
                <Text style={getHostelNameStyle()}>{hostel.name}</Text>
                <Text style={getHostelPriceStyle()}>{hostel.price}/month</Text>
              </View>
              <View style={getRatingRowStyle()}>
                <Text style={{ color: '#F59E0B' }}>⭐</Text>
                <Text style={getRatingTextStyle()}>{hostel.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;