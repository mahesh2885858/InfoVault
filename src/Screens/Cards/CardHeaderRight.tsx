import React from 'react';
import {Text} from 'react-native';
import {useCardStore} from '../../Store/cardStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';

const CardHeaderRight = () => {
  const selectedCards = useCardStore(state => state.selectedCards);
  const removeCards = useCardStore(state => state.removeCard);

  if (selectedCards.length === 0) {
    return null;
  }

  return (
    <PressableWithFeedback onPress={() => removeCards()}>
      <Text>Delete</Text>
    </PressableWithFeedback>
  );
};

export default CardHeaderRight;
