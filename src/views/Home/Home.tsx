import { Button, Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../navigation/routes';
import { useEffect } from 'react';

export function Home({ id }: { id: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.WebApp?.initData)
  }, [])

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <MaxPanel className="page-content">
        <Button onClick={() => navigate(paths.homeDetails, { state: { from: paths.home } })}>
          Открыть панель
        </Button>
      </MaxPanel>
    </Panel>
  );
}
