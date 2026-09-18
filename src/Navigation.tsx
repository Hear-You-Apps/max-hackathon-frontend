import { useCallback } from 'react';
import { Icon28HomeOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { Epic, Tabbar, TabbarItem, View } from '@vkontakte/vkui';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMaxBackButton } from './bridge/useMaxBackButton';
import { paths, routes } from './navigation/routes';
import { Home } from './views/Home/Home';
import { HomeDetails } from './views/Home/Details';
import { Profile } from './views/Profile/Profile';
import { ProfileDetails } from './views/Profile/Details';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = routes.find(({ path }) => path === location.pathname);
  const main = route?.main ?? paths.home;
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

  if (!route) return <Navigate to={paths.home} replace />;

  const homePanel = route.view === 'home' ? route.panel : 'home-main';
  const profilePanel = route.view === 'profile' ? route.panel : 'profile-main';

  return (
    <Epic
      activeStory={route.view}
      tabbar={
        <Tabbar className="app-tabbar" aria-label="Вкладки">
          <TabbarItem
            selected={route.view === 'home'}
            label="Главная"
            onClick={() => navigate(paths.home, { replace: true })}
          >
            <Icon28HomeOutline />
          </TabbarItem>
          <TabbarItem
            selected={route.view === 'profile'}
            label="Профиль"
            onClick={() => navigate(paths.profile, { replace: true })}
          >
            <Icon28UserCircleOutline />
          </TabbarItem>
        </Tabbar>
      }
    >
      <View
        id="home"
        activePanel={homePanel}
        history={homePanel === 'home-main' ? ['home-main'] : ['home-main', 'home-details']}
        onSwipeBack={goBack}
      >
        <Home id="home-main" />
        <HomeDetails id="home-details" onBack={goBack} />
      </View>
      <View
        id="profile"
        activePanel={profilePanel}
        history={
          profilePanel === 'profile-main' ? ['profile-main'] : ['profile-main', 'profile-details']
        }
        onSwipeBack={goBack}
      >
        <Profile id="profile-main" />
        <ProfileDetails id="profile-details" onBack={goBack} />
      </View>
    </Epic>
  );
}
