import { create } from 'zustand';
import type { HouseChatDto, HouseDetailsResponseDto, MyHouseDto } from 'src/api/api.ts';

interface SelectedHomeStoreI {
  house: MyHouseDto | undefined;
  homeInfo: HouseDetailsResponseDto | undefined;
  chats: HouseChatDto[] | undefined;
  setSelectedHouse: (house: MyHouseDto) => void;
  setHomeInfo: (data: HouseDetailsResponseDto) => void;
  setChats: (chats: HouseChatDto[]) => void;
}

const useSelectedHouseStore = create<SelectedHomeStoreI>((set) => ({
  house: undefined,
  homeInfo: undefined,
  chats: undefined,

  setSelectedHouse: (house) => set({ house }),
  setHomeInfo: (data) => set({ homeInfo: data }),
  setChats: (data) => set({ chats: data }),
}));

export default useSelectedHouseStore;
