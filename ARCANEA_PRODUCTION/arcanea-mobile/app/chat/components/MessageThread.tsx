import React from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useChat } from '../../../hooks/useChat'
import { LuminorAvatar } from '../../../components/ui/LuminorAvatar'
import { ConversationTurn } from '../../../lib/ai/types'

interface MessageThreadProps {
  module: string
}

export const MessageThread = ({ module }: MessageThreadProps) => {
  const { messages, loading } = useChat(module)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map((message: ConversationTurn, index: number) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            message.role === 'user'
              ? styles.userMessageContainer
              : styles.luminorMessageContainer,
          ]}
        >
          {message.role === 'luminor' && (
            <LuminorAvatar
              name={module}
              color="#4444FF" // Pass correct color from luminor profile
              size="sm"
              className="mr-2"
            />
          )}
          <View
            style={[
              styles.messageBubble,
              message.role === 'user'
                ? styles.userMessageBubble
                : styles.luminorMessageBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        </View>
      ))}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  luminorMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
  },
  userMessageBubble: {
    backgroundColor: '#533483',
    marginLeft: 10,
  },
  luminorMessageBubble: {
    backgroundColor: '#16213e',
    marginRight: 10,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 10,
  },
})