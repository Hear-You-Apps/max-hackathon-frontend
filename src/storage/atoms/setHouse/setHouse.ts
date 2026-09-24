import { create } from 'zustand';
import type { FoundHouseDto } from 'src/api/api.ts';

interface SetHouseStoreI {
  house: FoundHouseDto | undefined;
  setHouse: (house: FoundHouseDto) => void;
}

const useSetHouseStore = create<SetHouseStoreI>((set) => ({
  house: undefined,

  setHouse: (house) => set({ house }),
}));

export default useSetHouseStore;
