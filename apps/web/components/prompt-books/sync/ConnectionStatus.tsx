'use client'

import { useState, useEffect, useCallback } from 'react'
import { Wifi, WifiOff, RefreshCw, Cloud, CloudOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePromptBooksStore } from '@/lib/prompt-books/store'

export function ConnectionStatus() {
  const { syncStatus, lastSyncAt, setSyncStatus } = usePromptBooksStore()
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)

    const handleOnline = () => {
      setOnline(true)
      setSyncStatus('syncing')
      // Reconnect will happen via PromptBooksSync
    }
    const handleOffline = () => {
      setOnline(false)
      setSyncStatus('offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setSyncStatus])

  const statusConfig = {
    synced: { icon: Cloud, label: 'Synced', color: 'text-success', pulse: false },
    syncing: { icon: RefreshCw, label: 'Syncing...', color: 'text-brand-accent', pulse: true },
    offline: { icon: CloudOff, label: 'Offline', color: 'text-text-muted', pulse: false },
    error: { icon: WifiOff, label: 'Sync error', color: 'text-error', pulse: false },
  }

  const config = statusConfig[syncStatus]
  const Icon = config.icon

  const lastSync = lastSyncAt
    ? new Date(lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 glass-subtle rounded-lg">
      <div className="flex items-center gap-1.5">
        {!online && <WifiOff className="w-3 h-3 text-error" />}
        <Icon className={cn('w-3 h-3', config.color, config.pulse && 'animate-spin')} />
        <span className={cn('text-[10px] font-sans', config.color)}>
          {config.label}
        </span>
      </div>

      {lastSync && syncStatus === 'synced' && (
        <span className="text-[10px] font-sans text-text-muted/40">
          {lastSync}
        </span>
      )}
    </div>
  )
}
