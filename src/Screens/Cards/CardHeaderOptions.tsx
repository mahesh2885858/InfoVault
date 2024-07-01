import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {myTheme} from '../../../theme';
import CardHeaderRight from './CardHeaderRight';

export const CardHeaderOptions: NativeStackNavigationOptions = {
  headerStyle: {backgroundColor: myTheme.main},
  headerTintColor: myTheme.secondary,
  headerRight: CardHeaderRight,
};
