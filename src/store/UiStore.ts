import {create} from 'zustand';
import {ColorSchemeName, useColorScheme} from 'react-native';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TUi = {
  isSystemTheme: boolean;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
};

export const useUiStore = create(
  persist<TUi>(
   set => ({
      isSystemTheme: true,
      theme: useColorScheme(),
      setTheme(theme: ColorSchemeName) {
        set(state => ({...state, theme}));
      },
    }),
  {
    name:"UI_STORE",
    storage: createJSONStorage(() => AsyncStorage),
  }

)
