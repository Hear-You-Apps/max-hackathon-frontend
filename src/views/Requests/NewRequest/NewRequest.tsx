import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';
import { Header } from 'src/components';
import { useSelectedHouseStore } from 'src/storage';
import { NewRequestForm } from './components/NewRequestForm';
import './NewRequest.css';

export function NewRequest({ id }: { id: string }) {
  const { house } = useSelectedHouseStore();

  return (
    <Panel id={id} className="new-request-panel">
      {house?.membership.status === 'approved' ? (
        <NewRequestForm key={house.id} house={house} />
      ) : (
        <>
          <Header isBack separator={false}>
            <span className="new-request-title">Новая заявка</span>
          </Header>
          <MaxPanel className="page-content">
            <div className="requests-state">
              Заявки доступны после подтверждения членства в доме
            </div>
          </MaxPanel>
        </>
      )}
    </Panel>
  );
}
