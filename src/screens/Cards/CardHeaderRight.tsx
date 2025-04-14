import React from 'react';
import {useCardStore} from '../../store/cardStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProfileContext} from '../../context/ProfileContext';
import {useProfileStore} from '../../store/profileStore';
import {useStyleSheet, StyleService, useTheme} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

const CardHeaderRight = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const {t} = useTranslation();

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
    <PressableWithFeedback
      onPress={() => removeCards(selectedCards.map(c => c.cardNumber))}>
      <MaterialIcon name="delete" size={24} color={theme['text-primary']} />
    </PressableWithFeedback>
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
