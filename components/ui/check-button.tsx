import { cn } from '@/lib/utils'
import React from 'react'

interface CheckButtonProps {
  children: React.ReactNode
  description: string
  isChecked: boolean
  onClick: () => void
  className?: string
}

const CheckButton = ({
  children,
  description,
  isChecked,
  onClick,
  className,
}: CheckButtonProps) => {
  const backgroundColor = isChecked ? 'rgba(255, 165, 0, 0.5)' : 'transparent'

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-md border border-red-400 p-2 hover:cursor-pointer transition-colors duration-200",
        className
      )}
      style={{
        backgroundColor,
      }}
      onClick={onClick}
    >
      {children}
      <p className="mt-1 select-none text-center text-xs font-light text-red-500">
        {description}
      </p>
    </div>
  )
}

export default CheckButton
