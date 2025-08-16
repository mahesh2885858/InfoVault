import { create } from 'zustand';
import { ColorSchemeName } from 'react-native';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
type TUi = {
  isSystemTheme: boolean;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
  selectedLanguage: string;
  selectLanguage: (language: string) => void;
};

export const useUiStore = create(
  persist<TUi>(
    set => ({
      isSystemTheme: false,
      theme: 'dark',
      selectedLanguage: 'english',
      selectLanguage: language => {
        set(state => ({ ...state, selectedLanguage: language }));
      },
      setTheme(theme: ColorSchemeName) {
        set(state => ({ ...state, theme }));
      },
    }),
    {
      name: 'UI_STORE',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
