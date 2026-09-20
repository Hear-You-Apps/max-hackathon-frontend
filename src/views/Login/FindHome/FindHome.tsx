import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';

import './FindHome.css';
import { Button, Header } from 'src/components';
import { useState } from 'react';
import { IconHomeOutline } from 'src/assets/icons';
import { paths } from 'src/navigation/routes.ts';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'src/storage';

export function FindHome({ id, onBack }: { id: string; onBack: () => void }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [inputValue, setInputValue] = useState(user.home ?? '');
  //const [error, setError] = useState<boolean>(false);
  const [home, setHome] = useState<{ address: string; text: string } | undefined>(undefined);

  const navigate = useNavigate();

  const find = () => {
    setHome({
      address: 'ул. Ленина, 24',
      text: 'УК «Жилсервис» · 412 квартир · 286 жителей уже в приложении',
    });
  };

  const set = () => {
    setUser({ ...user, home: ['LEN-54-3Q'] });
    navigate(paths.setHome, { state: { from: paths.findHome } });
  };

  return (
    <Panel id={id}>
      <Header title={'Код дома'} back={onBack} />
      <MaxPanel className="page-content find-home">
        <div className="tip">
          Введите код с доски объявлений или из сообщения администратора. Код выглядит как три части
          через дефис.
        </div>

        <div className={'find-input'}>
          <div>Код дома</div>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={'Код дома'}
          />
        </div>

        <Button disabled={!inputValue} onClick={() => find()}>
          Найти дом
        </Button>

        {home ? (
          <>
            <div className={'found-home'}>
              <div className={'badge'}>Дом найден</div>
              <div className={'home-container'}>
                <div className={'home-icon'}>
                  <IconHomeOutline />
                </div>
                <div className={'home-info'}>
                  <div>{home.address}</div>
                  <div>{home.text}</div>
                </div>
              </div>
            </div>

            <Button onClick={() => set()}>Это мой дом, продолжить</Button>

            <Button
              mode={'outline'}
              onClick={() => {
                setInputValue('');
                setHome(undefined);
              }}
            >
              Ввести другой код
            </Button>
          </>
        ) : null}
      </MaxPanel>
    </Panel>
  );
}
