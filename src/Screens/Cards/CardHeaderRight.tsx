import {View, Text} from 'react-native';
import React from 'react';
import {useCardStore} from '../../Store/cardStore';
import PressableWithFeedback from '../../components/PressableWithFeedback';

const CardHeaderRight = () => {
  const selectedCards = useCardStore(state => state.selectedChats);
  const removeCards = useCardStore(state => state.removeCard);
  if (selectedCards.length === 0) return null;
  return (
    <PressableWithFeedback onPress={() => removeCards()}>
      <Text>Delete</Text>
    </PressableWithFeedback>
  );
};

export default CardHeaderRight;
