import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, ViewStyle, TextStyle } from 'react-native';
import { PickerProps, PickerOption } from '../types';

const Picker: React.FC<PickerProps> = ({
  label,
  placeholder,
  value,
  onValueChange,
  options,
  error,
  style
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: 16,
    ...(style as ViewStyle),
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  });

  const getPickerButtonStyle = (): ViewStyle => ({
    borderWidth: 1,
    borderColor: error ? '#EF4444' : '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const getPickerTextStyle = (): TextStyle => ({
    fontSize: 16,
    color: value ? '#374151' : '#9CA3AF',
  });

  const getModalStyle = (): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  });

  const getModalContentStyle = (): ViewStyle => ({
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxHeight: '70%',
    width: '90%',
  });

  const getModalTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  });

  const getOptionButtonStyle = (): ViewStyle => ({
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  });

  const getOptionTextStyle = (isSelected: boolean): TextStyle => ({
    fontSize: 16,
    color: isSelected ? '#3B82F6' : '#374151',
    fontWeight: isSelected ? '600' : 'normal',
  });

  const getCancelButtonStyle = (): ViewStyle => ({
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  });

  const getCancelTextStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
  });

  const selectedOption = options.find(option => option.value === value);

  const handleOptionSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setModalVisible(false);
  };

  const renderOption = ({ item }: { item: PickerOption }) => (
    <TouchableOpacity
      style={getOptionButtonStyle()}
      onPress={() => handleOptionSelect(item.value)}
    >
      <Text style={getOptionTextStyle(item.value === value)}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        style={getPickerButtonStyle()}
        onPress={() => setModalVisible(true)}
      >
        <Text style={getPickerTextStyle()}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={{ fontSize: 16, color: '#9CA3AF' }}>▼</Text>
      </TouchableOpacity>

      {error && (
        <Text style={getErrorStyle()}>
          {error}
        </Text>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={getModalStyle()}>
          <View style={getModalContentStyle()}>
            <Text style={getModalTitleStyle()}>
              {label || 'Select an option'}
            </Text>
            
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity
              style={getCancelButtonStyle()}
              onPress={() => setModalVisible(false)}
            >
              <Text style={getCancelTextStyle()}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Picker;