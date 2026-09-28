import { Panel as MaxPanel, Switch } from '@maxhub/max-ui';
import { Panel, ScreenSpinner } from '@vkontakte/vkui';
import { Button, Header, Input } from 'src/components';

import './SetHome.css';

import { useUserStore } from 'src/storage';
import { IconClock, IconHomeOutline } from 'src/assets/icons';
import { useEffect, useEffectEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from 'src/api/client.ts';
import useSetHouseStore from 'src/storage/atoms/setHouse/setHouse.ts';
import { paths } from 'src/navigation/routes.ts';
//import { paths } from 'src/navigation/routes.ts';

export function SetHome({
  id,
  onBack,
  requests,
}: {
  id: string;
  onBack?: () => void;
  requests?: boolean;
}) {
  const { user, setUser } = useUserStore();
  const { house } = useSetHouseStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [flat, setFlat] = useState<string>('');
  const [name, setName] = useState<string>(user.user.firstName + ' ' + user.user.lastName);
  const [role, setRole] = useState<'owner' | 'tenant'>('owner');
  const [notifications, setNotifications] = useState<boolean>(true);
  const [hasJoinRequests, setHasJoinRequests] = useState<boolean>(requests!);

  const navigate = useNavigate();
  const location = useLocation();
  const code = (location.state as { code?: string } | null)?.code ?? '';

  const home = house;

  useEffect(() => {
    if (!house && !(user.joinRequests?.length ?? 0)) {
      navigate(paths.meets, { replace: true });
    }
  }, [house, navigate, user.joinRequests]);

  const checkRequest = useEffectEvent(async () => {
    setLoading(true);
    if (!house) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.getMyHouses();
      const joinRequests = res.data.joinRequests ?? [];

      const hasRequestForCurrentHouse = joinRequests.some(
        (request) => request.house.id === house.id,
      );

      setHasJoinRequests(hasRequestForCurrentHouse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkRequest();
  }, []);

  /*useEffect(() => {
    if (!home) navigate(-1);
  }, [home, navigate]);*/

  const addHome = async () => {
    console.log(home);
    try {
      const res = await api.joinHouse({
        code,
        apartmentNumber: flat,
        displayName: name,
        relationship: role,
        notifications: {
          meetings: notifications,
          requests: notifications,
        },
      });
      console.log(res);

      setUser({
        ...user,
        joinRequests: [...(user.joinRequests ?? []), res.data],
      });
      //navigate(paths.meets, { state: { from: paths.setHome }, replace: true });
      setHasJoinRequests(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Panel id={id}>
      <Header back={onBack}>Ваш дом</Header>
      <MaxPanel className="page-content set-home">
        {loading ? (
          <ScreenSpinner />
        ) : hasJoinRequests ? (
          <>
            <div className={'has-request-card'}>
              <div className={'request-card__icon'}>
                <IconClock />
              </div>
              <div className={'request-card__title'}>Отправили ваш запрос</div>
              <div className={'request-card__text'}>
                Осталось, чтобы администратор дома подтвердил вашу квартиру. После проверки
                откроется доступ к приложению
              </div>
            </div>
            <Button onClick={() => navigate(paths.findHome, { replace: true })}>
              Отправить ещё одну заявку
            </Button>
          </>
        ) : (
          <>
            <div className={'home-container'}>
              <div className={'home-icon'}>
                <IconHomeOutline />
              </div>
              <div className={'home-info'}>
                <div>{home ? home.address : ''}</div>
                <div>
                  {home
                    ? `УК «${home.managementCompanyName}» · ${home.apartmentsCount} квартир · ${home.residentsCount} жителей уже в приложении`
                    : ''}
                </div>
              </div>
            </div>

            <div className={'home-settings'}>
              <Input
                value={flat}
                onChange={(v) => setFlat(v)}
                placeholder={'Номер квартиры'}
                label={'Квартира'}
              />
              <Input
                value={name}
                onChange={(v) => setName(v)}
                placeholder={'Имя'}
                label={'Как вас называть'}
              />

              <div className={'role-select'}>
                <div>Кто вы в этой квартире?</div>
                <div className={'selector'}>
                  <div
                    onClick={() => setRole('owner')}
                    className={`selector-item ${role === 'owner' ? 'selected' : ''}`}
                  >
                    Собственник
                  </div>
                  <div
                    onClick={() => setRole('tenant')}
                    className={`selector-item ${role === 'tenant' ? 'selected' : ''}`}
                  >
                    Наниматель
                  </div>
                </div>
                <div className={'selector-text'}>
                  Роль подтвердит администратор дома. Совет дома и организаторов назначает тоже он.
                  Наниматели участвуют в опросах и отметках, но не голосуют по решениям.
                </div>
              </div>
            </div>

            <div className={'settings-notifications'}>
              <div className={'notifications-text'}>
                <div>Уведомления о собраниях и заявках</div>
                <div>Придут в личные сообщения от бота</div>
              </div>
              <Switch
                defaultChecked
                value={Number(notifications)}
                onChange={() => setNotifications(!notifications)}
              />
            </div>

            <Button disabled={!flat || !name} onClick={addHome}>
              Отправить на подтверждение
            </Button>

            <div className={'settings-tip'}>
              Пока администратор не подтвердил квартиру, можно смотреть собрания и заявки, но нельзя
              голосовать и создавать.
            </div>
          </>
        )}
      </MaxPanel>
    </Panel>
  );
}
