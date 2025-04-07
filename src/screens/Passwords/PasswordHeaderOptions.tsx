import {myTheme} from '../../../theme';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import PasswordHeader from './PasswordHeader';

export const PasswordsHeaderOptions: DrawerNavigationOptions = {
  headerStyle: {backgroundColor: 'red'},
  headerTintColor: myTheme.secondary,
  header: PasswordHeader,
  headerTitle: '',
  headerShadowVisible: false,
};
