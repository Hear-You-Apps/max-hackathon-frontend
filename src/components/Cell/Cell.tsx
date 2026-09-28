import './Cell.css';
import type { ReactNode } from 'react';

export const Cell = ({
  icon,
  label,
  text,
  after,
  size = 'm',
}: {
  icon: ReactNode;
  label: string;
  text: string;
  after?: ReactNode;
  size?: 'm' | 'l';
}) => {
  return (
    <div className={'cell'}>
      <div className={`cell__icon icon-${size}`}>{icon}</div>
      <div className={'cell__text'}>
        <div className={'cell__label'}>{label}</div>
        <div className={'cell__sub'}>{text}</div>
      </div>
      {after ? <div className={'cell__after'}>{after}</div> : null}
    </div>
  );
};
