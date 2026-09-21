import { useCallback, useEffect } from 'react';
import { Epic, Tabbar, TabbarItem, View } from '@vkontakte/vkui';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { paths, routes } from './navigation/routes';
import { Meets } from 'src/views/Meets';
import { HomeDetails } from './views/Meets/Details';
import { Requests } from './views/Requests/Requests';
import { ProfileDetails } from './views/Requests/Details';

import { Icon24Meets, Icon24Chats, Icon24Requests, Icon24Manage } from './assets/icons';
import { useUserStore } from 'src/storage';
import { FindHome, Login, SetHome } from 'src/views/Login';
import { api } from 'src/api/client';

export function Navigation() {
  const userInfo = useUserStore((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const route = routes.find(({ path }) => path === location.pathname);
  const main = userInfo.home ? paths.meets : paths.login;
  //const from = (location.state as { from?: string } | null)?.from;

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!window.WebApp?.initData) {
      console.log('Для вызова /init открой прилку в Максе');
      return;
    }

    // @TODO: DELETE 30 SEPTEMBER
    console.log(window.WebApp?.initData);

    api
      .init()
      .then(({ data }) => console.log('init:', data))
      .catch((error: unknown) => console.error('Ошибка /init:', error));
  }, []);

  if (!route) return <Navigate to={main} replace />;

  const meetsPanel = route.view === 'meets' ? route.panel : 'meets-main';
  const requestsPanel = route.view === 'requests' ? route.panel : 'requests-user';
  const loginPanel = route.view === 'login' ? route.panel : 'login-main';

  return (
    <Epic
      activeStory={userInfo.status === 'logged' ? route.view : 'login'}
      tabbar={
        userInfo.status === 'logged' ? (
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
      <View
        id={'login'}
        activePanel={loginPanel}
        onSwipeBack={goBack}
        history={
          loginPanel === 'login-main'
            ? ['login-main']
            : loginPanel === 'login-find'
              ? ['login-main', 'login-find']
              : ['login-main', 'login-find', 'set-home']
        }
      >
        <Login id={'login-main'} />
        <FindHome id={'login-find'} onBack={goBack} />
        <SetHome id={'set-home'} onBack={goBack} />
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
