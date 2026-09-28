import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel } from '@vkontakte/vkui';
import { Button, Cell, Header } from 'src/components';

import './HomeInfo.css';
import {
  Icon24Chats,
  IconCall,
  IconChevronRight,
  IconClock,
  IconHome,
  IconInfo,
  IconLocation,
  IconSetting,
} from 'src/assets/icons';
import { useUserStore } from 'src/storage';
import type { HouseContactDto } from 'src/api/api.ts';
/*import { api } from 'src/api/client.ts';
import { useCallback, useEffect } from 'react';*/

export function HomeInfo({ id }: { id: string }) {
  const { user } = useUserStore();
  const home = user.houses[0];

  /*const getHomeInfo = useCallback(async () => {
    try {
      const res = await api.getHouse(1);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getHomeInfo();
  });*/

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) return '';
    if (words.length === 1) return words[0][0].toUpperCase();

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };

  const contacts: HouseContactDto[] = [
    {
      id: 1,
      type: 'dispatcher',
      name: 'Диспетчерская УК',
      phone: '+78120000000',
      address: 'string',
      workingHours: 'Круглосуточно',
      messengerUrl: 'string',
    },
    {
      id: 2,
      type: 'emergency',
      name: 'Диспетчерская УК',
      phone: '+78120000000',
      address: 'string',
      workingHours: 'Круглосуточно',
      messengerUrl: 'string',
    },
    {
      id: 3,
      type: 'plumber',
      name: 'Диспетчерская УК',
      phone: '+78120000000',
      address: 'string',
      workingHours: 'Круглосуточно',
      messengerUrl: 'string',
    },
    {
      id: 4,
      type: 'other',
      name: 'Галина Петровна',
      phone: '+78120000000',
      address: 'string',
      workingHours: 'Круглосуточно',
      messengerUrl: 'string',
    },
  ];

  const getContactIcon = (contact: HouseContactDto) => {
    switch (contact.type) {
      case 'dispatcher':
        return <IconCall />;
      case 'emergency':
        return <IconCall className={'emergency'} />;
      case 'plumber':
        return <IconSetting />;
      case 'passport_office':
        return <IconLocation />;
      case 'other':
        return <span>{getInitials(contact.name)}</span>;
    }
  };

  return (
    <Panel id={id}>
      <Header>Мой дом</Header>
      <MaxPanel className="page-content home">
        <div className={'home-card current-home'}>
          <Cell
            icon={<IconHome />}
            label={home.address}
            text={`УК «${home.managementCompanyName}» · ${home.apartmentsCount} квартир · ${home.residentsCount} жителей уже в приложении`}
            size={'l'}
            after={<IconChevronRight />}
          />
        </div>

        <div className={'home-contacts'}>
          <div className={'home-info-header'}>контакты</div>
          {contacts.map((contact: HouseContactDto) => (
            <Cell
              icon={getContactIcon(contact)}
              label={contact.name}
              text={`${contact.phone} · ${contact.workingHours}`}
              after={<IconChevronRight />}
            />
          ))}
        </div>

        <div>
          <div className={'home-info-header'}>чаты</div>
          <Cell
            icon={<Icon24Chats />}
            label={'Чаты'}
            text={'Общий чат дома, Подъезд 3, Совет....'}
            size={'l'}
            after={<IconChevronRight />}
          />
        </div>

        <div>
          <div className={'home-info-header'}>коммунальные платежи</div>
          <div className={'public-service'}>
            <div className={'public-service__text'}>
              <span>6 842 ₽</span>
              <span>за август · оплатить до 25 сентября</span>
            </div>
            <Button className={'public-service-button'}>Оплатить</Button>
          </div>
          <div className={'public-service__bottom'}>История платежей и квитанции</div>
        </div>

        <div>
          <div className={'home-info-header'}>ближашее</div>
          <Cell
            icon={<IconInfo className={'warning'} />}
            label={'Отключение горячей воды'}
            text={'19 сентября, 10:00–16:00 · плановые работы'}
          />
          <Cell
            icon={<IconClock />}
            label={'Уборка подъездов'}
            text={'Влажная уборка пн и чт · мытьё окон 25 сентября'}
          />
        </div>
      </MaxPanel>
    </Panel>
  );
}
