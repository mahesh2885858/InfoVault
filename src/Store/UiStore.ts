import {create} from 'zustand';
import {ColorSchemeName, useColorScheme} from 'react-native';
type TUi = {
  isSystemTheme: boolean;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
};

export const useUiStore = create<TUi>(set => ({
  isSystemTheme: true,
  theme: useColorScheme(),
  setTheme(theme: ColorSchemeName) {
    set(state => ({...state, theme}));
  },
}));
