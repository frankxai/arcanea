import { Skeleton } from '@/components/ui/skeleton'

export default function PromptBooksLoading() {
  return (
    <div className="flex h-[calc(100dvh-64px)] pt-16">
      {/* Sidebar skeleton */}
      <div className="w-72 glass-strong border-r border-white/5 p-4 space-y-4">
        <Skeleton variant="rect" className="h-10 w-full" />
        <Skeleton variant="rect" className="h-8 w-full" />
        <div className="space-y-2 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-9 w-full" />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton variant="rect" className="h-8 w-48" />
          <Skeleton variant="rect" className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-48 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
