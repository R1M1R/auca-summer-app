interface SkeletonLineProps {
  className?: string
  width?: string | number
}

export function SkeletonLine({ className = '', width }: SkeletonLineProps) {
  return (
    <div
      className={`h-3.5 rounded-md bg-slate-200/90 dark:bg-slate-700/80 animate-pulse ${className}`}
      style={width !== undefined ? { width } : undefined}
    />
  )
}

export function SkeletonCard({ lines = 2 }: { lines?: number }) {
  return (
    <div className="glass-card card-pad space-y-3 animate-pulse">
      <SkeletonLine width="70%" />
      {lines > 1 && <SkeletonLine width="45%" className="h-3" />}
    </div>
  )
}

export function SkeletonEventList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} lines={i === 0 ? 2 : 1} />
      ))}
    </div>
  )
}

export function SkeletonTimeline({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 mt-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex gap-3">
          <div className="w-[52px] shrink-0 pt-3.5">
            <div className="h-3 w-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="flex-1">
            <SkeletonCard lines={2} />
          </div>
        </div>
      ))}
    </div>
  )
}
