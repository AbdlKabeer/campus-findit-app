import React from 'react';
import { View, Text, TextInput, ViewStyle, TextStyle } from 'react-native';
import { InputProps } from '../types';

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error,
  style
}) => {
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

  const getInputStyle = (): TextStyle & ViewStyle => ({
    borderWidth: 1,
    borderColor: error ? '#EF4444' : '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: multiline ? 16 : 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#374151',
    textAlignVertical: multiline ? 'top' : 'center',
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
  });

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}
      <TextInput
        style={getInputStyle()}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && (
        <Text style={getErrorStyle()}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;