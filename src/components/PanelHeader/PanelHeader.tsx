import './PanelHeader.css';
import { PanelHeader } from '@vkontakte/vkui';
import { IconArrowLeftOutline } from 'src/assets/icons';

export function Header({ title, back }: { title: string; back?: () => void }) {
  return (
    <PanelHeader
      className={'header'}
      before={
        back ? (
          <div className={'back-button'} onClick={back}>
            <IconArrowLeftOutline />
          </div>
        ) : null
      }
    >
      {title}
    </PanelHeader>
  );
}
