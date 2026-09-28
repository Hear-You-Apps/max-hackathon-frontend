import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, Spinner } from '@vkontakte/vkui';
import { Button, Cell, Header } from 'src/components';

import './HomeInfo.css';
import {
  Icon24Chats,
  IconCall,
  IconChevronRight,
  IconHome,
  IconInfo,
  IconLocation,
  IconSetting,
} from 'src/assets/icons';
import type { HouseChatDto, HouseContactDto } from 'src/api/api.ts';
import { api } from 'src/api/client.ts';
import { useCallback, useEffect } from 'react';
import useSelectedHouseStore from 'src/storage/atoms/selectedHome/selectedHome.ts';

export function HomeInfo({ id }: { id: string }) {
  const { house, homeInfo, setHomeInfo, setChats } = useSelectedHouseStore();

  const getHomeInfo = useCallback(async () => {
    if (!house || homeInfo) return;

    try {
      const res = await api.getHouse(house.id);
      setHomeInfo(res.data);
      const res_chats = await api.getHouseChats(house.id);
      setChats(res_chats.data as unknown as HouseChatDto[]);
    } catch (error) {
      console.error(error);
    }
  }, [homeInfo, house, setChats, setHomeInfo]);

  useEffect(() => {
    void getHomeInfo();
  }, [getHomeInfo]);

  const loading = !homeInfo;

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) return '';
    if (words.length === 1) return words[0][0].toUpperCase();

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };

  const formatDate = (date: string) => {
    return `${new Date(date).toLocaleDateString('ru-RU', {})}`;
  };

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
        {loading ? <Spinner style={{ padding: 16 }} size={'xl'} /> : null}

        <div className={'home-card current-home'}>
          <Cell
            icon={<IconHome />}
            label={homeInfo?.house.address ?? ''}
            text={`УК «${homeInfo?.house.managementCompanyName}» · ${homeInfo?.house.apartmentsCount} квартир · ${homeInfo?.house.residentsCount} жителей уже в приложении`}
            size={'l'}
            after={<IconChevronRight />}
          />
        </div>

        {homeInfo?.contacts && homeInfo?.contacts.length > 0 ? (
          <div>
            <div className={'home-info-header'}>контакты</div>
            {homeInfo?.contacts.map((contact: HouseContactDto) => (
              <Cell
                icon={getContactIcon(contact)}
                label={contact.name}
                text={`${contact.phone} · ${contact.workingHours}`}
                after={<IconChevronRight />}
              />
            ))}
          </div>
        ) : null}

        <div>
          <div className={'home-info-header'}>чаты</div>
          <Cell
            icon={<Icon24Chats />}
            label={'Чаты'}
            text={''}
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

        {homeInfo?.upcomingEvents && homeInfo?.upcomingEvents.length > 0 ? (
          <div>
            <div className={'home-info-header'}>ближашее</div>

            {homeInfo.upcomingEvents.map((el) => {
              return (
                <Cell
                  icon={<IconInfo className={el.type === 'water_outage' ? 'warning' : ''} />}
                  label={el.title}
                  text={`${formatDate(el.startsAt)} · ${el.description}`}
                />
              );
            })}
          </div>
        ) : null}
      </MaxPanel>
    </Panel>
  );
}
