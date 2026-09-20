import { Panel as MaxPanel, Typography } from '@maxhub/max-ui';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

export function HomeDetails({ id, onBack }: { id: string; onBack: () => void }) {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Детали</PanelHeader>
      <MaxPanel className="page-content">
        <Typography.Body>Вторая панель главной вкладки.</Typography.Body>
      </MaxPanel>
    </Panel>
  );
}
