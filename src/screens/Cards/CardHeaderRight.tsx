import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import {useProfileContext} from '../../context/ProfileContext';
import {useCardStore} from '../../store/cardStore';
import {useProfileStore} from '../../store/profileStore';

const CardHeaderRight = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const selectedCards = useCardStore(state => state.selectedCards);
  const removeCards = useCardStore(state => state.removeCards);
  const togglePinCard = useCardStore(state => state.togglePinCard);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const {openProfileSelection} = useProfileContext()!;
  const {selectedProfile} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
  }));

  if (selectedCards.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => openProfileSelection()}
        style={styles.switch}>
        <Typography style={styles.text}>
          {selectedProfile?.name ?? ''}
        </Typography>
        <MaterialIcon
          onPress={() => openProfileSelection()}
          name="chevron-down"
          color={theme['bg-main']}
          size={25}
        />
      </PressableWithFeedback>
    );
  }

  return (
    <>
      <PressableWithFeedback
        onPress={() => removeCards(selectedCards.map(c => c.cardNumber))}>
        <MaterialIcon name="delete" size={24} color={theme['text-primary']} />
      </PressableWithFeedback>
      {selectedCards.length === 1 && (
        <PressableWithFeedback
          onPress={() => {
            togglePinCard();
            deSelectAll();
          }}>
          <MaterialIcon name="pin" size={24} color={theme['text-primary']} />
        </PressableWithFeedback>
      )}
    </>
  );
};

export default CardHeaderRight;

const themedStyles = StyleService.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'button-primary-bg',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
  text: {
    color: 'bg-main',
  },
});
