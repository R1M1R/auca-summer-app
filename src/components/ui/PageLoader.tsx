import { Loader2 } from 'lucide-react'

interface Props {
  label?: string
}

export default function PageLoader({ label = 'Loading…' }: Props) {
  return (
    <div className="page-shell min-h-screen flex items-center justify-center bg-mesh-light dark:bg-mesh-dark">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" strokeWidth={2} />
        <p className="text-body-muted">{label}</p>
      </div>
    </div>
  )
}
