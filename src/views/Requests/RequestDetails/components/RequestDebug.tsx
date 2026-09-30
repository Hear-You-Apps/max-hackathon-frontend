import { useEffect, useRef, useState } from 'react';
import type { RequestDetailsResponseDto, RequestStatus } from 'src/api/api';
import { api } from 'src/api/client';
import { Button, Input } from 'src/components';
import { requestStatuses } from '../../constants';

export function RequestDebug({
  request,
  disabled,
  onUpdated,
  onBusyChange,
}: {
  request: RequestDetailsResponseDto;
  disabled: boolean;
  onUpdated: (request: RequestDetailsResponseDto) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | null>(null);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const status = selectedStatus ?? request.status;

  useEffect(() => {
    return () => {
      controller.current?.abort();
      onBusyChange(false);
    };
  }, [onBusyChange]);

  const updateStatus = async () => {
    if (disabled || controller.current || (!changed && status === request.status)) return;

    const operation = new AbortController();
    controller.current = operation;
    setSaving(true);
    setError('');
    setSuccess(false);
    onBusyChange(true);
    let statusUpdated = changed;

    try {
      if (!changed) {
        await api.debugUpdateRequestStatus(
          { requestId: request.id, status, ...(comment.trim() && { comment: comment.trim() }) },
          { signal: operation.signal },
        );
        if (operation.signal.aborted) return;
        statusUpdated = true;
        setChanged(true);
      }

      const { data } = await api.getRequest(request.id, { signal: operation.signal });
      if (operation.signal.aborted) return;
      onUpdated(data);
      setSelectedStatus(null);
      setComment('');
      setChanged(false);
      setSuccess(true);
    } catch {
      if (!operation.signal.aborted) {
        setError(
          statusUpdated
            ? 'Статус изменён, но не удалось обновить карточку. Попробуйте загрузить её ещё раз'
            : 'Не удалось изменить статус. Попробуйте ещё раз',
        );
      }
    } finally {
      controller.current = null;
      if (!operation.signal.aborted) {
        setSaving(false);
        onBusyChange(false);
      }
    }
  };

  return (
    <div className="request-debug">
      <div className="request-debug-title">Дебаг заявки</div>
      <div className="request-details-caption">
        Дебаг-функционал для проверки возможностей администратора. При смене статуса уведомления
        отправляются автору и подписчикам, если они включены в профиле.
      </div>
      <div className="request-debug-statuses">
        {Object.entries(requestStatuses).map(([value, item]) => (
          <button
            key={value}
            type="button"
            className={`requests-filter ${status === value ? 'selected' : ''}`}
            disabled={disabled || saving || changed}
            onClick={() => {
              setSelectedStatus(value as RequestStatus);
              setSuccess(false);
            }}
          >
            {value === 'closed' ? 'Закрыта' : item.text}
          </button>
        ))}
      </div>
      <Input
        label="Комментарий (необязательно)"
        placeholder="Например, бригада выедет завтра"
        value={comment}
        onChange={setComment}
        maxLength={2000}
        disabled={disabled || saving || changed}
      />
      {error && <div className="request-debug-error">{error}</div>}
      {success && <div className="request-debug-success">Статус обновлён</div>}
      <Button
        mode="themed"
        disabled={disabled || saving || (!changed && status === request.status)}
        onClick={updateStatus}
      >
        {saving
          ? changed
            ? 'Обновление…'
            : 'Сохранение…'
          : changed
            ? 'Обновить карточку'
            : 'Изменить статус'}
      </Button>
    </div>
  );
}
