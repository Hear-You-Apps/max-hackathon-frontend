import './Button.css';
import * as React from 'react';

export function Button({
  className,
  children,
  onClick,
  disabled,
  mode = 'primary',
}: {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
  mode?: 'primary' | 'secondary' | 'outline' | 'themed';
}) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`primary-button ${className ?? ''} ${disabled ? 'disabled' : ''} ${mode}`}
    >
      {children}
    </button>
  );
}
