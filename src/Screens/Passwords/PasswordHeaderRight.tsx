import React from 'react';
import {Text} from 'react-native';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {usePasswordsStore} from '../../Store/passwordStore';

const PasswordHeaderRight = () => {
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);

  if (selectedPasswords.length === 0) {
    return null;
  }

  return (
    <PressableWithFeedback onPress={() => {}}>
      <Text>Delete</Text>
    </PressableWithFeedback>
  );
};

export default PasswordHeaderRight;
