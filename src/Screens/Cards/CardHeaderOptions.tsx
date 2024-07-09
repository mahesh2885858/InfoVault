import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {myTheme} from '../../../theme';
import CardHeaderRight from './CardHeaderRight';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import CardHeaders from './CardHeaders';

export const CardHeaderOptions: DrawerNavigationOptions = {
  headerStyle: {backgroundColor: myTheme.main},
  headerTintColor: myTheme.secondary,
  // headerRight: CardHeaderRight,
  // headerLeft: CardHeaderTitleWithBackButton,
  headerTitle: '',
  headerShadowVisible: false,
  header(props) {
    return <CardHeaders {...props} />;
  },
};
