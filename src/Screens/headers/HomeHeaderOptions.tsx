import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {colors} from '../../globals';
import HomeHeader from './HomeHeader';
import React from 'react';

export const HomeHeaderOptions: NativeStackNavigationOptions = {
  headerTitle: 'WhatsApp',
  headerStyle: {backgroundColor: colors.background},
  statusBarColor: colors.background,
  headerTitleStyle: {color: colors.primaryText},
  headerRight: () => <HomeHeader />,
};
