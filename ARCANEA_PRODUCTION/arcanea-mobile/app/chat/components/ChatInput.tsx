import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useChat } from '../../../hooks/useChat'
import { FontAwesome } from '@expo/vector-icons'

interface ChatInputProps {
  module: string
}

export const ChatInput = ({ module }: ChatInputProps) => {
  const [message, setMessage] = useState('')
  const { sendMessage, loading } = useChat(module)

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message)
      setMessage('')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Ask your Luminor..."
        placeholderTextColor="#888"
        editable={!loading}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={loading}>
        <FontAwesome name="paper-plane" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#16213e',
    borderTopWidth: 1,
    borderTopColor: '#533483',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#533483',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})