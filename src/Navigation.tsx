import { useCallback, useEffect } from 'react';
import { Epic, Tabbar, TabbarItem, View } from '@vkontakte/vkui';
import { Navigate, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { paths, routes } from './navigation/routes';
import { Meets, MeetView } from 'src/views/Meets';
import { Requests, NewRequest, RequestDetails } from 'src/views/Requests';

import {
  Icon24Meets,
  Icon24Requests,
  Icon24Manage,
  IconHome,
  IconRequestsMeets,
  IconRequestsActive,
  IconRequestsHome,
} from 'src/assets/icons';
import { useUserStore } from 'src/storage';
import { FindHome, Login, SetHome } from 'src/views/Login';
import { api } from 'src/api/client';
import { HomeInfo } from 'src/views/HomeInfo';

export function Navigation() {
  const userInfo = useUserStore((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const route = routes.find(({ path }) => matchPath(path, location.pathname));
  const hasHouses = userInfo.houses.length > 0;
  const hasJoinRequests = userInfo.joinRequests?.length > 0;
  const main = hasHouses ? paths.meets : hasJoinRequests ? paths.setHome : paths.login;
  //const from = (location.state as { from?: string } | null)?.from;

  const hasAdminAccess =
    userInfo.houses?.some((house) =>
      house.membership?.roles?.some((role) => role !== 'resident'),
    ) ?? false;

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!window.WebApp?.initData) {
      console.log('Для вызова /init открой прилку в Максе');
      return;
    }

    api
      .init()
      .then(({ data }) => console.log('init:', data))
      .catch((error: unknown) => console.error('Ошибка /init:', error));
  }, []);

  if (!route) return <Navigate to={main} replace />;
  if (!hasHouses && route.view !== 'login') {
    return <Navigate to={main} replace />;
  }

  const meetsPanel = route.view === 'meets' ? route.panel : 'meets-main';
  const requestsPanel = route.view === 'requests' ? route.panel : 'requests-main';
  const homeInfoPanel = route.view === 'home' ? route.panel : 'home-info';
  const loginPanel = route.view === 'login' ? route.panel : 'login-main';

  return (
    <Epic
      activeStory={hasHouses ? route.view : 'login'}
      tabbar={
        hasHouses && route.path !== paths.newRequest ? (
          <Tabbar className="app-tabbar" aria-label="Вкладки">
            {hasAdminAccess ? (
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
              {route.view === 'requests' ? (
                <IconRequestsMeets />
              ) : (
                <Icon24Meets className={`icon-meets ${route.view === 'meets' ? 'active' : ''}`} />
              )}
            </TabbarItem>
            <TabbarItem
              selected={route.view === 'requests'}
              label="Заявки"
              onClick={() => navigate(paths.requests, { replace: true })}
            >
              {route.view === 'requests' ? (
                <IconRequestsActive />
              ) : (
                <Icon24Requests className="icon-requests" />
              )}
            </TabbarItem>
            <TabbarItem
              selected={route.view === 'home'}
              label={route.view === 'requests' ? 'Мой дом' : 'Дом'}
              onClick={() => navigate(paths.homeInfo, { replace: true })}
            >
              {route.view === 'requests' ? (
                <IconRequestsHome />
              ) : (
                <IconHome className={`icon-home ${route.view === 'home' ? 'active' : ''}`} />
              )}
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
        <FindHome id={'login-find'} />
        <SetHome id={'set-home'} requests={hasJoinRequests} />
      </View>

      <View
        id="meets"
        activePanel={meetsPanel}
        history={meetsPanel === 'meets-main' ? ['meets-main'] : ['meets-main', 'meet']}
        onSwipeBack={goBack}
      >
        <Meets id="meets-main" />
        <MeetView id="meet" />
      </View>
      <View
        id="requests"
        activePanel={requestsPanel}
        history={
          requestsPanel === 'requests-main' ? ['requests-main'] : ['requests-main', requestsPanel]
        }
        onSwipeBack={goBack}
      >
        <Requests id="requests-main" />
        <NewRequest id="requests-new" />
        <RequestDetails id="request" />
      </View>
      <View
        id="home"
        activePanel={homeInfoPanel}
        history={homeInfoPanel === 'home-info' ? ['home-info'] : ['home-info', 'home-chats']}
        onSwipeBack={goBack}
      >
        <HomeInfo id="home-info" />
      </View>
    </Epic>
  );
}
