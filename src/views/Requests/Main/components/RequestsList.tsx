import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Snackbar } from '@vkontakte/vkui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MyHouseDto } from 'src/api/api';
import { IconRequestsAdd } from 'src/assets/icons';
import { Button } from 'src/components';
import { paths } from 'src/navigation/routes';
import { useRequestsStore } from 'src/storage';
import { RequestsItems } from './RequestsItems';

export function RequestsList({ house }: { house: MyHouseDto }) {
  const navigate = useNavigate();
  const { filters, setFilters } = useRequestsStore();
  const { scope = 'mine', status = 'all' } = filters[house.id] ?? {};
  const [notice, setNotice] = useState('');

  return (
    <MaxPanel className="page-content requests">
      <Button className="requests-create" onClick={() => navigate(paths.newRequest)}>
        <IconRequestsAdd /> Создать заявку
      </Button>

      <div className="requests-filters">
        {(
          [
            ['mine', 'Мои'],
            ['house', 'Все по дому'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`requests-filter ${scope === value ? 'selected' : ''}`}
            onClick={() => setFilters(house.id, { scope: value, status })}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={`requests-filter ${status === 'open' ? 'selected' : ''}`}
          onClick={() =>
            setFilters(house.id, { scope, status: status === 'open' ? 'all' : 'open' })
          }
        >
          Открытые
        </button>
        <button
          type="button"
          className={`requests-filter ${status === 'completed' ? 'selected' : ''}`}
          onClick={() =>
            setFilters(house.id, { scope, status: status === 'completed' ? 'all' : 'completed' })
          }
        >
          Решённые
        </button>
      </div>

      <RequestsItems
        key={`${scope}-${status}`}
        house={house}
        scope={scope}
        status={status}
        onUnavailableAction={() => setNotice('Подтверждение решения пока недоступно')}
      />

      {notice && (
        <Snackbar key={notice} onClosed={() => setNotice('')} offsetY={92}>
          {notice}
        </Snackbar>
      )}
    </MaxPanel>
  );
}
