import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Snackbar } from '@vkontakte/vkui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MyHouseDto, RequestsScope } from 'src/api/api';
import { IconRequestsAdd } from 'src/assets/icons';
import { Button } from 'src/components';
import { paths } from 'src/navigation/routes';
import { RequestsItems } from './RequestsItems';

export function RequestsList({ house }: { house: MyHouseDto }) {
  const navigate = useNavigate();
  const [scope, setScope] = useState<RequestsScope>('mine');
  const [status, setStatus] = useState<'all' | 'open' | 'completed'>('all');
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
            onClick={() => setScope(value)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={`requests-filter ${status === 'open' ? 'selected' : ''}`}
          onClick={() => setStatus(status === 'open' ? 'all' : 'open')}
        >
          Открытые
        </button>
        <button
          type="button"
          className={`requests-filter ${status === 'completed' ? 'selected' : ''}`}
          onClick={() => setStatus(status === 'completed' ? 'all' : 'completed')}
        >
          Решённые
        </button>
      </div>

      <RequestsItems
        key={`${scope}-${status}`}
        house={house}
        scope={scope}
        status={status}
        onUnavailableAction={() => {}}
      />

      {notice && (
        <Snackbar key={notice} onClosed={() => setNotice('')} offsetY={92}>
          {notice}
        </Snackbar>
      )}
    </MaxPanel>
  );
}
