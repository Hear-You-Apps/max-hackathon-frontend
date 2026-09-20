import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, PanelHeader } from '@vkontakte/vkui';

export function HomeInfo({ id }: { id: string }) {
  return (
    <Panel id={id}>
      <PanelHeader>Собрания</PanelHeader>
      <MaxPanel className="page-content"></MaxPanel>
    </Panel>
  );
}
