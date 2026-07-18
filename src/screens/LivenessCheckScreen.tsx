import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface LivenessCheckScreenProps {
  navigation: NavigationProp<RootStackParamList, 'LivenessCheck'>;
  route?: {
    params?: {
      onComplete?: () => void;
      nextScreen?: keyof RootStackParamList;
    };
  };
}

interface LivenessStep {
  id: string;
  title: string;
  instruction: string;
  completed: boolean;
  icon: string;
}

const LivenessCheckScreen: React.FC<LivenessCheckScreenProps> = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [livenessSteps, setLivenessSteps] = useState<LivenessStep[]>([
    {
      id: 'face_detection',
      title: 'Face Detection',
      instruction: 'Position your face in the center of the frame',
      completed: false,
      icon: '👤',
    },
    {
      id: 'blink_detection',
      title: 'Blink Detection',
      instruction: 'Blink your eyes naturally when prompted',
      completed: false,
      icon: '👁️',
    },
    {
      id: 'head_movement',
      title: 'Head Movement',
      instruction: 'Slowly turn your head left and right',
      completed: false,
      icon: '↔️',
    },
    {
      id: 'smile_detection',
      title: 'Smile Detection',
      instruction: 'Please smile naturally',
      completed: false,
      icon: '😊',
    },
  ]);

  const { onComplete, nextScreen } = route?.params || {};

  useEffect(() => {
    // Simulate camera initialization
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const simulateLivenessCheck = async (stepIndex: number) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mark current step as completed
    const updatedSteps = [...livenessSteps];
    updatedSteps[stepIndex].completed = true;
    setLivenessSteps(updatedSteps);
    
    setIsProcessing(false);
    
    // Move to next step or complete
    if (stepIndex < livenessSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    } else {
      handleLivenessComplete();
    }
  };

  const handleLivenessComplete = () => {
    Alert.alert(
      'Liveness Check Complete',
      'Your identity has been successfully verified!',
      [
        {
          text: 'Continue',
          onPress: () => {
            if (onComplete) {
              onComplete();
            }
            if (nextScreen) {
              navigation.navigate(nextScreen as any);
            } else {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Liveness Check',
      'Are you sure you want to skip the liveness verification? This may limit some features.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            if (onComplete) {
              onComplete();
            }
            if (nextScreen) {
              navigation.navigate(nextScreen as any);
            } else {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#F9FAFB',
  });

  const getHeaderStyle = (): ViewStyle => ({
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  });

  const getHeaderTitleStyle = (): TextStyle => ({
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  });

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  });

  const getProgressContainerStyle = (): ViewStyle => ({
    marginBottom: 30,
  });

  const getProgressTextStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 15,
  });

  const getProgressBarStyle = (): ViewStyle => ({
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  });

  const getProgressFillStyle = (): ViewStyle => ({
    height: '100%',
    backgroundColor: '#10B981',
    width: `${((currentStep + 1) / livenessSteps.length) * 100}%`,
    borderRadius: 4,
  });

  const getCameraContainerStyle = (): ViewStyle => ({
    height: 300,
    backgroundColor: '#000000',
    borderRadius: 12,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  });

  const getCameraPlaceholderStyle = (): TextStyle => ({
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  });

  const getOverlayStyle = (): ViewStyle => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
  });

  const getFaceFrameStyle = (): ViewStyle => ({
    width: 200,
    height: 250,
    borderWidth: 3,
    borderColor: livenessSteps[currentStep]?.completed ? '#10B981' : '#3B82F6',
    borderRadius: 100,
    borderStyle: 'dashed',
  });

  const getInstructionContainerStyle = (): ViewStyle => ({
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  });

  const getStepTitleStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  });

  const getStepInstructionStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  });

  const getStepIconStyle = (): TextStyle => ({
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 12,
  });

  const getButtonContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
  });

  const getSkipButtonStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  });

  const getSkipButtonTextStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  });

  const getStartButtonStyle = (): ViewStyle => ({
    flex: 2,
    backgroundColor: isProcessing ? '#9CA3AF' : '#3B82F6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  });

  const getStartButtonTextStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  });

  const getStepsListStyle = (): ViewStyle => ({
    marginBottom: 20,
  });

  const getStepItemStyle = (index: number): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: index === currentStep ? '#EBF8FF' : '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: index === currentStep ? '#3B82F6' : '#E5E7EB',
  });

  const getStepItemIconStyle = (): TextStyle => ({
    fontSize: 20,
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  });

  const getStepItemTextStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getStepItemTitleStyle = (): TextStyle => ({
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  });

  const getStepItemDescStyle = (): TextStyle => ({
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  });

  const getStatusIconStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#10B981',
  });

  const currentStepData = livenessSteps[currentStep];

  return (
    <SafeAreaView style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <Text style={getHeaderTitleStyle()}>Liveness Verification</Text>
      </View>

      {/* Content */}
      <View style={getContentStyle()}>
        {/* Progress */}
        <View style={getProgressContainerStyle()}>
          <Text style={getProgressTextStyle()}>
            Step {currentStep + 1} of {livenessSteps.length}
          </Text>
          <View style={getProgressBarStyle()}>
            <View style={getProgressFillStyle()} />
          </View>
        </View>

        {/* Steps List */}
        <View style={getStepsListStyle()}>
          {livenessSteps.map((step, index) => (
            <View key={step.id} style={getStepItemStyle(index)}>
              <Text style={getStepItemIconStyle()}>{step.icon}</Text>
              <View style={getStepItemTextStyle()}>
                <Text style={getStepItemTitleStyle()}>{step.title}</Text>
                <Text style={getStepItemDescStyle()}>{step.instruction}</Text>
              </View>
              {step.completed && <Text style={getStatusIconStyle()}>✓</Text>}
            </View>
          ))}
        </View>

        {/* Camera View */}
        <View style={getCameraContainerStyle()}>
          <Text style={getCameraPlaceholderStyle()}>
            Camera View{'\n'}(Simulated)
          </Text>
          <View style={getOverlayStyle()}>
            <View style={getFaceFrameStyle()} />
          </View>
        </View>

        {/* Current Step Instructions */}
        {currentStepData && (
          <View style={getInstructionContainerStyle()}>
            <Text style={getStepIconStyle()}>{currentStepData.icon}</Text>
            <Text style={getStepTitleStyle()}>{currentStepData.title}</Text>
            <Text style={getStepInstructionStyle()}>{currentStepData.instruction}</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={getButtonContainerStyle()}>
        <TouchableOpacity style={getSkipButtonStyle()} onPress={handleSkip}>
          <Text style={getSkipButtonTextStyle()}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getStartButtonStyle()}
          onPress={() => simulateLivenessCheck(currentStep)}
          disabled={isProcessing}
        >
          <Text style={getStartButtonTextStyle()}>
            {isProcessing ? 'Processing...' : 'Start Check'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LivenessCheckScreen;