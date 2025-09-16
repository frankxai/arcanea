import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';

interface Project {
  id: string;
  title: string;
  type: 'novel' | 'non-fiction' | 'poetry' | 'article';
  wordCount: number;
  lastModified: Date;
}

export default function ScriptaScreen() {
  const colorScheme = useColorScheme();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [content, setContent] = useState('');
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'My First Novel',
      type: 'novel',
      wordCount: 12500,
      lastModified: new Date(),
    },
    {
      id: '2',
      title: 'Business Guide',
      type: 'non-fiction',
      wordCount: 8200,
      lastModified: new Date(Date.now() - 86400000),
    },
  ]);

  const isDark = colorScheme === 'dark';

  const handleAIAssist = () => {
    Alert.alert('AI Writing Assistant', 'AI writing assistance coming soon!');
  };

  const handleExport = () => {
    Alert.alert('Export', 'Export options: PDF, EPUB, DOCX coming soon!');
  };

  const createNewProject = () => {
    Alert.alert('New Project', 'Create new writing project coming soon!');
  };

  if (!activeProject) {
    return (
      <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
        {/* Header */}
        <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
          <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Scripta
          </Text>
          <Text className={`text-sm text-center mt-1 text-scripta-600`}>
            Book Authoring & Writing
          </Text>
        </View>

        {/* Projects List */}
        <ScrollView className="flex-1 px-4 py-4">
          <TouchableOpacity
            onPress={createNewProject}
            className={`p-4 rounded-xl border-2 border-dashed mb-4 ${
              isDark ? 'border-scripta-500 bg-dark-card' : 'border-scripta-300 bg-scripta-50'
            }`}
          >
            <View className="items-center">
              <FontAwesome name="plus" size={24} color="#14b8a6" />
              <Text className={`mt-2 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                New Writing Project
              </Text>
            </View>
          </TouchableOpacity>

          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              onPress={() => setActiveProject(project)}
              className={`p-4 rounded-xl mb-3 ${isDark ? 'bg-dark-card' : 'bg-gray-50'}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </Text>
                  <Text className="text-scripta-600 capitalize mt-1">
                    {project.type}
                  </Text>
                  <Text className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.wordCount.toLocaleString()} words
                  </Text>
                </View>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={isDark ? '#9ca3af' : '#6b7280'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      {/* Header */}
      <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => setActiveProject(null)}
            className="mr-3"
          >
            <FontAwesome
              name="arrow-left"
              size={20}
              color={isDark ? '#white' : '#gray-900'}
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {activeProject.title}
            </Text>
            <Text className="text-scripta-600 capitalize">
              {activeProject.type}
            </Text>
          </View>
          <TouchableOpacity onPress={handleExport}>
            <FontAwesome
              name="share"
              size={20}
              color={isDark ? '#white' : '#gray-900'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Writing Area */}
      <View className="flex-1 px-4 py-4">
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Start writing your masterpiece..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          className={`flex-1 p-4 rounded-xl text-base leading-6 ${
            isDark ? 'bg-dark-card text-white' : 'bg-gray-50 text-gray-900'
          }`}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Tools */}
      <View className={`px-4 py-3 border-t ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <View className="flex-row justify-around">
          <TouchableOpacity
            onPress={handleAIAssist}
            className="items-center py-2 px-4"
          >
            <FontAwesome name="magic" size={24} color="#14b8a6" />
            <Text className="text-scripta-600 mt-1 text-xs">AI Assist</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="font" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Format
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="search" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Research
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center py-2 px-4">
            <FontAwesome name="bar-chart" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Analytics
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}