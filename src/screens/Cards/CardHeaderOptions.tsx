import {myTheme} from '../../../theme';

import {DrawerNavigationOptions} from '@react-navigation/drawer';
import CardHeaders from './CardHeaders';

export const CardHeaderOptions: DrawerNavigationOptions = {
  headerStyle: {backgroundColor: myTheme.main},
  headerTintColor: myTheme.secondary,
  headerTitle: '',
  headerShadowVisible: false,
  header: CardHeaders,
};
