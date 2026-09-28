import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, ScreenSpinner } from '@vkontakte/vkui';

import './FindHome.css';
import { Button, Header } from 'src/components';
import { useState } from 'react';
import { IconHomeOutline } from 'src/assets/icons';
import { paths } from 'src/navigation/routes.ts';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/client.ts';
import type { FoundHouseDto } from 'src/api/api.ts';
import useSetHouseStore from 'src/storage/atoms/setHouse/setHouse.ts';

export function FindHome({ id, onBack }: { id: string; onBack: () => void }) {
  const { setHouse } = useSetHouseStore();

  const [inputValue, setInputValue] = useState('NEV-64-A7');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [home, setHome] = useState<
    { address: string; text: string; data: FoundHouseDto } | undefined
  >(undefined);

  const navigate = useNavigate();

  const find = async () => {
    setError(null);
    setHome(undefined);
    setLoading(true);

    try {
      const res = await api.searchHouse({ code: inputValue });
      setLoading(false);

      setHome({
        data: res.data.house,
        address: res.data.house.address,
        text: `УК «${res.data.house.managementCompanyName}» · ${res.data.house.apartmentsCount} квартир · ${res.data.house.residentsCount} жителей уже в приложении`,
      });
    } catch (error) {
      setLoading(false);
      console.error('Search house error:', error);

      if (
        typeof error === 'object' &&
        error !== null &&
        'error' in error &&
        typeof error.error === 'object' &&
        error.error !== null &&
        'code' in error.error
      ) {
        const apiError = error.error as { code?: string; message?: string };

        if (apiError.code === 'INVITATION_NOT_FOUND') {
          setError('Дом с таким кодом приглашения не найден');
          return;
        }

        setError(apiError.message ?? 'Не удалось найти дом');
        return;
      }

      setError('Не удалось выполнить поиск дома');
    }
  };

  const set = () => {
    if (!home) return;

    setHouse(home.data);
    navigate(paths.setHome, {
      state: {
        from: paths.findHome,
        code: inputValue,
      },
    });
  };

  return (
    <Panel id={id}>
      <Header back={onBack}>Код дома</Header>
      <MaxPanel className="page-content find-home">
        {loading ? <ScreenSpinner /> : null}

        <div className="tip">
          Введите код с доски объявлений или из сообщения администратора. Код выглядит как три части
          через дефис.
        </div>

        <div className={'find-input'}>
          <div>Код дома</div>
          <input
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value
                .toUpperCase()
                .replace(/[^A-ZА-Я0-9]/g, '')
                .slice(0, 7);

              let formatted = value;

              if (value.length > 3) {
                formatted = `${value.slice(0, 3)}-${value.slice(3, 5)}`;

                if (value.length > 5) {
                  formatted += `-${value.slice(5)}`;
                }
              }

              setInputValue(formatted);
              setError(null);
            }}
            placeholder="Код дома"
            maxLength={9}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        <Button disabled={inputValue.length < 9} onClick={find}>
          Найти дом
        </Button>

        {error}

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
