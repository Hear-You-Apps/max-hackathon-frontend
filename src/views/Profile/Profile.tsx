import { Button, Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../navigation/routes';

export function Profile({ id }: { id: string }) {
  const navigate = useNavigate();

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <MaxPanel className="page-content">
        <Button onClick={() => navigate(paths.profileDetails, { state: { from: paths.profile } })}>
          Открыть панель
        </Button>
      </MaxPanel>
    </Panel>
  );
}
