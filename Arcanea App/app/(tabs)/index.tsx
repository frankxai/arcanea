import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useChat } from 'ai/react';

import { useColorScheme } from '@/components/useColorScheme';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function SuperAgentScreen() {
  const colorScheme = useColorScheme();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    onError: (error) => {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    },
  });

  const isDark = colorScheme === 'dark';

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      await append({
        role: 'user',
        content: input,
      });
      setInput('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const handleVoiceInput = () => {
    // Voice input implementation would go here
    // For now, show a placeholder
    Alert.alert('Voice Input', 'Voice input feature coming soon!');
  };

  const speakMessage = (text: string) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      {/* Header */}
      <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Arcanea SuperAgent
        </Text>
        <Text className={`text-sm text-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Your AI Creative Assistant
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <FontAwesome
              name="magic"
              size={48}
              color={isDark ? '#3b82f6' : '#1d4ed8'}
              className="mb-4"
            />
            <Text className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Welcome to Arcanea
            </Text>
            <Text className={`text-center px-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ask me anything about creative projects, book writing, image generation, or video creation!
            </Text>
          </View>
        ) : (
          messages.map((message) => (
            <View key={message.id} className="mb-4">
              <View
                className={`max-w-[85%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? `self-end ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`
                    : `self-start ${isDark ? 'bg-dark-card' : 'bg-gray-100'}`
                }`}
              >
                <Text
                  className={`text-base ${
                    message.role === 'user'
                      ? 'text-white'
                      : isDark
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {message.content}
                </Text>
              </View>
              {message.role === 'assistant' && (
                <TouchableOpacity
                  onPress={() => speakMessage(message.content)}
                  className="mt-2 self-start"
                >
                  <FontAwesome
                    name="volume-up"
                    size={16}
                    color={isDark ? '#9ca3af' : '#6b7280'}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))
        )}

        {isLoading && (
          <View className="mb-4">
            <View
              className={`max-w-[85%] p-3 rounded-2xl self-start ${
                isDark ? 'bg-dark-card' : 'bg-gray-100'
              }`}
            >
              <Text className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Thinking...
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={`border-t ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}
      >
        <View className="flex-row items-end px-4 py-3">
          <View
            className={`flex-1 mr-3 p-3 rounded-2xl border ${
              isDark
                ? 'bg-dark-bg border-dark-border'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask Arcanea anything..."
              placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
              multiline
              maxLength={2000}
              style={{ maxHeight: 100 }}
            />
          </View>

          <TouchableOpacity
            onPress={handleVoiceInput}
            className={`p-3 rounded-full mr-2 ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <FontAwesome
              name="microphone"
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-full ${
              input.trim() && !isLoading
                ? 'bg-blue-500'
                : isDark
                ? 'bg-gray-700'
                : 'bg-gray-300'
            }`}
          >
            <FontAwesome
              name="send"
              size={20}
              color={
                input.trim() && !isLoading
                  ? 'white'
                  : isDark
                  ? '#6b7280'
                  : '#9ca3af'
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}