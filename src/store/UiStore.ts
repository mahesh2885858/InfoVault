import {create} from 'zustand';
import {ColorSchemeName} from 'react-native';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TUi = {
  isSystemTheme: boolean;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
};

export const useUiStore = create(
  persist<TUi>(
    set => ({
      isSystemTheme: false,
      theme: 'dark',
      setTheme(theme: ColorSchemeName) {
        set(state => ({...state, theme}));
      },
    }),
    {
      name: 'UI_STORE',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
