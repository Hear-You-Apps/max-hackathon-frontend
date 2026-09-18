export const paths = {
  home: '/home',
  homeDetails: '/home/details',
  profile: '/profile',
  profileDetails: '/profile/details',
} as const;

export const routes = [
  { path: paths.home, view: 'home', panel: 'home-main', main: paths.home },
  { path: paths.homeDetails, view: 'home', panel: 'home-details', main: paths.home },
  { path: paths.profile, view: 'profile', panel: 'profile-main', main: paths.profile },
  { path: paths.profileDetails, view: 'profile', panel: 'profile-details', main: paths.profile },
] as const;
