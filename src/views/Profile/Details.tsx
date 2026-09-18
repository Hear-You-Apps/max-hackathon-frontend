import { Panel as MaxPanel, Typography } from '@maxhub/max-ui';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

export function ProfileDetails({ id, onBack }: { id: string; onBack: () => void }) {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Настройки</PanelHeader>
      <MaxPanel className="page-content">
        <Typography.Body>Вторая панель профиля.</Typography.Body>
      </MaxPanel>
    </Panel>
  );
}
