import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from './useColorScheme';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, type, visible, onHide, duration = 3000 }: ToastProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible, duration, onHide, translateY]);

  if (!visible) return null;

  const getToastColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: isDark ? 'bg-green-800' : 'bg-green-600',
          text: 'text-white',
          icon: 'check-circle',
        };
      case 'error':
        return {
          bg: isDark ? 'bg-red-800' : 'bg-red-600',
          text: 'text-white',
          icon: 'exclamation-circle',
        };
      case 'warning':
        return {
          bg: isDark ? 'bg-yellow-800' : 'bg-yellow-600',
          text: 'text-white',
          icon: 'warning',
        };
      case 'info':
      default:
        return {
          bg: isDark ? 'bg-blue-800' : 'bg-blue-600',
          text: 'text-white',
          icon: 'info-circle',
        };
    }
  };

  const colors = getToastColors();

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        zIndex: 1000,
      }}
      className={`${colors.bg} p-4 rounded-lg shadow-lg flex-row items-center`}
    >
      <FontAwesome
        name={colors.icon as any}
        size={20}
        color="white"
        style={{ marginRight: 12 }}
      />
      <Text className={`flex-1 ${colors.text} font-medium`}>{message}</Text>
    </Animated.View>
  );
}