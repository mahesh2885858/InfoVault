/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ProfileContextProvider} from './src/context/ProfileContext';
import {AuthContextProvider} from './src/context/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {default as light} from './src/theme/light.json';
import {default as dark} from './src/theme/dark.json';
import {default as appTheme} from './src/theme/appTheme.json';
import './src/translations/i18n';
import AppNavigator from './src/app';

function App(): React.JSX.Element {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <ApplicationProvider
      {...eva}
      theme={
        theme === 'dark'
          ? {...eva.dark, ...appTheme, ...dark}
          : {...eva.light, ...appTheme, ...light}
      }>
      <SafeAreaProvider>
        <StatusBar backgroundColor={appTheme['color-primary-900']} />
        <GestureHandlerRootView style={{flex: 1}}>
          <PaperProvider>
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
