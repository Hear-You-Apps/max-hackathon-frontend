import { Button, Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../navigation/routes';
import { useEffect } from 'react';

export function Requests({ id }: { id: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.WebApp?.initData)
  }, [])

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
