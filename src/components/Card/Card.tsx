import './Card.css';
import * as React from 'react';

export function Card({
  title,
  subtitle,
  badge,
  after,
  children,
  bottom,
  onClick,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  badge?: React.ReactNode;
  after?: React.ReactNode;
  bottom?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className={'card'} onClick={onClick}>
      <div className={'card-top'}>
        <div className={'card-badge'}>{badge}</div>
        <div className={'card-after'}>{after}</div>
      </div>
      <div className={'card-title'}>{title}</div>
      <div className={'card-subtitle'}>{subtitle}</div>
      <div className={'card-content'}>{children}</div>
      <div className={'card-bottom'}>{bottom}</div>
    </div>
  );
}
