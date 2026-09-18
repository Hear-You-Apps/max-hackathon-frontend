import { useAppearance } from '@maxhub/max-ui';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitCol,
  SplitLayout,
} from '@vkontakte/vkui';
import { Navigation } from './Navigation';

export function App() {
  const { platform, colorScheme } = useAppearance();

  return (
    <ConfigProvider
      platform={platform}
      colorScheme={colorScheme}
      locale="ru"
      isWebView={Boolean(window.WebApp?.initData)}
    >
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol width="100%" maxWidth={640} className="app-column" animate>
              <Navigation />
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
