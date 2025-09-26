import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { aiService } from '../../../../lib/ai'

export const ModuleSwitcher = () => {
  const router = useRouter()
  const { module } = useLocalSearchParams()
  const luminors = aiService.getAllLuminors()
  const currentLuminor = luminors.find(l => l.slug === module)

  const openLuminorSelection = () => {
    // Navigate to a modal or screen to select a new luminor
    router.push('/') // For now, go back to home
  }

  return (
    <TouchableOpacity onPress={openLuminorSelection} style={styles.container}>
      <View style={styles.luminorInfo}>
        <Text style={styles.luminorName}>{currentLuminor?.name}</Text>
        <Text style={styles.luminorDescription}>{currentLuminor?.personality.description}</Text>
      </View>
      <FontAwesome name="chevron-down" size={16} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  luminorInfo: {
    alignItems: 'center',
    marginRight: 8,
  },
  luminorName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  luminorDescription: {
    color: '#ccc',
    fontSize: 12,
  },
})