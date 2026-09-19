import { Button, Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../navigation/routes';

export function Meets({ id }: { id: string }) {
  const navigate = useNavigate();

  return (
    <Panel id={id}>
      <PanelHeader>Собрания</PanelHeader>
      <MaxPanel className="page-content">

      </MaxPanel>
    </Panel>
  );
}
