/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/Screens/Home';
import {HomeHeaderOptions} from './src/Screens/headers/HomeHeaderOptions';
import {PaperProvider} from 'react-native-paper';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={HomeHeaderOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;
