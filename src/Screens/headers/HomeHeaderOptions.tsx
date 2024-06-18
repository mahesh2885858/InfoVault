import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {colors} from '../../globals';
import HomeHeader from './HomeHeader';
import React from 'react';
import HomeHeaderTitle from './HomeHeaderTitle';

export const HomeHeaderOptions: NativeStackNavigationOptions = {
  headerTitle: () => <HomeHeaderTitle />,
  headerStyle: {backgroundColor: colors.background},
  statusBarColor: colors.background,
  headerTitleStyle: {color: colors.primaryText},
  headerRight: () => <HomeHeader />,
};
