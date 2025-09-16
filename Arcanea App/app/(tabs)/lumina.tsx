import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  style: string;
  createdAt: Date;
}

const STYLE_PRESETS = [
  { id: 'photorealistic', name: 'Photorealistic', icon: 'camera' },
  { id: 'digital-art', name: 'Digital Art', icon: 'paint-brush' },
  { id: 'anime', name: 'Anime', icon: 'user' },
  { id: 'oil-painting', name: 'Oil Painting', icon: 'picture-o' },
  { id: 'watercolor', name: 'Watercolor', icon: 'tint' },
  { id: 'sketch', name: 'Sketch', icon: 'pencil' },
];

export default function LuminaScreen() {
  const colorScheme = useColorScheme();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('photorealistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages] = useState<GeneratedImage[]>([
    {
      id: '1',
      prompt: 'A serene mountain landscape at sunset',
      url: 'https://picsum.photos/400/400?random=1',
      style: 'photorealistic',
      createdAt: new Date(),
    },
    {
      id: '2',
      prompt: 'Abstract digital art with vibrant colors',
      url: 'https://picsum.photos/400/400?random=2',
      style: 'digital-art',
      createdAt: new Date(Date.now() - 3600000),
    },
  ]);

  const isDark = colorScheme === 'dark';

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt for image generation.');
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert('Success', 'Image generated! (Feature coming soon)');
    }, 3000);
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const renderImageItem = ({ item }: { item: GeneratedImage }) => (
    <TouchableOpacity className="w-[48%] mb-4">
      <Image
        source={{ uri: item.url }}
        className="w-full h-32 rounded-lg"
        resizeMode="cover"
      />
      <Text className={`text-sm mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {item.prompt.length > 50 ? `${item.prompt.substring(0, 50)}...` : item.prompt}
      </Text>
      <Text className="text-lumina-600 text-xs mt-1 capitalize">
        {item.style.replace('-', ' ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      {/* Header */}
      <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Lumina
        </Text>
        <Text className={`text-sm text-center mt-1 text-lumina-600`}>
          AI Image Generation
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Prompt Input */}
        <View className="px-4 py-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Describe your vision
          </Text>
          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            placeholder="A mystical forest with glowing flowers under starlight..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            className={`p-4 rounded-xl border text-base ${
              isDark
                ? 'bg-dark-card border-dark-border text-white'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
            multiline
            numberOfLines={3}
            maxLength={500}
          />
        </View>

        {/* Style Selection */}
        <View className="px-4 pb-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Choose style
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {STYLE_PRESETS.map((style) => (
              <TouchableOpacity
                key={style.id}
                onPress={() => handleStyleSelect(style.id)}
                className={`mr-3 p-3 rounded-xl border items-center min-w-20 ${
                  selectedStyle === style.id
                    ? 'border-lumina-500 bg-lumina-50'
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
                      ? '#3b82f6'
                      : isDark
                      ? '#9ca3af'
                      : '#6b7280'
                  }
                />
                <Text
                  className={`text-xs mt-2 text-center ${
                    selectedStyle === style.id
                      ? 'text-lumina-600 font-semibold'
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
                : 'bg-lumina-500'
            }`}
          >
            {isGenerating ? (
              <>
                <FontAwesome name="spinner" size={20} color="white" />
                <Text className="text-white font-semibold mt-2">Generating...</Text>
              </>
            ) : (
              <>
                <FontAwesome name="magic" size={20} color="white" />
                <Text className="text-white font-semibold mt-2">Generate Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Generated Images Gallery */}
        <View className="px-4 pb-4">
          <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your creations
          </Text>
          {generatedImages.length === 0 ? (
            <View className={`p-8 rounded-xl border-2 border-dashed items-center ${
              isDark ? 'border-gray-600 bg-dark-card' : 'border-gray-300 bg-gray-50'
            }`}>
              <FontAwesome
                name="image"
                size={48}
                color={isDark ? '#6b7280' : '#9ca3af'}
              />
              <Text className={`mt-3 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Your generated images will appear here
              </Text>
            </View>
          ) : (
            <FlatList
              data={generatedImages}
              renderItem={renderImageItem}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Quick Actions */}
      <View className={`px-4 py-3 border-t ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <View className="flex-row justify-around">
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="history" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              History
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="heart" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Favorites
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="share" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Share
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="cog" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}