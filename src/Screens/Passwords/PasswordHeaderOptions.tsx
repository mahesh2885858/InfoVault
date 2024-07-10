import {myTheme} from '../../../theme';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import PasswordHeader from './PasswordHeader';

export const PasswordsHeaderOptions: DrawerNavigationOptions = {
  headerStyle: {backgroundColor: myTheme.main},
  headerTintColor: myTheme.secondary,
  header: PasswordHeader,
  headerTitle: '',
  headerShadowVisible: false,
};
