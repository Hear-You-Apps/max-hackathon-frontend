export const paths = {
  meets: '/meets',
  meet: '/meets/meet',
  newMeet: '/meets/new',
  requests: '/requests',
  newRequest: '/requests/new',
  request: '/requests/request',
  chats: '/chats',
  homeInfo: '/home',
  manage: '/manage',
} as const;

export const routes = [
  { path: paths.meets, view: 'meets', panel: 'meets-main', main: paths.meets },
  { path: paths.meet, view: 'meets', panel: 'meets-meet', main: paths.meets },
  { path: paths.newMeet, view: 'meets', panel: 'meets-new', main: paths.meets },
  { path: paths.requests, view: 'requests', panel: 'requests-main', main: paths.requests },
  { path: paths.request, view: 'requests', panel: 'request', main: paths.requests },
  { path: paths.newRequest, view: 'requests', panel: 'requests-new', main: paths.requests },
  { path: paths.chats, view: 'chats', panel: 'chats-main', main: paths.chats },
  { path: paths.homeInfo, view: 'home', panel: 'home-info', main: paths.homeInfo },
  { path: paths.manage, view: 'manage', panel: 'manage-main', main: paths.manage },
] as const;
