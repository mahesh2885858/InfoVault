/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Text} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
function Home(): React.JSX.Element {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <Text>Home</Text>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      {/* <App /> */}
    </NavigationContainer>
  );
}
export default App;
