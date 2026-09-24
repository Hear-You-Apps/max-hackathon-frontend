import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
} from '@vkontakte/vkui';
import { Navigation } from './Navigation';
import { api } from 'src/api/client.ts';
import { useCallback, useEffect, useState } from 'react';
import { useUserStore } from 'src/storage';

export function App() {
  const { setUser } = useUserStore();
  const [isInitializing, setIsInitializing] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const { data } = await api.init();
      setUser(data);
    } catch (error) {
      console.error('Ошибка /init:', error);
    } finally {
      setIsInitializing(false);
    }
  }, [setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <ConfigProvider
      platform={'ios'}
      colorScheme={'light'}
      locale="ru"
      isWebView={Boolean(window.WebApp?.initData)}
    >
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol width="100%" maxWidth={640} className="app-column" animate>
              {isInitializing ? <ScreenSpinner /> : <Navigation />}
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
