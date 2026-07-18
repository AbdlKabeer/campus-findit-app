import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import Picker from '../components/Picker';

interface HostelListingScreenProps {
  navigation: NavigationProp<RootStackParamList, 'HostelListing'>;
}

interface Hostel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  roomType: string;
  available: boolean;
}

interface Filters {
  priceRange: string;
  location: string;
  amenities: string;
  roomType: string;
  rating: string;
}

interface PickerOption {
  label: string;
  value: string;
}

const HostelListingScreen: React.FC<HostelListingScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: '',
    location: '',
    amenities: '',
    roomType: '',
    rating: '',
  });

  // Mock hostel data
  const hostels: Hostel[] = [
    {
      id: '1',
      name: 'Sunrise Student Lodge',
      location: 'Akoka, Lagos',
      price: 150000,
      rating: 4.5,
      reviews: 128,
      image: 'https://via.placeholder.com/300x200',
      amenities: ['WiFi', 'AC', 'Kitchen', 'Security'],
      roomType: 'Single Room',
      available: true,
    },
    {
      id: '2',
      name: 'Elite Hostel',
      location: 'Yaba, Lagos',
      price: 200000,
      rating: 4.8,
      reviews: 95,
      image: 'https://via.placeholder.com/300x200',
      amenities: ['WiFi', 'AC', 'Gym', 'Laundry', 'Security'],
      roomType: 'Shared Room',
      available: true,
    },
    {
      id: '3',
      name: 'Campus View Hostel',
      location: 'Surulere, Lagos',
      price: 120000,
      rating: 4.2,
      reviews: 67,
      image: 'https://via.placeholder.com/300x200',
      amenities: ['WiFi', 'Kitchen', 'Study Room'],
      roomType: 'Single Room',
      available: false,
    },
    {
      id: '4',
      name: 'Modern Living Hostel',
      location: 'Ikeja, Lagos',
      price: 180000,
      rating: 4.6,
      reviews: 142,
      image: 'https://via.placeholder.com/300x200',
      amenities: ['WiFi', 'AC', 'Kitchen', 'Parking', 'Security'],
      roomType: 'Studio',
      available: true,
    },
    {
      id: '5',
      name: 'Budget Student Lodge',
      location: 'Mushin, Lagos',
      price: 80000,
      rating: 3.9,
      reviews: 89,
      image: 'https://via.placeholder.com/300x200',
      amenities: ['WiFi', 'Kitchen', 'Security'],
      roomType: 'Shared Room',
      available: true,
    },
    {
      id: '6',
      name: 'Premium Heights',
      location: 'Victoria Island, Lagos',
      price: 300000,
      rating: 4.9,
      reviews: 76,
      image: 'https://via.placeholder.com/300x200',
      amenities: ['WiFi', 'AC', 'Gym', 'Pool', 'Concierge', 'Security'],
      roomType: 'Studio',
      available: true,
    },
  ];

  const priceRanges: PickerOption[] = [
    { label: 'All Prices', value: '' },
    { label: '₦50,000 - ₦100,000', value: '50000-100000' },
    { label: '₦100,000 - ₦150,000', value: '100000-150000' },
    { label: '₦150,000 - ₦200,000', value: '150000-200000' },
    { label: '₦200,000+', value: '200000+' },
  ];

  const locations: PickerOption[] = [
    { label: 'All Locations', value: '' },
    { label: 'Akoka', value: 'Akoka' },
    { label: 'Yaba', value: 'Yaba' },
    { label: 'Surulere', value: 'Surulere' },
    { label: 'Ikeja', value: 'Ikeja' },
    { label: 'Mushin', value: 'Mushin' },
    { label: 'Victoria Island', value: 'Victoria Island' },
  ];

  const roomTypes: PickerOption[] = [
    { label: 'All Room Types', value: '' },
    { label: 'Single Room', value: 'Single Room' },
    { label: 'Shared Room', value: 'Shared Room' },
    { label: 'Studio', value: 'Studio' },
  ];

  const ratings: PickerOption[] = [
    { label: 'All Ratings', value: '' },
    { label: '4.5+ Stars', value: '4.5' },
    { label: '4.0+ Stars', value: '4.0' },
    { label: '3.5+ Stars', value: '3.5' },
  ];

  const amenitiesList: PickerOption[] = [
    { label: 'All Amenities', value: '' },
    { label: 'WiFi', value: 'WiFi' },
    { label: 'AC', value: 'AC' },
    { label: 'Kitchen', value: 'Kitchen' },
    { label: 'Gym', value: 'Gym' },
    { label: 'Security', value: 'Security' },
  ];

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}/year`;
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={i} style={getStarStyle()}>★</Text>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Text key="half" style={getStarStyle()}>☆</Text>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Text key={`empty-${i}`} style={getEmptyStarStyle()}>☆</Text>
      );
    }

    return stars;
  };

  const clearFilters = (): void => {
    setFilters({
      priceRange: '',
      location: '',
      amenities: '',
      roomType: '',
      rating: '',
    });
  };

  const renderHostelCard = ({ item }: { item: Hostel }) => (
    <TouchableOpacity
      style={getHostelCardStyle()}
      onPress={() => navigation.navigate('HostelDetails', { hostelId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        style={getHostelImageStyle()}
        resizeMode="cover"
      />
      
      <View style={getHostelContentStyle()}>
        <View style={getHostelHeaderStyle()}>
          <Text style={getHostelNameStyle()}>
            {item.name}
          </Text>
          {!item.available && (
            <View style={getUnavailableBadgeStyle()}>
              <Text style={getUnavailableBadgeTextStyle()}>Not Available</Text>
            </View>
          )}
        </View>

        <View style={getLocationRowStyle()}>
          <Text style={getLocationTextStyle()}>📍 {item.location}</Text>
        </View>

        <View style={getRatingRowStyle()}>
          <View style={getRatingContainerStyle()}>
            {renderStars(item.rating)}
            <Text style={getRatingTextStyle()}>
              {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
        </View>

        <View style={getAmenitiesRowStyle()}>
          {item.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={getAmenityTagStyle()}>
              <Text style={getAmenityTagTextStyle()}>{amenity}</Text>
            </View>
          ))}
          {item.amenities.length > 3 && (
            <View style={getMoreAmenitiesTagStyle()}>
              <Text style={getMoreAmenitiesTextStyle()}>+{item.amenities.length - 3} more</Text>
            </View>
          )}
        </View>

        <View style={getHostelFooterStyle()}>
          <View>
            <Text style={getPriceStyle()}>
              {formatPrice(item.price)}
            </Text>
            <Text style={getRoomTypeStyle()}>{item.roomType}</Text>
          </View>
          
          <TouchableOpacity
            style={getViewDetailsButtonStyle(item.available)}
            disabled={!item.available}
            onPress={() => navigation.navigate('HostelDetails', { hostelId: item.id })}
          >
            <Text style={getViewDetailsButtonTextStyle(item.available)}>
              {item.available ? 'View Details' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Style functions
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f9fafb',
  });

  const getHeaderStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  });

  const getHeaderRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  const getBackButtonTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 18,
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  });

  const getFilterButtonTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 18,
  });

  const getSearchBarStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  });

  const getResultsCountStyle = (): ViewStyle => ({
    paddingHorizontal: 16,
    paddingVertical: 8,
  });

  const getResultsCountTextStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
  });

  const getHostelCardStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    marginHorizontal: 16,
  });

  const getHostelImageStyle = (): ImageStyle => ({
    width: '100%',
    height: 192,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  });

  const getHostelContentStyle = (): ViewStyle => ({
    padding: 16,
  });

  const getHostelHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  });

  const getHostelNameStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  });

  const getUnavailableBadgeStyle = (): ViewStyle => ({
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  });

  const getUnavailableBadgeTextStyle = (): TextStyle => ({
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '500',
  });

  const getLocationRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  });

  const getLocationTextStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
  });

  const getRatingRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  });

  const getRatingContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  });

  const getRatingTextStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
    marginLeft: 4,
  });

  const getAmenitiesRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  });

  const getAmenityTagStyle = (): ViewStyle => ({
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  });

  const getAmenityTagTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 12,
  });

  const getMoreAmenitiesTagStyle = (): ViewStyle => ({
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  });

  const getMoreAmenitiesTextStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 12,
  });

  const getHostelFooterStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const getPriceStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  });

  const getRoomTypeStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
  });

  const getViewDetailsButtonStyle = (available: boolean): ViewStyle => ({
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: available ? '#2563eb' : '#d1d5db',
  });

  const getViewDetailsButtonTextStyle = (available: boolean): TextStyle => ({
    fontWeight: '500',
    color: available ? 'white' : '#6b7280',
  });

  const getModalStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: 'white',
  });

  const getModalHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  });

  const getModalCancelTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 18,
  });

  const getModalTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: '600',
  });

  const getModalClearTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 18,
  });

  const getModalContentStyle = (): ViewStyle => ({
    flex: 1,
    padding: 16,
  });

  const getModalFooterStyle = (): ViewStyle => ({
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  });

  const getStarStyle = (): TextStyle => ({
    color: '#fbbf24',
    fontSize: 14,
  });

  const getEmptyStarStyle = (): TextStyle => ({
    color: '#d1d5db',
    fontSize: 14,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <View style={getHeaderRowStyle()}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={getBackButtonTextStyle()}>← Back</Text>
          </TouchableOpacity>
          <Text style={getHeaderTitleStyle()}>Hostels</Text>
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <Text style={getFilterButtonTextStyle()}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={getSearchBarStyle()}>
        <Input
          placeholder="Search hostels by name or location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ marginBottom: 0 }}
        />
      </View>

      {/* Results Count */}
      <View style={getResultsCountStyle()}>
        <Text style={getResultsCountTextStyle()}>
          {hostels.length} hostels found
        </Text>
      </View>

      {/* Hostel List */}
      <FlatList
        data={hostels}
        renderItem={renderHostelCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={getModalStyle()}>
          <View style={getModalHeaderStyle()}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text style={getModalCancelTextStyle()}>Cancel</Text>
            </TouchableOpacity>
            <Text style={getModalTitleStyle()}>Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={getModalClearTextStyle()}>Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={getModalContentStyle()}>
            <Picker
              label="Price Range"
              placeholder="Select price range"
              options={priceRanges}
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
            />

            <Picker
              label="Location"
              placeholder="Select location"
              options={locations}
              value={filters.location}
              onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
            />

            <Picker
              label="Room Type"
              placeholder="Select room type"
              options={roomTypes}
              value={filters.roomType}
              onValueChange={(value) => setFilters(prev => ({ ...prev, roomType: value }))}
            />

            <Picker
              label="Minimum Rating"
              placeholder="Select minimum rating"
              options={ratings}
              value={filters.rating}
              onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
            />

            <Picker
              label="Amenities"
              placeholder="Select amenity"
              options={amenitiesList}
              value={filters.amenities}
              onValueChange={(value) => setFilters(prev => ({ ...prev, amenities: value }))}
            />
          </ScrollView>

          <View style={getModalFooterStyle()}>
            <Button
              title="Apply Filters"
              onPress={() => setShowFilters(false)}
              style={{ marginBottom: 0 }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default HostelListingScreen;