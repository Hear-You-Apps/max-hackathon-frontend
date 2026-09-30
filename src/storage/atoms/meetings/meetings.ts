import { create } from 'zustand';
import type { MeetingListItemDto, PollDto } from 'src/api/api.ts';

type MeetingsT = {
  actual: (
    | ({
        type: 'meeting';
      } & MeetingListItemDto)
    | ({
        type: 'poll';
      } & PollDto)
  )[];
  past: (
    | ({
        type: 'meeting';
      } & MeetingListItemDto)
    | ({
        type: 'poll';
      } & PollDto)
  )[];
};

interface MeetingsStoreI {
  meetings: MeetingsT | undefined;
  setMeetings: (meetings: MeetingsT) => void;
}

const useMeetingsStore = create<MeetingsStoreI>((set) => ({
  meetings: undefined,
  setMeetings: (meetings: MeetingsT) => set({ meetings }),
}));

export default useMeetingsStore;
