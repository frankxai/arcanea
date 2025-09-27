import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

const LAST_TAB_STORAGE_KEY = 'arcanea:last-tab';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState<string>('index');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const storedRoute = await AsyncStorage.getItem(LAST_TAB_STORAGE_KEY);
        if (storedRoute && mounted) {
          setInitialRoute(storedRoute);
        }
      } catch (error) {
        console.warn('[tabs] Unable to read last selected tab', error);
      } finally {
        if (mounted) {
          setIsHydrated(true);
        }
      }
    };

    hydrate();

    return () => {
      mounted = false;
    };
  }, []);

  const persistRoute = useCallback(async (routeName: string) => {
    try {
      await AsyncStorage.setItem(LAST_TAB_STORAGE_KEY, routeName);
    } catch (error) {
      console.warn('[tabs] Unable to persist last selected tab', error);
    }
  }, []);

  useEffect(() => {
    if (isHydrated && initialRoute) {
      persistRoute(initialRoute);
    }
  }, [isHydrated, initialRoute, persistRoute]);

  if (!isHydrated) {
    return null;
  }

  return (
    <Tabs
      initialRouteName={initialRoute}
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#3b82f6' : '#1d4ed8',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#6b7280' : '#9ca3af',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#2a2a2a' : '#e5e7eb',
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
      screenListeners={{
        state: (event) => {
          const route = event.data.state.routes[event.data.state.index];
          if (route?.name) {
            persistRoute(route.name);
          }
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'SuperAgent',
          tabBarIcon: ({ color }) => <TabBarIcon name='comments' color={color} />,
        }}
      />
      <Tabs.Screen
        name='scripta'
        options={{
          title: 'Scripta',
          tabBarIcon: ({ color }) => <TabBarIcon name='book' color={color} />,
        }}
      />
      <Tabs.Screen
        name='lumina'
        options={{
          title: 'Lumina',
          tabBarIcon: ({ color }) => <TabBarIcon name='image' color={color} />,
        }}
      />
      <Tabs.Screen
        name='kinetix'
        options={{
          title: 'Kinetix',
          tabBarIcon: ({ color }) => <TabBarIcon name='video-camera' color={color} />,
        }}
      />
    </Tabs>
  );
}
