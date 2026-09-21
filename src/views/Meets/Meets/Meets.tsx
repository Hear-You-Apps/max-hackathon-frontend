import { Panel as MaxPanel } from '@maxhub/max-ui';
import { Panel, SegmentedControl } from '@vkontakte/vkui';
import { Header } from 'src/components';
import { IconNotificationOutline } from 'src/assets/icons';

import './Meets.css';
import { useState } from 'react';
import { Actual } from 'src/views/Meets/Meets/Actual';
import { Past } from 'src/views/Meets/Meets/Past';

export function Meets({ id }: { id: string }) {
  const [currentMode, setCurrentMode] = useState<'actual' | 'past'>('actual');

  return (
    <Panel id={id}>
      <Header after={<IconNotificationOutline />} isHome />
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

        {currentMode === 'actual' ? <Actual /> : <Past />}
      </MaxPanel>
    </Panel>
  );
}
