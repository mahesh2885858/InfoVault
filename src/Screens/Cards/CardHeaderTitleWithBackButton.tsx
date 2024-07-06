import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import LightText from '../../components/atoms/LightText';
import {useNavigation} from '@react-navigation/native';
import {useCardStore} from '../../Store/cardStore';
const CardHeaderTitleWithBackButton = () => {
  const navigation = useNavigation();
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const selectedCards = useCardStore(state => state.selectedCards);
  return (
    <View style={styles.container}>
      <PressableWithFeedback
        onPress={() => {
          if (selectedCards.length > 0) {
            deSelectAll();
          } else {
            navigation.goBack();
          }
        }}>
        <MaterialIcon
          name="arrow-left-thin"
          size={24}
          color={myTheme.textMain}
        />
      </PressableWithFeedback>
      <LightText style={styles.text}>Cards</LightText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: myTheme.secondary,
  },
});
export default CardHeaderTitleWithBackButton;
