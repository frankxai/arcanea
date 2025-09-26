import React from 'react'
import { View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { MessageThread } from '../components/MessageThread'
import { ChatInput } from '../components/ChatInput'
import { KeyboardAvoidingView, Platform } from 'react-native'

export default function ChatScreen() {
  const { module } = useLocalSearchParams()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={{ flex: 1, backgroundColor: '#0a0a0f' }}>
        <MessageThread module={module as string} />
        <ChatInput module={module as string} />
      </View>
    </KeyboardAvoidingView>
  )
}