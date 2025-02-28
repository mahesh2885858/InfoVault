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
  getSelectedProfile: () => TProfile | undefined;
  updateProfile: (profile: TProfile) => void;
  selectProfile: (id: string) => void;
  resetProfileSelection: () => void;
};

export const useProfileStore = create(
  persist<TProfileStore>(
    (set, get) => {
      return {
        profiles: [
          {
            id: '123abd',
            name: 'All',
          },
        ],
        selectedProfileId: '123abd',

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
        getSelectedProfile() {
          const state = get();
          return state.profiles.find(p => p.id === state.selectedProfileId);
        },
        updateProfile(profile) {
          const updatedProfiles = get().profiles.map(p => {
            if (p.id === profile.id) {
              return {
                ...p,
                name: profile.name,
              };
            } else return p;
          });
          set({
            profiles: updatedProfiles,
            selectedProfileId: '',
          });
        },
        selectProfile(id) {
          set({
            selectedProfileId: id,
          });
        },
        resetProfileSelection() {
          set({
            selectedProfileId: '123abd',
          });
        },
      };
    },
    {
      name: 'profileStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
