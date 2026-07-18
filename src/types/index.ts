// User and Profile Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  bio?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  religion: string;
  university: string;
  department: string;
  academicLevel: 'Undergraduate' | 'Graduate' | 'PhD';
  createdAt: Date;
  updatedAt: Date;
}

export interface RoommatePreferences {
  budgetMin: number;
  budgetMax: number;
  preferredGender: 'Male' | 'Female' | 'No Preference';
  preferredReligion: string;
  smokingPreference: 'Non-smoker' | 'Smoker' | 'No Preference';
  studyHabits: 'Quiet' | 'Social' | 'Flexible';
}

export interface UserProfile extends User {
  roommatePreferences: RoommatePreferences;
}

// Hostel Types
export interface Hostel {
  id: string;
  name: string;
  location: string;
  description: string;
  images: string[];
  pricePerMonth: number;
  rating: number;
  totalReviews: number;
  amenities: string[];
  rules: string[];
  nearbyPlaces: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  availableRooms: number;
  roomTypes: RoomType[];
}

export interface RoomType {
  type: string;
  price: number;
  capacity: number;
  available: number;
}

export interface HostelReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

export interface ChatConversation {
  id: string;
  participants: User[];
  lastMessage: ChatMessage;
  unreadCount: number;
  updatedAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSetup: undefined;
  Home: undefined;
  RoommateSearch: undefined;
  RoommateResults: {
    filters?: RoommateSearchFilters;
  };
  HostelListing: undefined;
  HostelDetails: {
    hostelId: string;
  };
  Chat: {
    conversationId: string;
    contactName: string;
  };
  Settings: undefined;
  PersonalInfo: undefined;
  ChangePassword: undefined;
  LocationSettings: undefined;
  HelpCenter: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  ContactUs: undefined;
  LivenessCheck: {
    onComplete?: () => void;
    nextScreen?: keyof RootStackParamList;
  };
  ForgotPassword: undefined;
};

// Filter Types
export interface RoommateSearchFilters {
  ageRange: {
    min: number;
    max: number;
  };
  gender: 'Male' | 'Female' | 'Any';
  religion: string;
  department: string;
  academicLevel: string;
  budgetRange: {
    min: number;
    max: number;
  };
  smokingPreference: string;
  studyHabits: string;
  university: string;
}

export interface HostelSearchFilters {
  priceRange: {
    min: number;
    max: number;
  };
  location: string;
  roomType: string;
  minRating: number;
  amenities: string[];
}

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  style?: any;
}

export interface PickerProps {
  label?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: PickerOption[];
  error?: string;
  style?: any;
}

export interface PickerOption {
  label: string;
  value: string;
}

// Form Data Types
export interface FormErrors {
  [key: string]: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileSetupFormData {
  age: string;
  gender: string;
  religion: string;
  bio: string;
  university: string;
  department: string;
  academicLevel: string;
  budgetMin: string;
  budgetMax: string;
  preferredGender: string;
  preferredReligion: string;
  smokingPreference: string;
  studyHabits: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}