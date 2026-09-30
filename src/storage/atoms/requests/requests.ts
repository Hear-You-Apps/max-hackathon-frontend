import { create } from 'zustand';
import type { RequestsScope } from 'src/api/api';

interface RequestFilters {
  scope: RequestsScope;
  status: 'all' | 'open' | 'completed';
}

interface RequestsStore {
  filters: Partial<Record<number, RequestFilters>>;
  setFilters: (houseId: number, filters: RequestFilters) => void;
}

const useRequestsStore = create<RequestsStore>((set) => ({
  filters: {},
  setFilters: (houseId, filters) =>
    set((state) => ({ filters: { ...state.filters, [houseId]: filters } })),
}));

export default useRequestsStore;
