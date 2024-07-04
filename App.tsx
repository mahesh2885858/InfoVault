/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {CardHeaderOptions} from './src/Screens/Cards/CardHeaderOptions';
import Cards from './src/Screens/Cards/Cards';
import Home from './src/Screens/Home/Home';
import {RootStackParamList} from './src/Types/Navigation';
import {StatusBar} from 'react-native';
import {myTheme} from './theme';
import Passwords from './src/Screens/Passwords';
import {PasswordsHeaderOptions} from './src/Screens/Passwords/PasswordHeaderOptions';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={myTheme.main} />
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cards"
              component={Cards}
              options={CardHeaderOptions}
            />
            <Stack.Screen
              name="Passwords"
              component={Passwords}
              options={PasswordsHeaderOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
export default App;
