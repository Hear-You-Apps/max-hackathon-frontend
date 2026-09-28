import './PanelHeader.css';
import { PanelHeader } from '@vkontakte/vkui';
import { IconArrowLeftOutline } from 'src/assets/icons';
import * as React from 'react';
import { useUserStore } from 'src/storage';

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
  const { user } = useUserStore();
  const home = user.houses[0];

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
          <div>{home.address}</div>
          <div>
            {home.apartmentsCount} квартир · {home.residentsCount ?? 0} в приложении
          </div>
        </div>
      ) : (
        children
      )}
    </PanelHeader>
  );
}
