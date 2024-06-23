/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './src/Screens/Home/Home';
import {HomeHeaderOptions} from './src/Screens/Home/headers/HomeHeaderOptions';
import {PaperProvider} from 'react-native-paper';
import Cards from './src/Screens/Cards/Cards';
import {RootStackParamList} from './src/Types/Navigation';
import {CardHeaderOptions} from './src/Screens/Cards/CardHeaderOptions';
const Stack = createNativeStackNavigator<RootStackParamList>();

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
          <Stack.Screen
            name="Cards"
            component={Cards}
            options={CardHeaderOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;
