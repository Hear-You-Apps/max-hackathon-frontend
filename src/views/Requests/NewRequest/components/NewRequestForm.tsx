import { Panel as MaxPanel, Switch } from '@maxhub/max-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import type { MyHouseDto, RequestCategory, RequestLocationType } from 'src/api/api';
import { api } from 'src/api/client';
import { IconClose, IconLocationOutline } from 'src/assets/icons';
import { useMaxBackButton } from 'src/bridge/useMaxBackButton';
import { Button, Header, Input } from 'src/components';
import { paths } from 'src/navigation/routes';
import { RequestAttachments } from './RequestAttachments';

export function NewRequestForm({ house }: { house: MyHouseDto }) {
  const navigate = useNavigate();
  const apartment = house.membership.apartments.find(
    (apartment) => apartment.verificationStatus === 'verified',
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<RequestCategory>('management');
  const [locationType, setLocationType] = useState<RequestLocationType>('entrance');
  const [locationText, setLocationText] = useState('');
  const [showNeighbors, setShowNeighbors] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const submitting = useRef(false);
  const active = useRef(true);
  const uploadedFiles = useRef(new Map<File, string>());

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  const close = useCallback(() => {
    if (!submitting.current) navigate(paths.requests, { replace: true });
  }, [navigate]);

  useMaxBackButton(true, close);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Укажите тему и опишите проблему');
      return;
    }
    if (locationType === 'apartment') {
      if (!apartment) {
        setError('Для заявки нужна подтверждённая квартира');
        return;
      }
    } else if (!locationText.trim()) {
      setError('Уточните место проблемы');
      return;
    }

    submitting.current = true;
    setIsSubmitting(true);

    try {
      const attachmentIds: string[] = [];
      for (const [index, file] of files.entries()) {
        if (!active.current) return;
        let fileId = uploadedFiles.current.get(file);
        if (!fileId) {
          setProgress(`Загрузка файлов ${index + 1} из ${files.length}`);
          const { data } = await api.uploadHouseFile(house.id, { file });
          fileId = data.id;
          uploadedFiles.current.set(file, fileId);
        }
        attachmentIds.push(fileId);
      }

      if (!active.current) return;
      setProgress('Отправка заявки…');
      const { data } = await api.createRequest(house.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        locationType,
        ...(locationType === 'apartment'
          ? { apartmentId: apartment?.id }
          : { locationText: locationText.trim() }),
        visibility: showNeighbors ? 'house' : 'private',
        attachmentIds,
      });

      if (!active.current) return;
      navigate(generatePath(paths.request, { requestId: data.id }), {
        replace: true,
        state: { requestNumber: data.number, created: true },
      });
    } catch (cause) {
      if (!active.current) return;
      let message = 'Не удалось отправить заявку. Попробуйте ещё раз';
      if (typeof cause === 'object' && cause !== null && 'error' in cause) {
        const response = cause.error;
        if (typeof response === 'object' && response !== null && 'message' in response) {
          if (typeof response.message === 'string') message = response.message;
          else if (Array.isArray(response.message)) {
            message =
              response.message.filter((item) => typeof item === 'string').join('. ') || message;
          }
        }
      }
      setError(message);
    } finally {
      submitting.current = false;
      if (active.current) {
        setIsSubmitting(false);
        setProgress('');
      }
    }
  }

  return (
    <>
      <Header
        isBack
        separator={false}
        after={
          <button
            type="button"
            className="new-request-close"
            disabled={isSubmitting}
            onClick={close}
          >
            <IconClose />
          </button>
        }
      >
        <span className="new-request-title">Новая заявка</span>
      </Header>
      <MaxPanel className="page-content new-request">
        <form onSubmit={submit}>
          <fieldset className="new-request-fields" disabled={isSubmitting}>
            <Input
              label="Тема"
              name="title"
              placeholder="Что случилось?"
              value={title}
              onChange={setTitle}
              maxLength={255}
              required
            />

            <div className="new-request-field">
              <span>Описание</span>
              <textarea
                name="description"
                placeholder="Опишите проблему"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={10000}
                required
              />
            </div>

            <div className="new-request-field">
              <span>Категория, исполнителя назначит УК</span>
              <div className="new-request-choices">
                {(
                  [
                    ['management', 'УК'],
                    ['electrician', 'Электрик'],
                    ['plumber', 'Сантехник'],
                    ['duty', 'Дежурная'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`requests-filter ${category === value ? 'selected' : ''}`}
                    onClick={() => setCategory(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="new-request-field">
              <span>Где</span>
              <div className="new-request-choices">
                {(
                  [
                    ['apartment', 'Моя квартира'],
                    ['entrance', 'Подъезд и этаж'],
                    ['yard', 'Двор'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`requests-filter ${locationType === value ? 'selected' : ''}`}
                    onClick={() => setLocationType(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {locationType === 'apartment' ? (
              apartment ? (
                <div className="new-request-location">
                  <IconLocationOutline />
                  <span>Квартира {apartment.number}</span>
                </div>
              ) : (
                <div className="new-request-hint">
                  У вас пока нет подтверждённых квартир в этом доме
                </div>
              )
            ) : (
              <Input
                before={<IconLocationOutline />}
                name="locationText"
                placeholder={
                  locationType === 'entrance' ? 'Подъезд, этаж, место' : 'Уточните место во дворе'
                }
                value={locationText}
                onChange={setLocationText}
                maxLength={500}
                required
              />
            )}

            <RequestAttachments files={files} onChange={setFiles} disabled={isSubmitting} />

            <div
              className="new-request-visibility"
              onClick={() => {
                if (!isSubmitting) setShowNeighbors((value) => !value);
              }}
            >
              <div>
                <span>Показать соседям</span>
                <span>Смогут присоединиться к этой заявке</span>
              </div>
              <Switch
                checked={showNeighbors}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => setShowNeighbors(event.target.checked)}
                disabled={isSubmitting}
              />
            </div>

            {error && <div className="new-request-error">{error}</div>}

            <Button
              type="submit"
              disabled={isSubmitting || (locationType === 'apartment' && !apartment)}
            >
              {isSubmitting ? progress || 'Отправка заявки…' : 'Отправить заявку'}
            </Button>
            <div className="new-request-hint">
              Заявка уйдёт диспетчеру{' '}
              {house.managementCompanyName ? `УК «${house.managementCompanyName}»` : 'УК'}. Следить
              за статусом можно в разделе «Заявки».
            </div>
          </fieldset>
        </form>
      </MaxPanel>
    </>
  );
}
