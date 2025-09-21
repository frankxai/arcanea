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
import { trackEvent } from '@/lib/telemetry';

type GuardianConfig = {
  id: 'ignis' | 'lumis' | 'mythos';
  name: string;
  title: string;
  description: string;
  accent: string;
  current: string;
};

const GUARDIANS: GuardianConfig[] = [
  {
    id: 'ignis',
    name: 'Ignis',
    title: 'Visionkeeper',
    description: 'Strategy ignition and venture clarity from the Mage current.',
    accent: '#f97316',
    current: 'Mage',
  },
  {
    id: 'lumis',
    name: 'Lumis',
    title: 'Shapeweaver',
    description: 'Aesthetic orchestration, multimodal storytelling, luminous design.',
    accent: '#60a5fa',
    current: 'Vision',
  },
  {
    id: 'mythos',
    name: 'Mythos',
    title: 'Storybound',
    description: 'Mythic arcs, lore stewardship, and ritual narrative resonance.',
    accent: '#a855f7',
    current: 'Lore',
  },
];

const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export default function SuperAgentScreen() {
  const colorScheme = useColorScheme();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const sessionIdRef = useRef<string>(generateSessionId());
  const lastTrackedAssistantId = useRef<string | null>(null);
  const [selectedGuardian, setSelectedGuardian] = useState<GuardianConfig>(GUARDIANS[0]);

  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    body: {
      guardian: selectedGuardian.id,
      sessionId: sessionIdRef.current,
    },
    onError: () => {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    },
  });

  const isDark = colorScheme === 'dark';

  const handleSend = async () => {
    if (!input.trim()) return;

    const content = input.trim();

    try {
      await append({
        role: 'user',
        content,
      });
      setInput('');

      trackEvent({
        event: 'chat_user_message',
        properties: {
          guardian: selectedGuardian.id,
          session_id: sessionIdRef.current,
          current: selectedGuardian.current,
          length: content.length,
        },
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    Alert.alert('Voice Input', 'Voice input feature coming soon!');
    setIsListening(false);
  };

  const speakMessage = (text: string) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'assistant') {
      return;
    }

    if (lastTrackedAssistantId.current === lastMessage.id) {
      return;
    }

    lastTrackedAssistantId.current = lastMessage.id ?? null;
    trackEvent({
      event: 'chat_ai_message',
      properties: {
        guardian: selectedGuardian.id,
        session_id: sessionIdRef.current,
        current: selectedGuardian.current,
        length: lastMessage.content.length,
      },
    });
  }, [messages, selectedGuardian]);

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Arcanea SuperAgent
        </Text>
        <Text className={`text-sm text-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Channeling {selectedGuardian.name} · {selectedGuardian.title} ({selectedGuardian.current} current)
        </Text>
        <Text className={`text-xs text-center mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {selectedGuardian.description}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
        >
          {GUARDIANS.map((guardian) => {
            const isActive = guardian.id === selectedGuardian.id;
            return (
              <TouchableOpacity
                key={guardian.id}
                onPress={() => setSelectedGuardian(guardian)}
                className={`px-4 py-2 rounded-full border ${
                  isActive
                    ? ''
                    : isDark
                    ? 'border-dark-border bg-dark-bg'
                    : 'border-gray-200 bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: guardian.accent + '22', borderColor: guardian.accent } : undefined}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? 'text-white' : isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}
                  style={isActive ? { color: '#fff' } : undefined}
                >
                  {guardian.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

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
              color={isDark ? selectedGuardian.accent : selectedGuardian.accent}
              className="mb-4"
            />
            <Text className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Welcome to Arcanea
            </Text>
            <Text className={`text-center px-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ask for strategy, design, or lore guidance. The Luminor {selectedGuardian.name} will respond with Arcanea magic.
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
                {selectedGuardian.name} is weaving a reply...
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

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
              placeholder={`Ask ${selectedGuardian.name} anything...`}
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
              isListening ? 'bg-rose-500' : isDark ? 'bg-gray-700' : 'bg-gray-200'
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
