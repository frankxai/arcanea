import React from 'react'
import { Stack } from 'expo-router'
import { ModuleSwitcher } from './components/ModuleSwitcher'

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[module]"
        options={{
          headerTitle: () => <ModuleSwitcher />,
        }}
      />
    </Stack>
  )
}