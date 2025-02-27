import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {TProfile} from '../types';

type TProfileStore = {
  profiles: TProfile[];
  selectedProfileId: string;
  addProfile: (profile: TProfile) => void;
  removeProfile: (id?: string) => void;
  setProfiles: (cards: TProfile[]) => void;
};

export const useProfileStore = create(
  persist<TProfileStore>(
    set => {
      return {
        profiles: [],
        selectedProfileId: '',

        addProfile: profile => {
          set(state => {
            return {profiles: [...state.profiles, profile]};
          });
        },

        removeProfile: id => {
          set(state => {
            const d = state.profiles.filter(p => p.id !== id);
            return {profiles: d};
          });
        },

        setProfiles(profiles) {
          set({profiles});
        },
      };
    },
    {
      name: 'profileStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
