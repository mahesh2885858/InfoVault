import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
type TMiscStore = {
  setSearch: (search: string) => void;
  search: string;
};

export const useMiscStore = create(
  persist<TMiscStore>(
    set => ({
      search: '',
      setSearch(search: string) {
        set(state => ({...state, search}));
      },
    }),
    {
      name: 'MISC_STORE',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
