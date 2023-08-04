import React from 'react'

interface CheckButtonProps {
  children: React.ReactNode
  description: string
  isChecked: boolean
  onClick: () => void
}

const CheckButton = ({
  children,
  description,
  isChecked,
  onClick,
}: CheckButtonProps) => {
  const backgroundColor = isChecked ? 'rgba(255, 165, 0, 0.5)' : 'transparent'
  const lineColor = isChecked ? '#ff4500' : '#ffa500'

  return (
    <div
      className="flex h-24 w-24 flex-col items-center justify-center rounded-md border border-orange-400 p-2 hover:cursor-pointer"
      style={{
        backgroundColor,
      }}
      onClick={onClick}
    >
      {children}
      <p className="mt-1 select-none text-center text-xs font-light text-orange-400">
        {description}
      </p>
    </div>
  )
}

export default CheckButton
