import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, PanelHeader } from '@vkontakte/vkui';
export function Requests({ id }: { id: string }) {
  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <MaxPanel className="page-content"></MaxPanel>
    </Panel>
  );
}
