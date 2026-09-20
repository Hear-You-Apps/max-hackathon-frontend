import { useCallback } from 'react';
import { Epic, Tabbar, TabbarItem, View } from '@vkontakte/vkui';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMaxBackButton } from './bridge/useMaxBackButton';
import { paths, routes } from './navigation/routes';
import { Meets } from './views/Meets/Meets';
import { HomeDetails } from './views/Meets/Details';
import { Requests } from './views/Requests/Requests';
import { ProfileDetails } from './views/Requests/Details';

import { Icon24Meets, Icon24Chats, Icon24Requests, Icon24Manage } from './assets/icons';
import { useUserStore } from 'src/storage';
import { Login } from 'src/views/Login';

export function Navigation() {
  const userInfo = useUserStore((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const route = routes.find(({ path }) => path === location.pathname);
  const main = userInfo.home ? paths.meets : paths.login;
  const details = Boolean(route && route.path !== main);
  const from = (location.state as { from?: string } | null)?.from;

  const goBack = useCallback(() => {
    if (from === main) {
      navigate(-1);
    } else {
      navigate(main, { replace: true });
    }
  }, [from, main, navigate]);

  useMaxBackButton(details, goBack);

  if (!route) return <Navigate to={paths.meets} replace />;

  const meetsPanel = route.view === 'meets' ? route.panel : 'meets-main';
  const requestsPanel = route.view === 'requests' ? route.panel : 'requests-user';

  return (
    <Epic
      activeStory={userInfo.home ? route.view : 'login'}
      tabbar={
        userInfo.home ? (
          <Tabbar className="app-tabbar" aria-label="Вкладки">
            {userInfo.admin ? (
              <TabbarItem
                selected={route.view === 'manage'}
                label="Управление"
                onClick={() => navigate(paths.manage, { replace: true })}
              >
                <Icon24Manage
                  className={`icon-manage ${route.view === 'manage' ? 'active' : ''}`}
                />
              </TabbarItem>
            ) : null}
            <TabbarItem
              selected={route.view === 'meets'}
              label="Собрания"
              onClick={() => navigate(paths.meets, { replace: true })}
            >
              <Icon24Meets className={`icon-meets ${route.view === 'meets' ? 'active' : ''}`} />
            </TabbarItem>
            <TabbarItem
              selected={route.view === 'requests'}
              label="Заявки"
              onClick={() => navigate(paths.requests, { replace: true })}
            >
              <Icon24Requests
                className={`icon-requests ${route.view === 'requests' ? 'active' : ''}`}
              />
            </TabbarItem>
            <TabbarItem
              selected={route.view === 'chats'}
              label="Чаты"
              onClick={() => navigate(paths.chats, { replace: true })}
            >
              <Icon24Chats className={`icon-chats ${route.view === 'chats' ? 'active' : ''}`} />
            </TabbarItem>
          </Tabbar>
        ) : null
      }
    >
      <View id={'login'} activePanel={'login-main'}>
        <Login id={'login-main'} />
      </View>

      <View
        id="meets"
        activePanel={meetsPanel}
        history={meetsPanel === 'meets-main' ? ['meets-main'] : ['meets-main', 'home-details']}
        onSwipeBack={goBack}
      >
        <Meets id="meets-main" />
        <HomeDetails id="home-details" onBack={goBack} />
      </View>
      <View
        id="requests"
        activePanel={requestsPanel}
        history={
          requestsPanel === 'requests-user'
            ? ['requests-user']
            : ['requests-user', 'profile-details']
        }
        onSwipeBack={goBack}
      >
        <Requests id="requests-main" />
        <ProfileDetails id="profile-details" onBack={goBack} />
      </View>
    </Epic>
  );
}
