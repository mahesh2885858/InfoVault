import React from 'react';
import {useCardStore} from '../../store/cardStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProfileContext} from '../../context/ProfileContext';
import {useProfileStore} from '../../store/profileStore';
import {StyleSheet} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';

const CardHeaderRight = () => {
  const selectedCards = useCardStore(state => state.selectedCards);
  const removeCards = useCardStore(state => state.removeCards);
  const {openProfileSelection} = useProfileContext()!;
  const {selectedProfile} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
  }));

  const styles = useStyleSheet(themedStyles);

  if (selectedCards.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => openProfileSelection()}
        style={styles.switch}>
        <Typography>{selectedProfile?.name ?? ''}</Typography>
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
      <Typography>Delete</Typography>
    </PressableWithFeedback>
  );
};

export default CardHeaderRight;

const themedStyles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'button-primary-bg',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
