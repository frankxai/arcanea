'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePromptBooksStore } from '@/lib/prompt-books/store'

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const collectionId = params.collectionId as string
  const { setActiveCollection } = usePromptBooksStore()

  useEffect(() => {
    if (collectionId) {
      setActiveCollection(collectionId)
      // Redirect to main page which reads activeCollectionId from store
      router.replace('/prompt-books')
    }
  }, [collectionId, setActiveCollection, router])

  return null
}
