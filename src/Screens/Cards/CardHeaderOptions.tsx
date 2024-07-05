import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import {myTheme} from '../../../theme';
import CardHeaderRight from './CardHeaderRight';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';

export const CardHeaderOptions: NativeStackNavigationOptions = {
  headerStyle: {backgroundColor: myTheme.main},
  headerTintColor: myTheme.secondary,
  headerRight: CardHeaderRight,
  headerLeft: CardHeaderTitleWithBackButton,
  headerTitle: '',
  headerSearchBarOptions: {
    placeholder: 'serch here',
    onChangeText: text => {
      console.log({text: text.nativeEvent.text});
    },
    placement: 'stacked',
  },
};
