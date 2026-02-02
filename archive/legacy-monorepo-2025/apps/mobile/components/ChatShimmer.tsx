import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import { useColorScheme } from './useColorScheme';

export function ChatShimmer() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const shimmerOpacity = useSharedValue(0.3);

  useEffect(() => {
    shimmerOpacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, [shimmerOpacity]);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmerOpacity.value, [0.3, 1], [0.3, 0.7]),
  }));

  return (
    <View className="mb-4">
      <View
        className={`max-w-[85%] p-3 rounded-2xl self-start ${
          isDark ? 'bg-dark-card' : 'bg-gray-100'
        }`}
      >
        <Animated.View
          style={shimmerStyle}
          className={`h-4 rounded mb-2 ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}
        />
        <Animated.View
          style={shimmerStyle}
          className={`h-4 rounded w-3/4 mb-2 ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}
        />
        <Animated.View
          style={shimmerStyle}
          className={`h-4 rounded w-1/2 ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}
        />
      </View>
    </View>
  );
}

export function MessageShimmer({ count = 3 }: { count?: number }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const shimmerOpacity = useSharedValue(0.3);

  useEffect(() => {
    shimmerOpacity.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      true
    );
  }, [shimmerOpacity]);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmerOpacity.value, [0.3, 1], [0.3, 0.8]),
  }));

  return (
    <View className="px-4 py-4">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} className="mb-4">
          {/* User message shimmer */}
          <View className="max-w-[85%] p-3 rounded-2xl self-end bg-blue-500/30 mb-2">
            <Animated.View
              style={shimmerStyle}
              className={`h-4 rounded ${isDark ? 'bg-blue-400' : 'bg-blue-300'}`}
            />
          </View>

          {/* Assistant message shimmer */}
          <View
            className={`max-w-[85%] p-3 rounded-2xl self-start ${
              isDark ? 'bg-dark-card' : 'bg-gray-100'
            }`}
          >
            <Animated.View
              style={[shimmerStyle, { animationDelay: `${index * 200}ms` }]}
              className={`h-4 rounded mb-2 ${
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
            <Animated.View
              style={[shimmerStyle, { animationDelay: `${index * 300}ms` }]}
              className={`h-4 rounded w-4/5 mb-2 ${
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
            <Animated.View
              style={[shimmerStyle, { animationDelay: `${index * 400}ms` }]}
              className={`h-4 rounded w-3/5 ${
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          </View>
        </View>
      ))}
    </View>
  );
}