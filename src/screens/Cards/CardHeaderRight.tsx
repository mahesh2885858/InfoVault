import React from 'react';
import {useCardStore} from '../../store/cardStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import LightText from '../../components/atoms/LightText';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProfileContext} from '../../context/ProfileContext';
import {useProfileStore} from '../../store/profileStore';
import {StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';

const CardHeaderRight = () => {
  const selectedCards = useCardStore(state => state.selectedCards);
  const removeCards = useCardStore(state => state.removeCards);
  const {openProfileSelection} = useProfileContext()!;
  const {selectedProfile} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
  }));

  if (selectedCards.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => openProfileSelection()}
        style={styles.switch}>
        <LightText>{selectedProfile?.name ?? ''}</LightText>
        <MaterialIcon
          onPress={() => openProfileSelection()}
          name="chevron-down"
          color="white"
          size={25}
        />
      </PressableWithFeedback>
    );
  }

  return (
    <PressableWithFeedback
      onPress={() => removeCards(selectedCards.map(c => c.cardNumber))}>
      <LightText>Delete</LightText>
    </PressableWithFeedback>
  );
};

export default CardHeaderRight;

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: myTheme.buttonBg,
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
