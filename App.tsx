/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {CardHeaderOptions} from './src/Screens/Cards/CardHeaderOptions';
import Cards from './src/Screens/Cards/Cards';
import {RootStackParamList} from './src/Types/Navigation';
import {StatusBar} from 'react-native';
import {myTheme} from './theme';
import Passwords from './src/Screens/Passwords';
import {PasswordsHeaderOptions} from './src/Screens/Passwords/PasswordHeaderOptions';
import {ToastProvider} from 'react-native-toast-notifications';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/components/Navigation/CustomDrawer';

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={myTheme.main} />
      <PaperProvider>
        <ToastProvider>
          <NavigationContainer>
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
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </>
  );
}
export default App;
