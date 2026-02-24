'use client'

import { CollectionItem } from './CollectionItem'
import type { Collection } from '@/lib/prompt-books/types'

interface CollectionTreeProps {
  collections: Collection[]
  allCollections: Collection[]
  activeId: string | null
  onSelect: (id: string) => void
  depth?: number
}

export function CollectionTree({
  collections,
  allCollections,
  activeId,
  onSelect,
  depth = 0,
}: CollectionTreeProps) {
  return (
    <div className="space-y-0.5">
      {collections.map((collection) => {
        const children = allCollections
          .filter((c) => c.parentId === collection.id && !c.isArchived)
          .sort((a, b) => a.sortOrder - b.sortOrder)

        return (
          <CollectionItem
            key={collection.id}
            collection={collection}
            isActive={activeId === collection.id}
            depth={depth}
            onSelect={onSelect}
            hasChildren={children.length > 0}
          >
            {children.length > 0 && (
              <CollectionTree
                collections={children}
                allCollections={allCollections}
                activeId={activeId}
                onSelect={onSelect}
                depth={depth + 1}
              />
            )}
          </CollectionItem>
        )
      })}
    </div>
  )
}
