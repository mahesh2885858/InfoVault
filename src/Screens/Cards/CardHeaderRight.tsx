import React from 'react';
import {useCardStore} from '../../Store/cardStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import LightText from '../../components/atoms/LightText';

const CardHeaderRight = () => {
  const selectedCards = useCardStore(state => state.selectedCards);
  const removeCards = useCardStore(state => state.removeCard);

  if (selectedCards.length === 0) {
    return null;
  }

  return (
    <PressableWithFeedback onPress={() => removeCards()}>
      <LightText>Delete</LightText>
    </PressableWithFeedback>
  );
};

export default CardHeaderRight;
