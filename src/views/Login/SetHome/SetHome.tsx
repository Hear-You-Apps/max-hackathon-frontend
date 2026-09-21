import { Panel as MaxPanel, Switch } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';
import { Button, Header, Input } from 'src/components';

import './SetHome.css';

import { useUserStore } from 'src/storage';
import { IconHomeOutline } from 'src/assets/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/navigation/routes.ts';

export function SetHome({ id, onBack }: { id: string; onBack?: () => void }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [flat, setFlat] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<0 | 1>(0);
  const [notifications, setNotifications] = useState<0 | 1>(1);

  const navigate = useNavigate();

  const home = {
    address: 'ул. Ленина, 24',
    text: 'УК «Жилсервис» · 412 квартир · 286 жителей уже в приложении',
  };

  const addHome = () => {
    setUser({ ...user, status: 'logged' });
    navigate(paths.meets, { state: { from: paths.setHome }, replace: true });
  };

  return (
    <Panel id={id}>
      <Header back={onBack}>Ваш дом</Header>
      <MaxPanel className="page-content set-home">
        <div className={'home-container'}>
          <div className={'home-icon'}>
            <IconHomeOutline />
          </div>
          <div className={'home-info'}>
            <div>{home.address}</div>
            <div>{home.text}</div>
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
                onClick={() => setRole(0)}
                className={`selector-item ${role === 0 ? 'selected' : ''}`}
              >
                Собственник
              </div>
              <div
                onClick={() => setRole(1)}
                className={`selector-item ${role === 1 ? 'selected' : ''}`}
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
            value={notifications}
            onChange={() => setNotifications(notifications ? 0 : 1)}
          />
        </div>

        <Button disabled={!flat || !name} onClick={addHome}>
          Отправить на подтверждение
        </Button>

        <div className={'settings-tip'}>
          Пока администратор не подтвердил квартиру, можно смотреть собрания и заявки, но нельзя
          голосовать и создавать.
        </div>
      </MaxPanel>
    </Panel>
  );
}
