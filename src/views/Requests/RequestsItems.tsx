import { Spinner } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import type { MyHouseDto, RequestsResponseDto, RequestsScope } from 'src/api/api';
import { api } from 'src/api/client';
import { Button } from 'src/components';
import { RequestCard } from './RequestCard';

export function RequestsItems({
  house,
  scope,
  status,
  onUnavailableAction,
}: {
  house: MyHouseDto;
  scope: RequestsScope;
  status: 'all' | 'open' | 'completed';
  onUnavailableAction: () => void;
}) {
  const [result, setResult] = useState<RequestsResponseDto>();
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState(false);
  const loading = !error && (!result || page > result.page);

  useEffect(() => {
    const controller = new AbortController();

    async function getRequests() {
      try {
        const { data } = await api.getHouseRequests(
          house.id,
          { scope, status, page, limit: 20 },
          { signal: controller.signal },
        );
        if (controller.signal.aborted) return;

        setResult((previous) => ({
          ...data,
          items:
            page === 1
              ? data.items
              : [
                  ...(previous?.items ?? []),
                  ...data.items.filter(
                    (item) => !previous?.items.some((existing) => existing.id === item.id),
                  ),
                ],
        }));
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }

    void getRequests();
    return () => controller.abort();
  }, [house.id, scope, status, page, attempt]);

  return (
    <div className="requests-list" aria-label="Список заявок" aria-busy={loading}>
      {result?.items.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          managementCompanyName={house.managementCompanyName}
          onUnavailableAction={onUnavailableAction}
        />
      ))}

      {loading && <Spinner className="requests-spinner" size="l" aria-label="Загрузка заявок" />}

      {error && (
        <div className="requests-state" role="alert">
          <span>Не удалось загрузить заявки</span>
          <Button
            mode="themed"
            onClick={() => {
              setError(false);
              setAttempt((value) => value + 1);
            }}
          >
            Попробовать снова
          </Button>
        </div>
      )}

      {!loading && !error && result?.items.length === 0 && (
        <div className="requests-state" role="status">
          {status === 'open'
            ? 'Открытых заявок пока нет'
            : status === 'completed'
              ? 'Решённых заявок пока нет'
              : scope === 'mine'
                ? 'У вас пока нет заявок'
                : 'В доме пока нет общих заявок'}
        </div>
      )}

      {!loading && !error && result && result.page * result.limit < result.total && (
        <Button mode="themed" onClick={() => setPage((value) => value + 1)}>
          Показать ещё
        </Button>
      )}
    </div>
  );
}
