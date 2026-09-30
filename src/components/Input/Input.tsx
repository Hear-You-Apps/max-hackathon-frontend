import './Input.css';
import type { InputHTMLAttributes, ReactNode } from 'react';

export function Input({
  label,
  before,
  value,
  onChange,
  ...props
}: {
  label?: string;
  before?: ReactNode;
  value: string;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <div className={'input'}>
      {label && <div className="input-label">{label}</div>}
      <div className="input-field">
        {before && <span className="input-before">{before}</span>}
        <input {...props} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
