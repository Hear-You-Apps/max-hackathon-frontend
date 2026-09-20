import { create } from 'zustand';

import { ATOM_USER_DEFAULT_DATA } from './user.data.ts';
import type { AtomUserI } from './user.type.ts';

interface UserStore {
  user: AtomUserI;
  setUser: (user: AtomUserI) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: ATOM_USER_DEFAULT_DATA,

  setUser: (user) => set({ user }),
}));

export default useUserStore;
