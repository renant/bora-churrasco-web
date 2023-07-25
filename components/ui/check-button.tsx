import React from 'react';

interface CheckButtonProps {
  children: React.ReactNode,
  description: string
  isChecked: boolean
  onClick: () => void
}

const CheckButton = ({ children, description, isChecked, onClick }: CheckButtonProps) => {
  const backgroundColor = isChecked ? 'rgba(255, 165, 0, 0.5)' : 'transparent';
  const lineColor = isChecked ? '#ff4500' : '#ffa500';

  return (
    <div
      className='flex flex-col h-24 w-24 items-center justify-center p-2 border border-orange-400 rounded-md hover:cursor-pointer'
      style={{
        backgroundColor,
      }}
      onClick={onClick}
    >
      {children}
      <p
        className='select-none text-xs text-center font-light text-orange-400 mt-1'
      >
        {description}
      </p>
    </div>
  );
};


export default CheckButton;