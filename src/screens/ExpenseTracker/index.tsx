import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ExpenseTrackerStackParamList } from '../../types';
import Accounts from './Accounts';
import { useTranslation } from 'react-i18next';
const Stack = createNativeStackNavigator<ExpenseTrackerStackParamList>();

const ExpenseTracker = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Accounts">
      <Stack.Screen
        name="Accounts"
        component={Accounts}
        options={{ headerShown: false, title: t('tracker.account') }}
      />
    </Stack.Navigator>
  );
};

export default ExpenseTracker;
