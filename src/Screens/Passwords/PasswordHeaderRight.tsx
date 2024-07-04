import React from 'react';
import {Text} from 'react-native';
import PressableWithFeedback from '../../components/PressableWithFeedback';

const PasswordHeaderRight = () => {
  //   const selectedCards = useCardStore(state => state.selectedCards);
  //   const removeCards = useCardStore(state => state.removeCard);

  //   if (selectedCards.length === 0) {
  //     return null;
  //   }

  return (
    <PressableWithFeedback onPress={() => {}}>
      <Text>Delete</Text>
    </PressableWithFeedback>
  );
};

export default PasswordHeaderRight;
