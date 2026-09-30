import type { FileDto, RequestDetailsResponseDto } from 'src/api/api';
import { Badge, Card } from 'src/components';
import { requestStatuses } from '../../constants';
import { RequestFile } from './RequestFile';

export function RequestInfo({
  request,
  company,
  onOpenFile,
}: {
  request: RequestDetailsResponseDto;
  company?: string | null;
  onOpenFile: (preview: { file: FileDto; url: string }) => void;
}) {
  const status = requestStatuses[request.status];
  const author = request.author?.name || 'Аккаунт удалён';
  const apartment = request.apartment ? `, кв. ${request.apartment.number}` : '';
  const recipient = company ? `УК «${company}»` : 'УК';
  const date = new Date(request.createdAt);

  return (
    <div className="request-info">
      <Card
        badge={<Badge mode={status.mode} text={status.text} />}
        after={
          <span className="request-details-caption">
            Создана{' '}
            {date.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              ...(date.getFullYear() !== new Date().getFullYear() && { year: 'numeric' }),
            })}
          </span>
        }
        title={request.title}
        subtitle={`Автор: ${author}${apartment} · Кому: ${recipient}`}
      >
        <div className="request-description">{request.description}</div>
        {request.attachments.length > 0 && (
          <div className="request-files">
            {request.attachments.map((file) => (
              <RequestFile key={file.id} file={file} onOpen={onOpenFile} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
