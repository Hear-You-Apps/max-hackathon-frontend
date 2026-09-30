import type { ComponentProps } from 'react';
import type { RequestCategory, RequestDto, RequestStatus } from 'src/api/api';
import { IconRequestsDone, IconRequestsNeighbors } from 'src/assets/icons';
import { Badge, Button, Card } from 'src/components';
import declOfNum from 'src/functions/declOfNum';

const statuses: Record<
  RequestStatus,
  { text: string; mode: ComponentProps<typeof Badge>['mode'] }
> = {
  submitted: { text: 'Отправлена', mode: 'neutral' },
  in_review: { text: 'На рассмотрении', mode: 'yellow' },
  in_progress: { text: 'Решается', mode: 'primary' },
  resolved: { text: 'Решено · ждёт подтверждения', mode: 'positive' },
  closed: { text: 'Решено', mode: 'positive' },
  cancelled: { text: 'Отменена', mode: 'negative' },
};

const categories: Record<RequestCategory, string> = {
  management: 'УК',
  electrician: 'Электрик',
  plumber: 'Сантехник',
  duty: 'Дежурная',
};

function formatDate(value: string) {
  const date = new Date(value);
  const today = new Date();
  const days = Math.round(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      86400000,
  );

  if (days === 0) return 'сегодня';
  if (days === 1) return 'вчера';
  if (days > 1 && days < 7) return `${declOfNum(days, ['день', 'дня', 'дней'])} назад`;

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    ...(date.getFullYear() !== today.getFullYear() && { year: 'numeric' }),
  });
}

export function RequestCard({
  request,
  managementCompanyName,
  onUnavailableAction,
}: {
  request: RequestDto;
  managementCompanyName: string | null;
  onUnavailableAction: () => void;
}) {
  const status = statuses[request.status];
  const company = managementCompanyName ? `УК «${managementCompanyName}»` : '';
  const subtitle = [
    request.category === 'management' && company ? '' : categories[request.category],
    company,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card
      title={request.title}
      subtitle={subtitle}
      badge={<Badge mode={status.mode} text={status.text} />}
      after={
        <span className="request-date">
          № {request.number} · {formatDate(request.createdAt)}
        </span>
      }
      bottom={
        request.status === 'resolved' && request.isMine ? (
          <div className="request-actions">
            <Button mode="themed" onClick={onUnavailableAction}>
              <IconRequestsDone /> Подтвердить
            </Button>
            <Button mode="outline" onClick={onUnavailableAction}>
              Не решено
            </Button>
          </div>
        ) : request.subscribersCount > 0 ? (
          <div className="request-neighbors">
            <IconRequestsNeighbors />
            <span>{declOfNum(request.subscribersCount, ['сосед', 'соседа', 'соседей'])}</span>
          </div>
        ) : undefined
      }
    />
  );
}
