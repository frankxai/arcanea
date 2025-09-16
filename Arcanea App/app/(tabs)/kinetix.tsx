import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';

import { useColorScheme } from '@/components/useColorScheme';

interface GeneratedVideo {
  id: string;
  title: string;
  description: string;
  duration: number;
  style: string;
  thumbnail: string;
  videoUrl: string;
  createdAt: Date;
}

const VIDEO_STYLES = [
  { id: 'cinematic', name: 'Cinematic', icon: 'film' },
  { id: 'animation', name: 'Animation', icon: 'play-circle' },
  { id: 'documentary', name: 'Documentary', icon: 'video-camera' },
  { id: 'commercial', name: 'Commercial', icon: 'bullhorn' },
  { id: 'music-video', name: 'Music Video', icon: 'music' },
  { id: 'tutorial', name: 'Tutorial', icon: 'graduation-cap' },
];

export default function KinetixScreen() {
  const colorScheme = useColorScheme();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [duration, setDuration] = useState('30');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos] = useState<GeneratedVideo[]>([
    {
      id: '1',
      title: 'Sunset Timelapse',
      description: 'Beautiful mountain sunset with flowing clouds',
      duration: 15,
      style: 'cinematic',
      thumbnail: 'https://picsum.photos/400/225?random=10',
      videoUrl: '',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Product Demo',
      description: 'Sleek product demonstration with smooth transitions',
      duration: 30,
      style: 'commercial',
      thumbnail: 'https://picsum.photos/400/225?random=11',
      videoUrl: '',
      createdAt: new Date(Date.now() - 7200000),
    },
  ]);

  const isDark = colorScheme === 'dark';

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a description for video generation.');
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert('Success', 'Video is being generated! (Feature coming soon)');
    }, 5000);
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const renderVideoItem = ({ item }: { item: GeneratedVideo }) => (
    <TouchableOpacity className="w-full mb-4">
      <View className="relative">
        <View
          className="w-full h-48 rounded-lg bg-gray-300"
          style={{
            backgroundColor: isDark ? '#374151' : '#d1d5db',
          }}
        >
          {/* Video thumbnail placeholder */}
          <View className="flex-1 justify-center items-center">
            <FontAwesome
              name="play-circle"
              size={48}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </View>
        </View>
        <View className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded">
          <Text className="text-white text-xs">{item.duration}s</Text>
        </View>
      </View>
      <Text className={`text-base font-semibold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {item.title}
      </Text>
      <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {item.description}
      </Text>
      <Text className="text-kinetix-600 text-xs mt-1 capitalize">
        {item.style.replace('-', ' ')} • {item.createdAt.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      {/* Header */}
      <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Kinetix
        </Text>
        <Text className={`text-sm text-center mt-1 text-kinetix-600`}>
          AI Video Generation
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Prompt Input */}
        <View className="px-4 py-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Describe your video
          </Text>
          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            placeholder="A drone shot flying through a mystical forest at dawn..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            className={`p-4 rounded-xl border text-base ${
              isDark
                ? 'bg-dark-card border-dark-border text-white'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
            multiline
            numberOfLines={4}
            maxLength={1000}
          />
        </View>

        {/* Duration Selection */}
        <View className="px-4 pb-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Duration
          </Text>
          <View className="flex-row space-x-3">
            {['15', '30', '60'].map((dur) => (
              <TouchableOpacity
                key={dur}
                onPress={() => setDuration(dur)}
                className={`flex-1 p-3 rounded-xl border items-center ${
                  duration === dur
                    ? 'border-kinetix-500 bg-kinetix-50'
                    : isDark
                    ? 'border-dark-border bg-dark-card'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    duration === dur
                      ? 'text-kinetix-600'
                      : isDark
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {dur}s
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Style Selection */}
        <View className="px-4 pb-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Video style
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {VIDEO_STYLES.map((style) => (
              <TouchableOpacity
                key={style.id}
                onPress={() => handleStyleSelect(style.id)}
                className={`mr-3 p-3 rounded-xl border items-center min-w-20 ${
                  selectedStyle === style.id
                    ? 'border-kinetix-500 bg-kinetix-50'
                    : isDark
                    ? 'border-dark-border bg-dark-card'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <FontAwesome
                  name={style.icon as any}
                  size={24}
                  color={
                    selectedStyle === style.id
                      ? '#22c55e'
                      : isDark
                      ? '#9ca3af'
                      : '#6b7280'
                  }
                />
                <Text
                  className={`text-xs mt-2 text-center ${
                    selectedStyle === style.id
                      ? 'text-kinetix-600 font-semibold'
                      : isDark
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {style.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Generate Button */}
        <View className="px-4 pb-4">
          <TouchableOpacity
            onPress={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`p-4 rounded-xl items-center ${
              isGenerating || !prompt.trim()
                ? isDark
                  ? 'bg-gray-700'
                  : 'bg-gray-300'
                : 'bg-kinetix-500'
            }`}
          >
            {isGenerating ? (
              <>
                <FontAwesome name="spinner" size={20} color="white" />
                <Text className="text-white font-semibold mt-2">Generating Video...</Text>
                <Text className="text-white text-sm mt-1">This may take a few minutes</Text>
              </>
            ) : (
              <>
                <FontAwesome name="video-camera" size={20} color="white" />
                <Text className="text-white font-semibold mt-2">Generate Video</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Generated Videos Gallery */}
        <View className="px-4 pb-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your videos
          </Text>
          {generatedVideos.length === 0 ? (
            <View className={`p-8 rounded-xl border-2 border-dashed items-center ${
              isDark ? 'border-gray-600 bg-dark-card' : 'border-gray-300 bg-gray-50'
            }`}>
              <FontAwesome
                name="video-camera"
                size={48}
                color={isDark ? '#6b7280' : '#9ca3af'}
              />
              <Text className={`mt-3 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Your generated videos will appear here
              </Text>
            </View>
          ) : (
            <FlatList
              data={generatedVideos}
              renderItem={renderVideoItem}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Quick Actions */}
      <View className={`px-4 py-3 border-t ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <View className="flex-row justify-around">
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="upload" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Upload
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="scissors" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Edit
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="share" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Export
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="cloud" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Cloud
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}