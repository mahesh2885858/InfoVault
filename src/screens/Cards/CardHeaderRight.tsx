import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import { useProfileContext } from '../../context/ProfileContext';
import { useCardStore } from '../../store/cardStore';
import { useProfileStore } from '../../store/profileStore';

const CardHeaderRight = () => {
  const theme = useTheme();

  const selectedCards = useCardStore(state => state.selectedCards);
  const removeCards = useCardStore(state => state.removeCards);
  const togglePinCard = useCardStore(state => state.togglePinCard);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const { openProfileSelection } = useProfileContext()!;
  const selectedProfile = useProfileStore(state => state.getSelectedProfile);

  if (selectedCards.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => openProfileSelection()}
        style={[
          styles.switch,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
        ]}
      >
        <Typography style={{ color: theme.colors.onBackground }}>
          {selectedProfile()?.name ?? ''}
        </Typography>
        <MaterialIcon
          onPress={() => openProfileSelection()}
          name="chevron-down"
          color={theme.colors.onBackground}
          size={25}
        />
      </PressableWithFeedback>
    );
  }

  return (
    <>
      <PressableWithFeedback
        onPress={() => removeCards(selectedCards.map(c => c.cardNumber))}
      >
        <MaterialIcon
          name="delete"
          size={24}
          color={theme.colors.onBackground}
        />
      </PressableWithFeedback>
      {selectedCards.length === 1 && (
        <PressableWithFeedback
          onPress={() => {
            togglePinCard();
            deSelectAll();
          }}
        >
          <MaterialIcon
            name="pin"
            size={24}
            color={theme.colors.onBackground}
          />
        </PressableWithFeedback>
      )}
    </>
  );
};

export default CardHeaderRight;

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
