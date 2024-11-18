/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {CardHeaderOptions} from './src/Screens/Cards/CardHeaderOptions';
import Cards from './src/Screens/Cards/Cards';
import {DrawerParamsList, RootStackParamList} from './src/Types/Navigation';
import {StatusBar, BackHandler} from 'react-native';
import {myTheme} from './theme';
import Passwords from './src/Screens/Passwords';
import {PasswordsHeaderOptions} from './src/Screens/Passwords/PasswordHeaderOptions';
import {ToastProvider} from 'react-native-toast-notifications';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/components/Navigation/CustomDrawer';
import * as LocalAuthentication from 'expo-local-authentication';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './src/Screens/Settings';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamsList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: myTheme.buttonBg,
        drawerLabelStyle: {
          color: 'white',
        },
        swipeEdgeWidth: 50,
      }}
      drawerContent={CustomDrawer}
      initialRouteName="Cards">
      <Drawer.Screen
        name="Cards"
        component={Cards}
        options={CardHeaderOptions}
      />
      <Drawer.Screen
        name="Passwords"
        component={Passwords}
        options={PasswordsHeaderOptions}
      />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await LocalAuthentication.authenticateAsync();
      if (!isAuthenticated.success) {
        BackHandler.exitApp();
      }
      return;
    };
    authenticate();
  }, []);
  return (
    <>
      <StatusBar backgroundColor={myTheme.main} />
      <PaperProvider>
        <ToastProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Drawer">
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </>
  );
}
export default App;
