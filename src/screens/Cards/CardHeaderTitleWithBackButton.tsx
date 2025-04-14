import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useCardStore} from '../../store/cardStore';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';

const CardHeaderTitleWithBackButton = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const navigation = useNavigation();
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const selectedCards = useCardStore(state => state.selectedCards);
  return (
    <View style={styles.container}>
      <PressableWithFeedback
        hidden={selectedCards.length === 0}
        onPress={() => {
          if (selectedCards.length > 0) {
            deSelectAll();
          }
        }}>
        <MaterialIcon
          name="arrow-left-thin"
          size={24}
          color={theme['text-primary']}
        />
      </PressableWithFeedback>
      <PressableWithFeedback
        hidden={selectedCards.length > 0}
        onPress={() => {
          if (selectedCards.length === 0) {
            navigation.dispatch(DrawerActions.openDrawer());
          } else {
            // navigation.goBack();
          }
        }}>
        <MaterialIcon name="menu" size={24} color={theme['text-primary']} />
      </PressableWithFeedback>
      <Typography style={styles.text}>Cards</Typography>
    </View>
  );
};
const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: 'text-primary',
  },
});
export default CardHeaderTitleWithBackButton;
