import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, RoommateSearchFilters, PickerOption } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import Picker from '../components/Picker';

interface RoommateSearchScreenProps {
  navigation: NavigationProp<RootStackParamList, 'RoommateSearch'>;
}

interface SimpleFilters {
  ageRange: string;
  gender: string;
  religion: string;
  department: string;
  academicLevel: string;
  budgetRange: string;
  smokingPreference: string;
  studyHabits: string;
  university: string;
}

const RoommateSearchScreen: React.FC<RoommateSearchScreenProps> = ({ navigation }) => {
  const [filters, setFilters] = useState<SimpleFilters>({
    ageRange: '',
    gender: '',
    religion: '',
    department: '',
    academicLevel: '',
    budgetRange: '',
    smokingPreference: '',
    studyHabits: '',
    university: '',
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const ageRangeOptions: PickerOption[] = [
    { label: '18-20 years', value: '18-20' },
    { label: '21-23 years', value: '21-23' },
    { label: '24-26 years', value: '24-26' },
    { label: '27+ years', value: '27+' },
  ];

  const genderOptions: PickerOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Any', value: 'any' },
  ];

  const religionOptions: PickerOption[] = [
    { label: 'Christianity', value: 'christianity' },
    { label: 'Islam', value: 'islam' },
    { label: 'Traditional', value: 'traditional' },
    { label: 'Other', value: 'other' },
    { label: 'Any', value: 'any' },
  ];

  const departmentOptions: PickerOption[] = [
    { label: 'Computer Science', value: 'computer_science' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Medicine', value: 'medicine' },
    { label: 'Law', value: 'law' },
    { label: 'Business Administration', value: 'business' },
    { label: 'Economics', value: 'economics' },
    { label: 'Psychology', value: 'psychology' },
    { label: 'Any', value: 'any' },
  ];

  const academicLevelOptions: PickerOption[] = [
    { label: '100 Level', value: '100' },
    { label: '200 Level', value: '200' },
    { label: '300 Level', value: '300' },
    { label: '400 Level', value: '400' },
    { label: '500 Level', value: '500' },
    { label: 'Postgraduate', value: 'postgraduate' },
    { label: 'Any', value: 'any' },
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

  const updateFilter = (field: keyof SimpleFilters, value: string): void => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = (): void => {
    setFilters({
      ageRange: '',
      gender: '',
      religion: '',
      department: '',
      academicLevel: '',
      budgetRange: '',
      smokingPreference: '',
      studyHabits: '',
      university: '',
    });
  };

  const convertToRoommateSearchFilters = (simpleFilters: SimpleFilters): RoommateSearchFilters => {
    // Convert simple string filters to the expected complex structure
    const ageRange = simpleFilters.ageRange ? 
      { min: parseInt(simpleFilters.ageRange.split('-')[0]) || 18, max: parseInt(simpleFilters.ageRange.split('-')[1]) || 30 } :
      { min: 18, max: 30 };
    
    const budgetRange = simpleFilters.budgetRange ?
      { min: parseInt(simpleFilters.budgetRange.split('-')[0]) || 0, max: parseInt(simpleFilters.budgetRange.split('-')[1]) || 1000000 } :
      { min: 0, max: 1000000 };

    return {
      ageRange,
      gender: (simpleFilters.gender as 'Male' | 'Female' | 'Any') || 'Any',
      religion: simpleFilters.religion,
      department: simpleFilters.department,
      academicLevel: simpleFilters.academicLevel,
      budgetRange,
      smokingPreference: simpleFilters.smokingPreference,
      studyHabits: simpleFilters.studyHabits,
      university: simpleFilters.university,
    };
  };

  const handleSearch = (): void => {
    // Convert simple filters to complex structure and navigate to results
    const convertedFilters = convertToRoommateSearchFilters(filters);
    navigation.navigate('RoommateResults', { filters: convertedFilters });
  };

  const getActiveFiltersCount = (): number => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  // Style functions
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: 'white',
  });

  const getContentStyle = (): ViewStyle => ({
    paddingHorizontal: 24,
    paddingTop: 64,
  });

  const getHeaderStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  });

  const getBackButtonStyle = (): ViewStyle => ({
    marginRight: 16,
    padding: 8,
    marginLeft: -8,
  });

  const getBackButtonTextStyle = (): TextStyle => ({
    fontSize: 24,
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  });

  const getSearchBarStyle = (): ViewStyle => ({
    marginBottom: 24,
  });

  const getQuickFiltersStyle = (): ViewStyle => ({
    marginBottom: 24,
  });

  const getQuickFiltersTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  });

  const getFilterRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
  });

  const getFilterHalfStyle = (): ViewStyle => ({
    width: '50%',
    paddingRight: 8,
  });

  const getFilterHalfRightStyle = (): ViewStyle => ({
    width: '50%',
    paddingLeft: 8,
  });

  const getAdvancedFiltersToggleStyle = (): ViewStyle => ({
    alignItems: 'center',
    marginBottom: 24,
  });

  const getAdvancedFiltersToggleTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontWeight: '500',
  });

  const getAdvancedFiltersStyle = (): ViewStyle => ({
    marginBottom: 24,
  });

  const getAdvancedFiltersTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  });

  const getActionButtonsStyle = (): ViewStyle => ({
    paddingBottom: 32,
  });

  const getSearchButtonStyle = (): ViewStyle => ({
    width: '100%',
    marginBottom: 16,
  });

  const getClearButtonStyle = (): ViewStyle => ({
    width: '100%',
  });

  const getFilterSummaryStyle = (): ViewStyle => ({
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  });

  const getFilterSummaryTitleStyle = (): TextStyle => ({
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  });

  const getFilterTagsStyle = (): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
  });

  const getFilterTagStyle = (): ViewStyle => ({
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  });

  const getFilterTagTextStyle = (): TextStyle => ({
    color: '#1d4ed8',
    fontSize: 14,
  });

  return (
    <ScrollView style={getContainerStyle()}>
      <View style={getContentStyle()}>
        {/* Header */}
        <View style={getHeaderStyle()}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={getBackButtonStyle()}
          >
            <Text style={getBackButtonTextStyle()}>←</Text>
          </TouchableOpacity>
          <Text style={getHeaderTitleStyle()}>Find Roommates</Text>
        </View>

        {/* Search Bar */}
        <Input
          placeholder="Search by name or university..."
          value={filters.university}
          onChangeText={(value) => updateFilter('university', value)}
          style={getSearchBarStyle()}
        />

        {/* Quick Filters */}
        <View style={getQuickFiltersStyle()}>
          <Text style={getQuickFiltersTitleStyle()}>Quick Filters</Text>
          
          <View style={getFilterRowStyle()}>
            <View style={getFilterHalfStyle()}>
              <Picker
                label="Gender"
                placeholder="Any gender"
                value={filters.gender}
                onValueChange={(value) => updateFilter('gender', value)}
                options={genderOptions}
              />
            </View>
            <View style={getFilterHalfRightStyle()}>
              <Picker
                label="Age Range"
                placeholder="Any age"
                value={filters.ageRange}
                onValueChange={(value) => updateFilter('ageRange', value)}
                options={ageRangeOptions}
              />
            </View>
          </View>

          <Picker
            label="Budget Range"
            placeholder="Any budget"
            value={filters.budgetRange}
            onValueChange={(value) => updateFilter('budgetRange', value)}
            options={budgetOptions}
          />
        </View>

        {/* Advanced Filters Toggle */}
        <TouchableOpacity
          style={getAdvancedFiltersToggleStyle()}
          onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Text style={getAdvancedFiltersToggleTextStyle()}>
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </Text>
        </TouchableOpacity>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <View style={getAdvancedFiltersStyle()}>
            <Text style={getAdvancedFiltersTitleStyle()}>Advanced Filters</Text>
            
            <Picker
              label="Religion"
              placeholder="Any religion"
              value={filters.religion}
              onValueChange={(value) => updateFilter('religion', value)}
              options={religionOptions}
            />

            <View style={getFilterRowStyle()}>
              <View style={getFilterHalfStyle()}>
                <Picker
                  label="Department"
                  placeholder="Any department"
                  value={filters.department}
                  onValueChange={(value) => updateFilter('department', value)}
                  options={departmentOptions}
                />
              </View>
              <View style={getFilterHalfRightStyle()}>
                <Picker
                  label="Academic Level"
                  placeholder="Any level"
                  value={filters.academicLevel}
                  onValueChange={(value) => updateFilter('academicLevel', value)}
                  options={academicLevelOptions}
                />
              </View>
            </View>

            <Picker
              label="Smoking Preference"
              placeholder="No preference"
              value={filters.smokingPreference}
              onValueChange={(value) => updateFilter('smokingPreference', value)}
              options={smokingOptions}
            />

            <Picker
              label="Study Habits"
              placeholder="No preference"
              value={filters.studyHabits}
              onValueChange={(value) => updateFilter('studyHabits', value)}
              options={studyHabitsOptions}
            />
          </View>
        )}

        {/* Action Buttons */}
        <View style={getActionButtonsStyle()}>
          <Button
            title="Search Roommates"
            onPress={handleSearch}
            size="large"
            style={getSearchButtonStyle()}
          />
          
          {getActiveFiltersCount() > 0 && (
            <Button
              title="Clear All Filters"
              variant="outline"
              onPress={clearFilters}
              size="large"
              style={getClearButtonStyle()}
            />
          )}
        </View>

        {/* Filter Summary */}
        {getActiveFiltersCount() > 0 && (
          <View style={getFilterSummaryStyle()}>
            <Text style={getFilterSummaryTitleStyle()}>
              Active Filters ({getActiveFiltersCount()})
            </Text>
            <View style={getFilterTagsStyle()}>
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                return (
                  <View key={key} style={getFilterTagStyle()}>
                    <Text style={getFilterTagTextStyle()}>{value}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RoommateSearchScreen;