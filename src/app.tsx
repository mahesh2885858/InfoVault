import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CustomDrawer from './components/Navigation/CustomDrawer';
import Cards from './screens/Cards/Cards';
import Passwords from './screens/Passwords';
import Profiles from './screens/Profiles';
import Settings from './screens/Settings';
import { DrawerParamsList, RootStackParamList } from './types';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import ExpenseTracker from './screens/ExpenseTracker';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamsList>();

function DrawerNavigator() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: theme.colors.surfaceVariant,
        drawerLabelStyle: {
          color: theme.colors.onBackground,
        },
        swipeEdgeWidth: 50,
      }}
      drawerContent={CustomDrawer}
      initialRouteName="Cards"
    >
      <Drawer.Screen
        name="Cards"
        component={Cards}
        options={{
          headerShown: false,
          title: t('cards.title'),
        }}
      />
      <Drawer.Screen
        name="Passwords"
        component={Passwords}
        options={{
          headerShown: false,
          title: t('passwords.title'),
        }}
      />
      <Drawer.Screen
        name="Profiles"
        component={Profiles}
        options={{
          headerShown: false,
          title: t('profiles.title'),
        }}
      />
      <Drawer.Screen
        name="Expense Tracker"
        component={ExpenseTracker}
        options={{
          headerShown: false,
          title: t('tracker.title'),
        }}
      />
    </Drawer.Navigator>
  );
}

function AppNavigator(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            title: t('settings.title'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
