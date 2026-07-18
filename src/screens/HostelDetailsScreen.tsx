import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

interface HostelDetailsScreenProps {
  navigation: NavigationProp<RootStackParamList, 'HostelDetails'>;
  route: RouteProp<RootStackParamList, 'HostelDetails'>;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

interface NearbyPlace {
  name: string;
  distance: string;
  type: string;
}

interface Contact {
  phone: string;
  email: string;
  address: string;
}

interface HostelData {
  id: string;
  name: string;
  price: number;
  roomType: string;
  rating: number;
  available: boolean;
  images: string[];
  description: string;
  fullAmenities: string[];
  rules: string[];
  contact: Contact;
  reviews: Review[];
  nearbyPlaces: NearbyPlace[];
}

const HostelDetailsScreen: React.FC<HostelDetailsScreenProps> = ({ navigation, route }) => {
  const { hostelId } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  // Mock hostel data - in a real app, this would be fetched based on hostelId
  const hostelData: HostelData = {
    id: hostelId,
    name: 'Sunrise Student Lodge',
    price: 150000,
    roomType: 'Single Room',
    rating: 4.5,
    available: true,
    images: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
    ],
    description: 'A modern and comfortable student accommodation located in the heart of the city. Perfect for students looking for a safe, clean, and affordable place to stay during their academic journey.',
    fullAmenities: [
      'High-Speed WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      '24/7 Security',
      'Laundry Service',
      'Study Rooms',
      'Common Area',
      'Parking Space',
      'Gym Access',
      'Cleaning Service',
      'CCTV Surveillance',
      'Generator Backup',
    ],
    rules: [
      'No smoking in rooms',
      'Quiet hours: 10 PM - 6 AM',
      'No overnight guests without permission',
      'Keep common areas clean',
      'Respect other residents',
    ],
    contact: {
      phone: '+234 801 234 5678',
      email: 'info@sunrisestudentlodge.com',
      address: '123 University Road, Akoka, Lagos',
    },
    reviews: [
      {
        id: '1',
        name: 'Adebayo Johnson',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent hostel with great facilities. The WiFi is fast and the security is top-notch. Highly recommended!',
        avatar: 'https://via.placeholder.com/40x40',
      },
      {
        id: '2',
        name: 'Fatima Ahmed',
        rating: 4,
        date: '1 month ago',
        comment: 'Good value for money. The kitchen is well-equipped and the location is convenient for campus.',
        avatar: 'https://via.placeholder.com/40x40',
      },
      {
        id: '3',
        name: 'Chidi Okafor',
        rating: 5,
        date: '2 months ago',
        comment: 'Clean, safe, and affordable. The management is very responsive to any issues.',
        avatar: 'https://via.placeholder.com/40x40',
      },
      {
        id: '4',
        name: 'Blessing Eze',
        rating: 4,
        date: '3 months ago',
        comment: 'Great place to stay. The study rooms are quiet and perfect for reading.',
        avatar: 'https://via.placeholder.com/40x40',
      },
    ],
    nearbyPlaces: [
      { name: 'University of Lagos', distance: '0.5 km', type: 'University' },
      { name: 'Shoprite Mall', distance: '1.2 km', type: 'Shopping' },
      { name: 'First Bank', distance: '0.3 km', type: 'Bank' },
      { name: 'General Hospital', distance: '2.1 km', type: 'Hospital' },
    ],
  };

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}`;
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

  const renderImageItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        setCurrentImageIndex(index);
        setShowImageGallery(true);
      }}
    >
      <Image
        source={{ uri: item }}
        style={getImageItemStyle()}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={getReviewItemStyle()}>
      <View style={getReviewHeaderStyle()}>
        <Image
          source={{ uri: item.avatar }}
          style={getReviewAvatarStyle()}
        />
        <View style={getReviewInfoStyle()}>
          <Text style={getReviewNameStyle()}>{item.name}</Text>
          <View style={getReviewRatingStyle()}>
            {renderStars(item.rating)}
            <Text style={getReviewDateStyle()}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={getReviewCommentStyle()}>{item.comment}</Text>
    </View>
  );

  // Style functions
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f5f5f5',
  });

  const getScrollViewStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getHeaderImageStyle = (): ImageStyle => ({
    width: '100%',
    height: 250,
  });

  const getBackButtonStyle = (): ViewStyle => ({
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  });

  const getBackButtonTextStyle = (): TextStyle => ({
    color: 'white',
    fontSize: 18,
  });

  const getImageCountStyle = (): ViewStyle => ({
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  });

  const getImageCountTextStyle = (): TextStyle => ({
    color: 'white',
    fontSize: 12,
  });

  const getContentStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  });

  const getHostelNameStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  });

  const getRatingContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  });

  const getRatingTextStyle = (): TextStyle => ({
    marginLeft: 8,
    color: '#6b7280',
    fontSize: 16,
  });

  const getDescriptionStyle = (): TextStyle => ({
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
  });

  const getImageGalleryStyle = (): ViewStyle => ({
    marginBottom: 16,
  });

  const getImageGalleryTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  });

  const getPriceContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const getPriceStyle = (): TextStyle => ({
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563eb',
  });

  const getRoomTypeStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 16,
  });

  const getSectionStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  });

  const getSectionTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  });

  const getAmenitiesContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
  });

  const getAmenityItemStyle = (): ViewStyle => ({
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  });

  const getAmenityTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 14,
  });

  const getShowMoreButtonStyle = (): ViewStyle => ({
    marginTop: 8,
  });

  const getShowMoreTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontWeight: '500',
  });

  const getNearbyPlaceItemStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  });

  const getNearbyPlaceInfoStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getNearbyPlaceNameStyle = (): TextStyle => ({
    fontWeight: '500',
    color: '#1f2937',
  });

  const getNearbyPlaceTypeStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
  });

  const getNearbyPlaceDistanceStyle = (): TextStyle => ({
    color: '#2563eb',
    fontWeight: '500',
  });

  const getRuleItemStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  });

  const getRuleBulletStyle = (): TextStyle => ({
    color: '#2563eb',
    marginRight: 8,
  });

  const getRuleTextStyle = (): TextStyle => ({
    color: '#374151',
    flex: 1,
  });

  const getReviewHeaderContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  });

  const getReviewItemStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  });

  const getReviewHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  });

  const getReviewAvatarStyle = (): ImageStyle => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  });

  const getReviewInfoStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getReviewNameStyle = (): TextStyle => ({
    fontWeight: '600',
    color: '#1f2937',
  });

  const getReviewRatingStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
  });

  const getReviewDateStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 14,
    marginLeft: 8,
  });

  const getReviewCommentStyle = (): TextStyle => ({
    color: '#374151',
    lineHeight: 20,
  });

  const getContactItemStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  });

  const getContactIconStyle = (): TextStyle => ({
    marginRight: 8,
    color: '#6b7280',
  });

  const getContactTextStyle = (): TextStyle => ({
    color: '#374151',
  });

  const getContactAddressStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'flex-start',
  });

  const getContactAddressTextStyle = (): TextStyle => ({
    color: '#374151',
    flex: 1,
  });

  const getSpacerStyle = (): ViewStyle => ({
    height: 80,
  });

  const getBottomActionsStyle = (): ViewStyle => ({
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  });

  const getBottomButtonsStyle = (): ViewStyle => ({
    flexDirection: 'row',
    gap: 12,
  });

  const getContactButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
  });

  const getContactButtonTextStyle = (): TextStyle => ({
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
  });

  const getBookButtonStyle = (available: boolean): ViewStyle => ({
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: available ? '#2563eb' : '#d1d5db',
  });

  const getBookButtonTextStyle = (available: boolean): TextStyle => ({
    textAlign: 'center',
    fontWeight: '600',
    color: available ? 'white' : '#6b7280',
  });

  const getModalStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: 'black',
  });

  const getModalHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  });

  const getModalCloseStyle = (): TextStyle => ({
    color: 'white',
    fontSize: 18,
  });

  const getModalCounterStyle = (): TextStyle => ({
    color: 'white',
    fontSize: 18,
  });

  const getModalImageStyle = (): ImageStyle => ({
    width,
    height: width * 0.75,
  });

  const getStarStyle = (): TextStyle => ({
    color: '#fbbf24',
    fontSize: 18,
  });

  const getEmptyStarStyle = (): TextStyle => ({
    color: '#d1d5db',
    fontSize: 18,
  });

  const getImageItemStyle = (): ImageStyle => ({
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  });

  return (
    <SafeAreaView style={getContainerStyle()}>
      <ScrollView style={getScrollViewStyle()}>
        {/* Header Image */}
        <View>
          <Image
            source={{ uri: hostelData.images[0] }}
            style={getHeaderImageStyle()}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={getBackButtonStyle()}
            onPress={() => navigation.goBack()}
          >
            <Text style={getBackButtonTextStyle()}>←</Text>
          </TouchableOpacity>
          <View style={getImageCountStyle()}>
            <Text style={getImageCountTextStyle()}>
              1/{hostelData.images.length}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={getContentStyle()}>
          <Text style={getHostelNameStyle()}>{hostelData.name}</Text>
          
          <View style={getRatingContainerStyle()}>
            {renderStars(hostelData.rating)}
            <Text style={getRatingTextStyle()}>
              {hostelData.rating} ({hostelData.reviews.length} reviews)
            </Text>
          </View>

          <Text style={getDescriptionStyle()}>
            {hostelData.description}
          </Text>

          {/* Image Gallery */}
          <View style={getImageGalleryStyle()}>
            <Text style={getImageGalleryTitleStyle()}>Photos</Text>
            <FlatList
              data={hostelData.images}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Price */}
          <View style={getPriceContainerStyle()}>
            <View>
              <Text style={getPriceStyle()}>
                {formatPrice(hostelData.price)}
              </Text>
              <Text style={getRoomTypeStyle()}>{hostelData.roomType} / year</Text>
            </View>
          </View>
        </View>

        {/* Amenities */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Amenities</Text>
          <View style={getAmenitiesContainerStyle()}>
            {(showAllAmenities ? hostelData.fullAmenities : hostelData.fullAmenities.slice(0, 6)).map((amenity, index) => (
              <View key={index} style={getAmenityItemStyle()}>
                <Text style={getAmenityTextStyle()}>{amenity}</Text>
              </View>
            ))}
          </View>
          {hostelData.fullAmenities.length > 6 && (
            <TouchableOpacity
              onPress={() => setShowAllAmenities(!showAllAmenities)}
              style={getShowMoreButtonStyle()}
            >
              <Text style={getShowMoreTextStyle()}>
                {showAllAmenities ? 'Show Less' : `Show All ${hostelData.fullAmenities.length} Amenities`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Nearby Places */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Nearby Places</Text>
          {hostelData.nearbyPlaces.map((place, index) => (
            <View key={index} style={getNearbyPlaceItemStyle()}>
              <View style={getNearbyPlaceInfoStyle()}>
                <Text style={getNearbyPlaceNameStyle()}>{place.name}</Text>
                <Text style={getNearbyPlaceTypeStyle()}>{place.type}</Text>
              </View>
              <Text style={getNearbyPlaceDistanceStyle()}>{place.distance}</Text>
            </View>
          ))}
        </View>

        {/* Rules */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>House Rules</Text>
          {hostelData.rules.map((rule, index) => (
            <View key={index} style={getRuleItemStyle()}>
              <Text style={getRuleBulletStyle()}>•</Text>
              <Text style={getRuleTextStyle()}>{rule}</Text>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View style={getSectionStyle()}>
          <View style={getReviewHeaderContainerStyle()}>
            <Text style={getSectionTitleStyle()}>Reviews</Text>
            <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)}>
              <Text style={getShowMoreTextStyle()}>
                {showAllReviews ? 'Show Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={showAllReviews ? hostelData.reviews : hostelData.reviews.slice(0, 2)}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Contact Info */}
        <View style={getSectionStyle()}>
          <Text style={getSectionTitleStyle()}>Contact Information</Text>
          <View>
            <View style={getContactItemStyle()}>
              <Text style={getContactIconStyle()}>📞</Text>
              <Text style={getContactTextStyle()}>{hostelData.contact.phone}</Text>
            </View>
            <View style={getContactItemStyle()}>
              <Text style={getContactIconStyle()}>✉️</Text>
              <Text style={getContactTextStyle()}>{hostelData.contact.email}</Text>
            </View>
            <View style={getContactAddressStyle()}>
              <Text style={getContactIconStyle()}>📍</Text>
              <Text style={getContactAddressTextStyle()}>{hostelData.contact.address}</Text>
            </View>
          </View>
        </View>

        <View style={getSpacerStyle()} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={getBottomActionsStyle()}>
        <View style={getBottomButtonsStyle()}>
          <TouchableOpacity style={getContactButtonStyle()}>
            <Text style={getContactButtonTextStyle()}>Contact Host</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getBookButtonStyle(hostelData.available)}
            disabled={!hostelData.available}
          >
            <Text style={getBookButtonTextStyle(hostelData.available)}>
              {hostelData.available ? 'Book Now' : 'Not Available'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Gallery Modal */}
      <Modal
        visible={showImageGallery}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={getModalStyle()}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={getModalHeaderStyle()}>
              <TouchableOpacity onPress={() => setShowImageGallery(false)}>
                <Text style={getModalCloseStyle()}>✕</Text>
              </TouchableOpacity>
              <Text style={getModalCounterStyle()}>
                {currentImageIndex + 1} / {hostelData.images.length}
              </Text>
              <View />
            </View>
            
            <FlatList
              data={hostelData.images}
              horizontal
              pagingEnabled
              initialScrollIndex={currentImageIndex}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentImageIndex(index);
              }}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={getModalImageStyle()}
                  resizeMode="contain"
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HostelDetailsScreen;