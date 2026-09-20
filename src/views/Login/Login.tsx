import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';

import './Login.css';
import { IconChevronRight, IconPoll, IconQR } from 'src/assets/icons';

export function Login({ id }: { id: string }) {
  return (
    <Panel id={id}>
      <MaxPanel className="page-content login">
        <div className="qr-icon">
          <IconQR />
        </div>

        <div className="login-text">
          <div className="login-text__main">Присоединитесь к своему дому</div>
          <div className="login-text__tip">
            Отсканируйте QR-код с доски объявлений или откройте ссылку от администратора дома.
          </div>
        </div>

        <div className="login-buttons">
          <button>
            {' '}
            <IconQR /> Сканировать QR-код
          </button>
          <button>Ввести код дома</button>
          <button>Войти через Госуслуги</button>
        </div>

        <div className="login-additional">
          <div className="poll-icon">
            <IconPoll />
          </div>
          <div className="additional-text">
            <div>Я из УК или отвечаю за дом</div>
            <div>Создать дом, пригласить жителей, вести заявки</div>
          </div>
          <div className="chevron-icon">
            <IconChevronRight />
          </div>
        </div>
      </MaxPanel>
    </Panel>
  );
}
