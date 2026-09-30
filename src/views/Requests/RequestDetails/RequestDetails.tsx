import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Header } from 'src/components';
import { paths } from 'src/navigation/routes';

export function RequestDetails({ id }: { id: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { requestNumber?: number; created?: boolean } | null;
  const goToList = () => navigate(paths.requests, { replace: true });

  return (
    <Panel id={id} className="requests-panel">
      <Header isBack separator={false}>
        {state?.requestNumber ? `Заявка № ${state.requestNumber}` : 'Заявка'}
      </Header>
      <MaxPanel className="page-content requests">
        <div className="requests-state">
          {state?.created ? 'Заявка отправлена' : 'Карточка заявки пока недоступна'}
          <Button mode="themed" onClick={goToList}>
            К списку заявок
          </Button>
        </div>
      </MaxPanel>
    </Panel>
  );
}
