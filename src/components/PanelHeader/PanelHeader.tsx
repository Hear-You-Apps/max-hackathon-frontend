import './PanelHeader.css';
import { PanelHeader } from '@vkontakte/vkui';
import {
  IconArrowLeftOutline,
  IconNotificationOutline,
  IconNotificationsOff,
} from 'src/assets/icons';
import * as React from 'react';
import { useSelectedHouseStore, useUserStore } from 'src/storage';
import declOfNum from 'src/functions/declOfNum.ts';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/client.ts';

export function Header({
  isBack,
  children,
  after,
  isHome = false,
}: {
  isBack?: boolean;
  children?: React.ReactNode;
  after?: React.ReactNode | 'notifications';
  isHome?: boolean;
}) {
  const { user, setUser } = useUserStore();
  const { house } = useSelectedHouseStore();
  const notifications = user.user.notificationsEnabled;

  const navigate = useNavigate();

  const toggleNotifications = () => {
    api.updateMyNotifications({ notificationsEnabled: !notifications }).then(() => {
      setUser({
        ...user,
        user: {
          ...user.user,
          notificationsEnabled: !notifications,
        },
      });
    });
  };

  return (
    <PanelHeader
      className={'header'}
      before={
        isBack ? (
          <div className={'back-button'} onClick={() => navigate(-1)}>
            <IconArrowLeftOutline />
          </div>
        ) : null
      }
      after={
        after ? (
          after === 'notifications' ? (
            <div style={{ padding: 8 }}>
              {notifications ? (
                <IconNotificationOutline onClick={toggleNotifications} />
              ) : (
                <IconNotificationsOff onClick={toggleNotifications} />
              )}
            </div>
          ) : (
            <div className={'header-after'}>{after}</div>
          )
        ) : null
      }
    >
      {isHome ? (
        <div className={'home-header'}>
          <div>{house?.address}</div>
          <div>
            {declOfNum(house?.apartmentsCount ?? 0, ['квартира', 'квартиры', 'квартир'])} ·{' '}
            {house?.residentsCount ?? 0} в приложении
          </div>
        </div>
      ) : (
        children
      )}
    </PanelHeader>
  );
}
