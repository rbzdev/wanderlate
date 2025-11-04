import { Icon } from "@iconify/react"

interface SpinnerProps {
  size?: number
  className?: string
}

export function Spinner({ size = 24, className = "" }: SpinnerProps) {
  return (
    <Icon 
      icon="svg-spinners:ring-resize" 
      width={size} 
      height={size} 
      className={className}
    />
  )
}
