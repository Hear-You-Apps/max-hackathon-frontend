import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, SegmentedControl, Spinner } from '@vkontakte/vkui';
import { Header } from 'src/components';

import './Meets.css';
import { useCallback, useEffect, useState } from 'react';
import { Actual } from 'src/views/Meets/Meets/Actual';
import { Past } from 'src/views/Meets/Meets/Past';
import { api } from 'src/api/client.ts';
import { useMeetingsStore, useSelectedHouseStore } from 'src/storage';

export function Meets({ id }: { id: string }) {
  const { house } = useSelectedHouseStore();
  const { meetings, setMeetings } = useMeetingsStore();
  const [currentMode, setCurrentMode] = useState<'actual' | 'past'>('actual');

  const loading = !meetings;

  const getMeetings = useCallback(() => {
    if (!house) return;
    if (meetings) return;
    try {
      api.getHouseMeetings(house.id, { period: 'actual' }).then((actualResponse) => {
        api.getHouseMeetings(house.id, { period: 'past' }).then((pastResponse) => {
          setMeetings({
            actual: actualResponse.data.items,
            past: pastResponse.data.items,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [house, meetings, setMeetings]);

  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

  return (
    <Panel id={id}>
      <Header after={'notifications'} isHome />
      <MaxPanel className="page-content meets">
        <SegmentedControl
          options={[
            { label: 'Актуальные', value: 'actual' },
            { label: 'Прошедшие', value: 'past' },
          ]}
          value={currentMode}
          onChange={setCurrentMode}
          className={'mode-selector'}
        />

        {loading ? (
          <Spinner style={{ padding: 16 }} size="xl" />
        ) : currentMode === 'actual' ? (
          <Actual />
        ) : (
          <Past />
        )}
      </MaxPanel>
    </Panel>
  );
}
