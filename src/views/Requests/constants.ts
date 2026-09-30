import type { ComponentProps } from 'react';
import type { RequestStatus } from 'src/api/api';
import type { Badge } from 'src/components';

export const requestStatuses: Record<
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
