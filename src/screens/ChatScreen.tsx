import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

interface ChatScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Chat'>;
  route: RouteProp<RootStackParamList, 'Chat'>;
}

interface Contact {
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const { contactName } = route.params || { contactName: 'John Doe' };
  const contact: Contact = { 
    name: contactName, 
    avatar: 'https://via.placeholder.com/40x40' 
  };
  
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I saw your profile and I think we could be great roommates!',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
    },
    {
      id: '2',
      text: 'Hello! Thanks for reaching out. I\'d love to know more about you.',
      sender: 'me',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read',
    },
    {
      id: '3',
      text: 'Sure! I\'m a Computer Science student at UNILAG. I\'m clean, quiet, and focused on my studies.',
      sender: 'other',
      timestamp: new Date(Date.now() - 3400000),
      status: 'read',
    },
    {
      id: '4',
      text: 'That sounds perfect! I\'m also studying at UNILAG, Engineering department. What\'s your budget range?',
      sender: 'me',
      timestamp: new Date(Date.now() - 3300000),
      status: 'read',
    },
    {
      id: '5',
      text: 'I\'m looking at around ₦150,000 - ₦200,000 per year. What about you?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3200000),
      status: 'read',
    },
    {
      id: '6',
      text: 'That works for me! I have the same budget range. Should we schedule a call to discuss further?',
      sender: 'me',
      timestamp: new Date(Date.now() - 3100000),
      status: 'delivered',
    },
    {
      id: '7',
      text: 'Absolutely! I\'m free this weekend. What time works for you?',
      sender: 'other',
      timestamp: new Date(Date.now() - 300000),
      status: 'read',
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'me',
        timestamp: new Date(),
        status: 'sent',
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate message delivery
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' }
              : msg
          )
        );
      }, 1000);
    }
  };

  const formatTime = (timestamp: Date): string => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const getStatusIcon = (status: Message['status']): string => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  // Style functions
  const getContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#ffffff',
  });

  const getHeaderStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  });

  const getHeaderRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
  });

  const getBackButtonStyle = (): ViewStyle => ({
    marginRight: 12,
  });

  const getBackButtonTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 18,
  });

  const getAvatarStyle = (): ImageStyle => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  });

  const getHeaderInfoStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getContactNameStyle = (): TextStyle => ({
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  });

  const getOnlineStatusStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#10b981',
  });

  const getActionButtonStyle = (): ViewStyle => ({
    padding: 8,
  });

  const getActionButtonTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 18,
  });

  const getKeyboardAvoidingStyle = (): ViewStyle => ({
    flex: 1,
  });

  const getMessagesContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f9fafb',
  });

  const getMessageItemStyle = (): ViewStyle => ({
    paddingHorizontal: 16,
    marginBottom: 8,
  });

  const getTimestampContainerStyle = (): ViewStyle => ({
    alignItems: 'center',
    marginBottom: 8,
  });

  const getTimestampStyle = (): TextStyle => ({
    color: '#6b7280',
    fontSize: 12,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  });

  const getMessageRowStyle = (isMe: boolean): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: isMe ? 'flex-end' : 'flex-start',
  });

  const getMessageAvatarStyle = (): ImageStyle => ({
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  });

  const getMessageContentStyle = (isMe: boolean): ViewStyle => ({
    maxWidth: '75%',
    alignItems: isMe ? 'flex-end' : 'flex-start',
  });

  const getMessageBubbleStyle = (isMe: boolean): ViewStyle => ({
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: isMe ? '#2563eb' : '#e5e7eb',
    borderBottomRightRadius: isMe ? 4 : 16,
    borderBottomLeftRadius: isMe ? 16 : 4,
  });

  const getMessageTextStyle = (isMe: boolean): TextStyle => ({
    fontSize: 16,
    lineHeight: 20,
    color: isMe ? '#ffffff' : '#111827',
  });

  const getMessageStatusStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  });

  const getMessageTimeStyle = (): TextStyle => ({
    fontSize: 12,
    color: '#6b7280',
    marginRight: 4,
  });

  const getStatusIconStyle = (status: Message['status']): TextStyle => ({
    fontSize: 12,
    color: status === 'read' ? '#3b82f6' : '#9ca3af',
  });

  const getInputContainerStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  });

  const getInputRowStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'flex-end',
  });

  const getAttachButtonStyle = (): ViewStyle => ({
    padding: 8,
    marginRight: 8,
  });

  const getAttachButtonTextStyle = (): TextStyle => ({
    color: '#2563eb',
    fontSize: 20,
  });

  const getTextInputContainerStyle = (): ViewStyle => ({
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  });

  const getTextInputStyle = (): TextStyle => ({
    fontSize: 16,
    color: '#111827',
    maxHeight: 80,
    minHeight: 20,
  });

  const getSendButtonStyle = (hasMessage: boolean): ViewStyle => ({
    padding: 12,
    borderRadius: 20,
    backgroundColor: hasMessage ? '#2563eb' : '#d1d5db',
  });

  const getSendButtonTextStyle = (): TextStyle => ({
    color: '#ffffff',
    fontSize: 18,
  });

  const getQuickActionsStyle = (): ViewStyle => ({
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  });

  const getQuickActionButtonStyle = (): ViewStyle => ({
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  });

  const getQuickActionTextStyle = (): TextStyle => ({
    color: '#374151',
    fontSize: 14,
  });

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isMe = item.sender === 'me';
    const showTimestamp = index === 0 || 
      (messages[index - 1] && 
       new Date(item.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000); // 5 minutes

    return (
      <View style={getMessageItemStyle()}>
        {showTimestamp && (
          <View style={getTimestampContainerStyle()}>
            <Text style={getTimestampStyle()}>
              {formatTime(item.timestamp)}
            </Text>
          </View>
        )}
        
        <View style={getMessageRowStyle(isMe)}>
          {!isMe && (
            <Image
              source={{ uri: contact.avatar }}
              style={getMessageAvatarStyle()}
            />
          )}
          
          <View style={getMessageContentStyle(isMe)}>
            <View style={getMessageBubbleStyle(isMe)}>
              <Text style={getMessageTextStyle(isMe)}>
                {item.text}
              </Text>
            </View>
            
            {isMe && (
              <View style={getMessageStatusStyle()}>
                <Text style={getMessageTimeStyle()}>
                  {formatTime(item.timestamp)}
                </Text>
                <Text style={getStatusIconStyle(item.status)}>
                  {getStatusIcon(item.status)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={getContainerStyle()}>
      {/* Header */}
      <View style={getHeaderStyle()}>
        <View style={getHeaderRowStyle()}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={getBackButtonStyle()}>
            <Text style={getBackButtonTextStyle()}>←</Text>
          </TouchableOpacity>
          
          <Image
            source={{ uri: contact.avatar }}
            style={getAvatarStyle()}
          />
          
          <View style={getHeaderInfoStyle()}>
            <Text style={getContactNameStyle()}>
              {contact.name}
            </Text>
            <Text style={getOnlineStatusStyle()}>Online</Text>
          </View>
          
          <TouchableOpacity style={getActionButtonStyle()}>
            <Text style={getActionButtonTextStyle()}>📞</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[getActionButtonStyle(), { marginLeft: 8 }]}>
            <Text style={getActionButtonTextStyle()}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={getKeyboardAvoidingStyle()}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={getMessagesContainerStyle()}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Message Input */}
        <View style={getInputContainerStyle()}>
          <View style={getInputRowStyle()}>
            <TouchableOpacity style={getAttachButtonStyle()}>
              <Text style={getAttachButtonTextStyle()}>+</Text>
            </TouchableOpacity>
            
            <View style={getTextInputContainerStyle()}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={1000}
                style={getTextInputStyle()}
              />
            </View>
            
            <TouchableOpacity
              onPress={sendMessage}
              style={getSendButtonStyle(!!message.trim())}
              disabled={!message.trim()}
            >
              <Text style={getSendButtonTextStyle()}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Quick Actions */}
      <View style={getQuickActionsStyle()}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={getQuickActionButtonStyle()}>
            <Text style={getQuickActionTextStyle()}>📍 Share Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getQuickActionButtonStyle()}>
            <Text style={getQuickActionTextStyle()}>📅 Schedule Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getQuickActionButtonStyle()}>
            <Text style={getQuickActionTextStyle()}>🏠 Share Hostel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getQuickActionButtonStyle()}>
            <Text style={getQuickActionTextStyle()}>👤 View Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;