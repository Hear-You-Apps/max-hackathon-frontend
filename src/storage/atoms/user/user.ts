import { create } from 'zustand';

import { ATOM_USER_DEFAULT_DATA } from './user.data.ts';
import type { InitResponseDto } from 'src/api/api.ts';

interface UserStore {
  user: InitResponseDto;
  setUser: (user: InitResponseDto) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: ATOM_USER_DEFAULT_DATA,

  setUser: (user) => set({ user }),
}));

export default useUserStore;
