# FindIt - Student Roommate & Hostel Finder

FindIt is a React Native application that connects students looking for roommates and available hostels. The app features a modern, clean UI built with Tailwind CSS and includes comprehensive functionality for student accommodation needs.

## Features

- **Onboarding Experience**: Multi-slide introduction to app features
- **Authentication**: Login and signup with form validation
- **Profile Setup**: Comprehensive user profile with preferences (budget, religion, gender, age, academic level, department)
- **Roommate Search**: Advanced search and filtering capabilities
- **Roommate Matching**: Display matched roommates with compatibility scores
- **Hostel Listings**: Browse hostels with search and filter options
- **Hostel Details**: Detailed hostel information with image galleries, amenities, and reviews
- **Chat System**: Real-time messaging between users
- **Settings & Account Management**: Comprehensive settings with privacy controls

## Tech Stack

- **React Native**: Mobile app framework
- **NativeWind**: Tailwind CSS for React Native
- **React Navigation**: Navigation library
- **React Native Safe Area Context**: Safe area handling
- **React Native SVG**: SVG support

## Project Structure

```
findit/
├── src/
│   ├── components/
│   │   ├── Button.js          # Reusable button component
│   │   ├── Input.js           # Reusable input component
│   │   └── Picker.js          # Reusable picker/dropdown component
│   └── screens/
│       ├── OnboardingScreen.js    # App introduction slides
│       ├── LoginScreen.js         # User login
│       ├── SignupScreen.js        # User registration
│       ├── ProfileSetupScreen.js  # Profile and preferences setup
│       ├── HomeScreen.js          # Main dashboard
│       ├── RoommateSearchScreen.js # Roommate search and filters
│       ├── RoommateResultsScreen.js # Matched roommates display
│       ├── HostelListingScreen.js  # Hostel listings with filters
│       ├── HostelDetailsScreen.js  # Detailed hostel view
│       ├── ChatScreen.js          # Messaging interface
│       └── SettingsScreen.js      # Settings and account management
├── App.js                     # Main app component with navigation
├── index.js                   # App entry point
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── babel.config.js           # Babel configuration for NativeWind
├── metro.config.js           # Metro bundler configuration
└── app.json                  # React Native app configuration
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd /Users/olakay/Desktop/dev/findit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the Metro bundler**:
   ```bash
   npm start
   ```

5. **Run the app**:
   
   For iOS:
   ```bash
   npm run ios
   ```
   
   For Android:
   ```bash
   npm run android
   ```

## Key Features & Screens

### 1. Onboarding
- Multi-slide introduction with app features
- Skip functionality and navigation controls
- Modern UI with pagination indicators

### 2. Authentication
- **Login**: Email/password with validation and social login options
- **Signup**: Comprehensive registration form with validation

### 3. Profile Setup
- Multi-step profile creation
- Personal information (age, gender, religion, bio)
- Academic information (university, department, level)
- Roommate preferences (budget, preferences, habits)

### 4. Home Dashboard
- Quick action buttons
- Recent matches display
- Featured hostels section

### 5. Roommate Features
- **Search**: Advanced filtering by multiple criteria
- **Results**: Compatibility-based matching with detailed profiles
- **Connect**: Direct messaging and connection features

### 6. Hostel Features
- **Listings**: Search and filter hostels by price, location, amenities
- **Details**: Comprehensive hostel information with image galleries
- **Booking**: Contact and booking functionality

### 7. Chat System
- Real-time messaging interface
- Message status indicators (sent, delivered, read)
- Quick action buttons for common tasks

### 8. Settings
- Account management
- Privacy and notification controls
- App preferences and support options

## Design Features

- **Currency**: All prices displayed in Nigerian Naira (₦)
- **Responsive Design**: Mobile-first, clean and modern interface
- **Accessibility**: Proper contrast ratios and touch targets
- **Consistent Styling**: Unified color scheme and typography
- **Interactive Elements**: Smooth animations and feedback

## Color Scheme

- **Primary**: Blue (#2563EB)
- **Secondary**: Purple (#7C3AED)
- **Accent**: Green (#059669)
- **Background**: Gray (#F9FAFB)
- **Text**: Dark Gray (#111827)

## Mock Data

The app includes comprehensive mock data for:
- User profiles with realistic student information
- Hostel listings with Nigerian locations and pricing
- Chat conversations with realistic messaging scenarios
- Reviews and ratings for hostels

## Development Notes

- All screens are fully functional with navigation
- Form validation implemented for user inputs
- Responsive design for various screen sizes
- Placeholder images used for development
- Ready for backend integration

## Future Enhancements

- Backend API integration
- Real-time chat functionality
- Push notifications
- Payment integration
- Map integration for location services
- Advanced matching algorithms

## Support

For questions or support, please contact the development team or refer to the in-app help center.

---

**Note**: This is a UI prototype with mock data. Backend integration and real-time features would require additional development.