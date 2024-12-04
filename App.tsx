/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import RNBiometrics from 'react-native-simple-biometrics';
import {ToastProvider} from 'react-native-toast-notifications';
import CustomDrawer from './src/components/Navigation/CustomDrawer';
import {CardHeaderOptions} from './src/Screens/Cards/CardHeaderOptions';
import Cards from './src/Screens/Cards/Cards';
import Passwords from './src/Screens/Passwords';
import {PasswordsHeaderOptions} from './src/Screens/Passwords/PasswordHeaderOptions';
import Settings from './src/Screens/Settings';
import {DrawerParamsList, RootStackParamList} from './src/Types/Navigation';
import {myTheme} from './theme';

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
      const can = await RNBiometrics.canAuthenticate();
      if (can) {
        try {
          await RNBiometrics.requestBioAuth('prompt-title', 'prompt-message');
          // Code to execute when authenticated
          // ...
        } catch (error) {
          BackHandler.exitApp();
          console.log({error});
        }
      }
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
