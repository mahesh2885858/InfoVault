import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import AppNavigator from './src/app';
import { AuthContextProvider } from './src/context/AuthContext';
import { ProfileContextProvider } from './src/context/ProfileContext';
import { useUiStore } from './src/store/UiStore';
import { default as appTheme } from './src/theme/appTheme.json';
import { default as dark } from './src/theme/dark.json';
import { default as light } from './src/theme/light.json';
import './src/translations/i18n';
import { CustomDark, CustomLight } from './theme';

function App(): React.JSX.Element {
  const theme = useUiStore(state => state.theme);

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
