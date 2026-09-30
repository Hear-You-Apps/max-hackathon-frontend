import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';
import { Header } from 'src/components';
import { useSelectedHouseStore } from 'src/storage';
import { RequestsList } from './components/RequestsList';
import './Requests.css';

export function Requests({ id }: { id: string }) {
  const { house } = useSelectedHouseStore();

  return (
    <Panel id={id} className="requests-panel">
      <Header isHome subtitle="Заявки в УК и службы" separator={false} />
      {house?.membership.status === 'approved' ? (
        <RequestsList key={house.id} house={house} />
      ) : (
        <MaxPanel className="page-content requests">
          <div className="requests-state">Заявки доступны после подтверждения членства в доме</div>
        </MaxPanel>
      )}
    </Panel>
  );
}
