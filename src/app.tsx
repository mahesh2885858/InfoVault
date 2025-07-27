import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@ui-kitten/components';
import React from 'react';
import CustomDrawer from './components/Navigation/CustomDrawer';
import Cards from './screens/Cards/Cards';
import Passwords from './screens/Passwords';
import Profiles from './screens/Profiles';
import Settings from './screens/Settings';
import {DrawerParamsList, RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamsList>();

function DrawerNavigator() {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: theme['bg-card'],
        drawerLabelStyle: {
          color: theme['text-primary'],
        },
        swipeEdgeWidth: 50,
      }}
      drawerContent={CustomDrawer}
      initialRouteName="Cards">
      <Drawer.Screen
        name="Cards"
        component={Cards}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Passwords"
        component={Passwords}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profiles"
        component={Profiles}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

function AppNavigator(): React.JSX.Element {
  return (
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
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
