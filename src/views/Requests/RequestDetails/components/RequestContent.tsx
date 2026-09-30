import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Snackbar, Spinner } from '@vkontakte/vkui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FileDto, RequestDetailsResponseDto } from 'src/api/api';
import { api } from 'src/api/client';
import { IconPeopleOutline, IconShare } from 'src/assets/icons';
import { useMaxBackButton } from 'src/bridge/useMaxBackButton';
import { Button, Header } from 'src/components';
import declOfNum from 'src/functions/declOfNum';
import { paths } from 'src/navigation/routes';
import { useUserStore } from 'src/storage';
import { RequestInfo } from './RequestInfo';
import { RequestTimeline } from './RequestTimeline';
import { RequestFilePreview } from './RequestFilePreview';

export function RequestContent({ requestId }: { requestId: string }) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [request, setRequest] = useState<RequestDetailsResponseDto>();
  const [error, setError] = useState('');
  const [unavailable, setUnavailable] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [subscribing, setSubscribing] = useState(false);
  const [notice, setNotice] = useState('');
  const [preview, setPreview] = useState<{ file: FileDto; url: string }>();
  const subscription = useRef<AbortController | null>(null);
  const company = user.houses.find((house) => house.id === request?.houseId)?.managementCompanyName;
  const subscribersCount = request?.subscribersCount ?? 0;
  const joined =
    subscribersCount % 10 === 1 && subscribersCount % 100 !== 11
      ? 'присоединился'
      : 'присоединились';

  const closePreview = useCallback(() => setPreview(undefined), []);
  const goBack = useCallback(() => {
    if (preview) closePreview();
    else navigate(-1);
  }, [preview, closePreview, navigate]);
  useMaxBackButton(true, goBack);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRequest() {
      try {
        const { data } = await api.getRequest(requestId, { signal: controller.signal });
        if (!controller.signal.aborted) setRequest(data);
      } catch (cause) {
        if (controller.signal.aborted) return;
        const status = cause instanceof Response ? cause.status : undefined;
        const notAvailable = status === 403 || status === 404;
        setUnavailable(notAvailable);
        setError(notAvailable ? 'Заявка не найдена или недоступна' : 'Не удалось загрузить заявку');
      }
    }

    void loadRequest();
    return () => controller.abort();
  }, [requestId, attempt]);

  useEffect(() => () => subscription.current?.abort(), []);

  const toggleSubscription = async () => {
    if (!request || request.isMine || subscription.current) return;
    const controller = new AbortController();
    subscription.current = controller;
    setSubscribing(true);
    try {
      if (request.isSubscribed) {
        await api.unsubscribeFromRequest(requestId, { signal: controller.signal });
      } else {
        await api.subscribeToRequest(requestId, { signal: controller.signal });
      }
      if (controller.signal.aborted) return;
      setRequest({
        ...request,
        isSubscribed: !request.isSubscribed,
        subscribersCount: Math.max(0, request.subscribersCount + (request.isSubscribed ? -1 : 1)),
      });
    } catch {
      if (!controller.signal.aborted) {
        setNotice(request.isSubscribed ? 'Не удалось отписаться' : 'Не удалось присоединиться');
      }
    } finally {
      subscription.current = null;
      if (!controller.signal.aborted) setSubscribing(false);
    }
  };

  const share = async () => {
    if (!request) return;
    const bot = import.meta.env.VITE_MAX_BOT_USERNAME || 't364_hakaton_max_bot';
    const link = `https://max.ru/${bot}?startapp=request_${request.id}`;
    const text = `Заявка № ${request.number}: ${request.title}`;
    try {
      if (window.WebApp?.shareMaxContent) {
        await window.WebApp.shareMaxContent({ text, link });
      } else if (window.WebApp?.shareContent && window.WebApp.platform !== 'web') {
        await window.WebApp.shareContent({ link });
      } else if (navigator.share) {
        await navigator.share({ title: text, url: link });
      } else {
        await navigator.clipboard.writeText(link);
        setNotice('Ссылка скопирована');
      }
    } catch (cause) {
      if (!(cause instanceof DOMException && cause.name === 'AbortError')) {
        setNotice('Не удалось поделиться заявкой');
      }
    }
  };

  return (
    <>
      <Header
        isBack
        separator={false}
        after={
          request && (
            <button type="button" className="request-header-share" onClick={share}>
              <IconShare />
            </button>
          )
        }
      >
        <span className="request-header-title">
          {request ? `Заявка № ${request.number}` : 'Заявка'}
        </span>
      </Header>
      <MaxPanel className="page-content request-details">
        {!request && !error && <Spinner className="request-details-spinner" size="l" />}
        {error && (
          <div className="requests-state">
            {error}
            <Button
              mode="themed"
              onClick={() => {
                if (unavailable) navigate(paths.requests, { replace: true });
                else {
                  setError('');
                  setAttempt((value) => value + 1);
                }
              }}
            >
              {unavailable ? 'К списку заявок' : 'Попробовать снова'}
            </Button>
          </div>
        )}
        {request && (
          <>
            <RequestInfo request={request} company={company} onOpenFile={setPreview} />
            <RequestTimeline events={request.events} status={request.status} />
            <div className="request-details-actions">
              {!request.isMine && (
                <Button mode="themed" disabled={subscribing} onClick={toggleSubscription}>
                  <IconPeopleOutline />
                  {subscribing
                    ? 'Подождите…'
                    : request.isSubscribed
                      ? 'Отписаться'
                      : 'Присоединиться'}
                </Button>
              )}
              <Button mode="secondary" onClick={share}>
                <IconShare /> Поделиться
              </Button>
            </div>
            <div className="request-details-caption">
              {request.isSubscribed && <div>Вы присоединились к заявке.</div>}
              {subscribersCount > 0
                ? `Уже ${joined} ${declOfNum(subscribersCount, ['житель', 'жителя', 'жителей'])}.`
                : 'Пока никто не присоединился.'}
            </div>
          </>
        )}
      </MaxPanel>
      {preview && <RequestFilePreview {...preview} onClose={closePreview} />}
      {notice && (
        <Snackbar key={notice} onClosed={() => setNotice('')} offsetY={92}>
          {notice}
        </Snackbar>
      )}
    </>
  );
}
