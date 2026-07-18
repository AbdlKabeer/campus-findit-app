import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, ProfileSetupFormData, FormErrors, PickerOption } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import Picker from '../components/Picker';

interface ProfileSetupScreenProps {
  navigation: NavigationProp<RootStackParamList, 'ProfileSetup'>;
}

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ProfileSetupFormData>({
    // Personal Info
    age: '',
    gender: '',
    religion: '',
    bio: '',
    
    // Academic Info
    university: '',
    department: '',
    academicLevel: '',
    
    // Preferences
    budgetMin: '',
    budgetMax: '',
    preferredGender: '',
    preferredReligion: '',
    smokingPreference: '',
    studyHabits: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const genderOptions: PickerOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Prefer not to say', value: 'other' },
  ];

  const religionOptions: PickerOption[] = [
    { label: 'Christianity', value: 'christianity' },
    { label: 'Islam', value: 'islam' },
    { label: 'Traditional', value: 'traditional' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'none' },
  ];

  const academicLevelOptions: PickerOption[] = [
    { label: '100 Level', value: '100' },
    { label: '200 Level', value: '200' },
    { label: '300 Level', value: '300' },
    { label: '400 Level', value: '400' },
    { label: '500 Level', value: '500' },
    { label: 'Postgraduate', value: 'postgraduate' },
  ];

  const departmentOptions: PickerOption[] = [
    { label: 'Computer Science', value: 'computer_science' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Medicine', value: 'medicine' },
    { label: 'Law', value: 'law' },
    { label: 'Business Administration', value: 'business' },
    { label: 'Economics', value: 'economics' },
    { label: 'Psychology', value: 'psychology' },
    { label: 'Other', value: 'other' },
  ];

  const budgetOptions: PickerOption[] = [
    { label: '₦20,000 - ₦50,000', value: '20000-50000' },
    { label: '₦50,000 - ₦100,000', value: '50000-100000' },
    { label: '₦100,000 - ₦200,000', value: '100000-200000' },
    { label: '₦200,000 - ₦300,000', value: '200000-300000' },
    { label: '₦300,000+', value: '300000+' },
  ];

  const smokingOptions: PickerOption[] = [
    { label: 'Non-smoker', value: 'non_smoker' },
    { label: 'Occasional smoker', value: 'occasional' },
    { label: 'Regular smoker', value: 'regular' },
    { label: 'No preference', value: 'no_preference' },
  ];

  const studyHabitsOptions: PickerOption[] = [
    { label: 'Very quiet', value: 'very_quiet' },
    { label: 'Moderately quiet', value: 'moderate' },
    { label: 'Social studier', value: 'social' },
    { label: 'No preference', value: 'no_preference' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.age) newErrors.age = 'Age is required';
      else if (parseInt(formData.age) < 16 || parseInt(formData.age) > 50) {
        newErrors.age = 'Age must be between 16 and 50';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.religion) newErrors.religion = 'Religion is required';
    }

    if (step === 2) {
      if (!formData.university.trim()) newErrors.university = 'University is required';
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.academicLevel) newErrors.academicLevel = 'Academic level is required';
    }

    if (step === 3) {
      if (!formData.budgetMin) newErrors.budgetMin = 'Budget range is required';
      if (!formData.preferredGender) newErrors.preferredGender = 'Gender preference is required';
      if (!formData.smokingPreference) newErrors.smokingPreference = 'Smoking preference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Profile Setup Complete!', 
        'Now let\'s verify your identity with a quick liveness check for enhanced security.',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('LivenessCheck', {
              nextScreen: 'Home',
              onComplete: () => {
                Alert.alert('Welcome!', 'Your account is now fully set up and verified.');
              }
            })
          }
        ]
      );
    }, 2000);
  };

  const updateFormData = (field: keyof ProfileSetupFormData, value: string): void => {
    setFormData((prev: ProfileSetupFormData) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: '' }));
    }
  };

  // Style functions
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#FFFFFF',
  });

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
  });

  const getHeaderContainerStyle = (): ViewStyle => ({
    alignItems: 'center',
    marginBottom: 32,
  });

  const getTitleStyle = (): TextStyle => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 8,
  });

  const getStepTextStyle = (): TextStyle => ({
    color: '#6B7280',
  });

  const getProgressContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    marginBottom: 32,
  });

  const getProgressStepStyle = (): ViewStyle => ({
    flex: 1,
    marginHorizontal: 4,
  });

  const getProgressBarStyle = (step: number): ViewStyle => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: step <= currentStep ? '#3B82F6' : '#E5E7EB',
  });

  const getFormContentStyle = (): ViewStyle => ({
    marginBottom: 32,
  });

  const getStepTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  });

  const getNavigationStyle = (): ViewStyle => ({
    paddingBottom: 32,
  });

  const getButtonStyle = (): ViewStyle => ({
    width: '100%',
    marginBottom: 16,
  });

  const getPreviousButtonStyle = (): ViewStyle => ({
    width: '100%',
  });

  const renderStep1 = (): JSX.Element => (
    <View>
      <Text style={getStepTitleStyle()}>Personal Information</Text>
      
      <Input
        label="Age"
        placeholder="Enter your age"
        value={formData.age}
        onChangeText={(value) => updateFormData('age', value)}
        keyboardType="numeric"
        error={errors.age}
      />

      <Picker
        label="Gender"
        placeholder="Select your gender"
        value={formData.gender}
        onValueChange={(value) => updateFormData('gender', value)}
        options={genderOptions}
        error={errors.gender}
      />

      <Picker
        label="Religion"
        placeholder="Select your religion"
        value={formData.religion}
        onValueChange={(value) => updateFormData('religion', value)}
        options={religionOptions}
        error={errors.religion}
      />

      <Input
        label="Bio (Optional)"
        placeholder="Tell us about yourself"
        value={formData.bio}
        onChangeText={(value) => updateFormData('bio', value)}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const renderStep2 = (): JSX.Element => (
    <View>
      <Text style={getStepTitleStyle()}>Academic Information</Text>
      
      <Input
        label="University"
        placeholder="Enter your university name"
        value={formData.university}
        onChangeText={(value) => updateFormData('university', value)}
        error={errors.university}
      />

      <Picker
        label="Department"
        placeholder="Select your department"
        value={formData.department}
        onValueChange={(value) => updateFormData('department', value)}
        options={departmentOptions}
        error={errors.department}
      />

      <Picker
        label="Academic Level"
        placeholder="Select your level"
        value={formData.academicLevel}
        onValueChange={(value) => updateFormData('academicLevel', value)}
        options={academicLevelOptions}
        error={errors.academicLevel}
      />
    </View>
  );

  const renderStep3 = (): JSX.Element => (
    <View>
      <Text style={getStepTitleStyle()}>Roommate Preferences</Text>
      
      <Picker
        label="Budget Range"
        placeholder="Select your budget range"
        value={formData.budgetMin}
        onValueChange={(value) => updateFormData('budgetMin', value)}
        options={budgetOptions}
        error={errors.budgetMin}
      />

      <Picker
        label="Preferred Roommate Gender"
        placeholder="Select gender preference"
        value={formData.preferredGender}
        onValueChange={(value) => updateFormData('preferredGender', value)}
        options={[...genderOptions, { label: 'No preference', value: 'no_preference' }]}
        error={errors.preferredGender}
      />

      <Picker
        label="Preferred Roommate Religion"
        placeholder="Select religion preference"
        value={formData.preferredReligion}
        onValueChange={(value) => updateFormData('preferredReligion', value)}
        options={[...religionOptions, { label: 'No preference', value: 'no_preference' }]}
      />

      <Picker
        label="Smoking Preference"
        placeholder="Select smoking preference"
        value={formData.smokingPreference}
        onValueChange={(value) => updateFormData('smokingPreference', value)}
        options={smokingOptions}
        error={errors.smokingPreference}
      />

      <Picker
        label="Study Habits"
        placeholder="Select study habits"
        value={formData.studyHabits}
        onValueChange={(value) => updateFormData('studyHabits', value)}
        options={studyHabitsOptions}
      />
    </View>
  );

  return (
    <ScrollView style={getContainerStyle()}>
      <View style={getContentStyle()}>
        {/* Header */}
        <View style={getHeaderContainerStyle()}>
          <Text style={getTitleStyle()}>Profile Setup</Text>
          <Text style={getStepTextStyle()}>Step {currentStep} of 3</Text>
        </View>

        {/* Progress Bar */}
        <View style={getProgressContainerStyle()}>
          {[1, 2, 3].map((step) => (
            <View key={step} style={getProgressStepStyle()}>
              <View style={getProgressBarStyle(step)} />
            </View>
          ))}
        </View>

        {/* Form Content */}
        <View style={getFormContentStyle()}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </View>

        {/* Navigation Buttons */}
        <View style={getNavigationStyle()}>
          <Button
            title={currentStep === 3 ? (loading ? "Completing..." : "Complete Setup") : "Next"}
            onPress={handleNext}
            disabled={loading}
            size="large"
            style={getButtonStyle()}
          />
          
          {currentStep > 1 && (
            <Button
              title="Previous"
              variant="outline"
              onPress={() => setCurrentStep(currentStep - 1)}
              size="large"
              style={getPreviousButtonStyle()}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSetupScreen;