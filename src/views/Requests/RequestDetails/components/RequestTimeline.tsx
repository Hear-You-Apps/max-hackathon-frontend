import type { RequestEventDto, RequestStatus } from 'src/api/api';
import { IconDone } from 'src/assets/icons';
import { requestStatuses } from '../../constants';

export function RequestTimeline({
  events,
  status,
}: {
  events: RequestEventDto[];
  status: RequestStatus;
}) {
  const nextStatuses: RequestStatus[] =
    status === 'submitted'
      ? ['in_review', 'in_progress', 'resolved']
      : status === 'in_review'
        ? ['in_progress', 'resolved']
        : status === 'in_progress'
          ? ['resolved']
          : [];

  return (
    <div className="request-timeline">
      <div className="request-timeline-title">Статус</div>
      {events.map((event, index) => {
        const current = index === events.length - 1;
        const done =
          event.status === 'resolved' ||
          event.status === 'closed' ||
          (!current && (event.status === 'submitted' || event.status === 'in_review'));
        const mode =
          event.status === 'cancelled' ? 'cancelled' : done ? 'done' : current ? 'current' : 'past';
        const date = new Date(event.createdAt);

        return (
          <div key={event.id} className={`request-timeline-event ${mode}`}>
            <div className="request-timeline-marker">{done && <IconDone />}</div>
            <div className="request-timeline-body">
              <div className="request-timeline-label">
                {event.status === 'resolved'
                  ? 'Решено'
                  : event.status === 'closed'
                    ? 'Закрыта'
                    : requestStatuses[event.status].text}
              </div>
              <div className="request-timeline-date">
                {date.toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  ...(date.getFullYear() !== new Date().getFullYear() && { year: 'numeric' }),
                })}
                {(event.status === 'submitted' || event.status === 'in_review') &&
                  `, ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`}
                {event.comment && event.status !== 'in_review' && ` · ${event.comment}`}
              </div>
              {event.comment && event.status === 'in_review' && (
                <div className="request-timeline-comment">{event.comment}</div>
              )}
            </div>
          </div>
        );
      })}
      {events.length === 0 && (
        <div className="request-timeline-label">{requestStatuses[status].text}</div>
      )}
      {nextStatuses.map((nextStatus) => (
        <div key={nextStatus} className="request-timeline-event pending">
          <div className="request-timeline-body">
            <div className="request-timeline-label">
              {nextStatus === 'resolved' ? 'Решено' : requestStatuses[nextStatus].text}
            </div>
            {nextStatus === 'resolved' && (
              <div className="request-timeline-date">Подтвердите результат после выполнения</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
