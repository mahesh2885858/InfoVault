import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/app';
import { AuthContextProvider } from './src/context/AuthContext';
import { ProfileContextProvider } from './src/context/ProfileContext';
import { useUiStore } from './src/store/UiStore';
import { default as appTheme } from './src/theme/appTheme.json';
import { default as dark } from './src/theme/dark.json';
import { default as light } from './src/theme/light.json';
import './src/translations/i18n';
import { CustomDark, CustomLight } from './theme';
import { ToastProvider } from './src/context/ToastContext';
import i18n from './src/translations/i18n';
import { LANGUAGES } from './src/constants';

function App(): React.JSX.Element {
  const theme = useUiStore(state => state.theme);
  const selectedLanguage = useUiStore(state => state.selectedLanguage);

  useEffect(() => {
    i18n.changeLanguage(LANGUAGES[selectedLanguage]?.code || 'en');
  }, [selectedLanguage]);

  return (
    <ApplicationProvider
      {...eva}
      theme={
        theme === 'dark'
          ? { ...eva.dark, ...appTheme, ...dark }
          : { ...eva.light, ...appTheme, ...light }
      }
    >
      <SafeAreaProvider>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={appTheme['color-primary-900']}
        />

        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme === 'dark' ? CustomDark : CustomLight}>
            <AuthContextProvider>
              <ProfileContextProvider>
                <ToastProvider>
                  <AppNavigator />
                </ToastProvider>
              </ProfileContextProvider>
            </AuthContextProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
export default App;
