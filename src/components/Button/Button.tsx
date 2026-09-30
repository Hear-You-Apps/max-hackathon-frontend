import './Button.css';
import * as React from 'react';

export function Button({
  className,
  children,
  onClick,
  disabled,
  type = 'button',
  mode = 'primary',
}: {
  className?: string;
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  mode?: 'primary' | 'secondary' | 'outline' | 'themed';
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`primary-button ${className ?? ''} ${disabled ? 'disabled' : ''} ${mode}`}
    >
      {children}
    </button>
  );
}
