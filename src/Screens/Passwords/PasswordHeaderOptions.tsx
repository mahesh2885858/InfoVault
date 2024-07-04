import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {myTheme} from '../../../theme';
import PasswordHeaderRight from './PasswordHeaderRight';
import PasswordHeaderTitleWithBackButton from './PasswordHeaderTitleWithBackButton';

export const PasswordsHeaderOptions: NativeStackNavigationOptions = {
  headerStyle: {backgroundColor: myTheme.main},
  headerTintColor: myTheme.secondary,
  headerRight: PasswordHeaderRight,
  headerLeft: PasswordHeaderTitleWithBackButton,
  headerTitle: '',
};
