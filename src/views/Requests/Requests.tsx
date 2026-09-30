import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';
import { Header } from 'src/components';
export function Requests({ id }: { id: string }) {
  return (
    <Panel id={id}>
      <Header isHome />
      <MaxPanel className="page-content">В РАЗРАБОТКЕ</MaxPanel>
    </Panel>
  );
}
