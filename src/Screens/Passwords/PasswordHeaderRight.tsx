import React from 'react';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {usePasswordsStore} from '../../Store/passwordStore';
import LightText from '../../components/atoms/LightText';

const PasswordHeaderRight = () => {
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deletePasswords = usePasswordsStore(state => state.deletePasswords);

  if (selectedPasswords.length === 0) {
    return null;
  }

  return (
    <PressableWithFeedback
      onPress={() => {
        deletePasswords();
      }}>
      <LightText>Delete</LightText>
    </PressableWithFeedback>
  );
};

export default PasswordHeaderRight;
