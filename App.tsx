/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {ToastProvider} from 'react-native-toast-notifications';
import CustomDrawer from './src/components/Navigation/CustomDrawer';
import {CardHeaderOptions} from './src/screens/Cards/CardHeaderOptions';
import Cards from './src/screens/Cards/Cards';
import Passwords from './src/screens/Passwords';
import {PasswordsHeaderOptions} from './src/screens/Passwords/PasswordHeaderOptions';
import Settings from './src/screens/Settings';
import {DrawerParamsList, RootStackParamList} from './src/types/navigation';
// import {authenticateLocal} from './src/utils/authenticateLocal';
import {myTheme} from './theme';
import SettingsHeader from './src/screens/Settings/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Profiles from './src/screens/Profiles';
import {ProfileContextProvider} from './src/context/ProfileContext';
import {AuthContextProvider} from './src/context/AuthContext';

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
      <Drawer.Screen
        name="Profiles"
        component={Profiles}
        options={{
          title: 'Profiles',
          headerStyle: {
            backgroundColor: myTheme.main,
          },
          headerTintColor: myTheme.textMain,
        }}
      />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   const authenticate = async () => {
  //     const result = await authenticateLocal();
  //     if (!result) {
  //       BackHandler.exitApp();
  //     }
  //     setIsAuthenticated(true);
  //   };
  //   authenticate();
  // }, []);
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={myTheme.main} />
      <PaperProvider>
        <AuthContextProvider>
          <ProfileContextProvider>
            <ToastProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Drawer">
                  <Stack.Screen
                    name="Drawer"
                    component={DrawerNavigator}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      header: SettingsHeader,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ToastProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
export default App;
