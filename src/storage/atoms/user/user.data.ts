import type { InitResponseDto } from 'src/api/api.ts';

export const ATOM_USER_DEFAULT_DATA: InitResponseDto = {
  houses: [],
  joinRequests: [],
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    photoUrl: '',
  },
};
