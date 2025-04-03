import { Loader2 } from "lucide-react"

interface LoadingProps {
  text?: string
  className?: string
}

export function Loading({ text = "Carregando...", className = "" }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Loading />
    </div>
  )
}

export function LoadingSpinner() {
  return <Loader2 className="h-4 w-4 animate-spin" />
} 