import './PanelHeader.css';
import { PanelHeader } from '@vkontakte/vkui';
import { IconArrowLeftOutline } from 'src/assets/icons';
import * as React from 'react';

export function Header({
  back,
  children,
  after,
  isHome = false,
}: {
  back?: () => void;
  children?: React.ReactNode;
  after?: React.ReactNode;
  isHome?: boolean;
}) {
  return (
    <PanelHeader
      className={'header'}
      before={
        back ? (
          <div className={'back-button'} onClick={back}>
            <IconArrowLeftOutline />
          </div>
        ) : null
      }
      after={after ? <div className={'header-after'}>{after}</div> : null}
    >
      {isHome ? (
        <div className={'home-header'}>
          <div>ул. Ленина, 24</div>
          <div>412 квартир · 286 в приложении</div>
        </div>
      ) : (
        children
      )}
    </PanelHeader>
  );
}
