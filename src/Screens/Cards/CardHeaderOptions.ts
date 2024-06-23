import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {colors} from '../../globals';

export const CardHeaderOptions: NativeStackNavigationOptions = {
  statusBarColor: colors.background,
  //   header: () => CardHeaders(),
  headerStyle: {backgroundColor: colors.background},
  headerTintColor: colors.primaryText,
};
