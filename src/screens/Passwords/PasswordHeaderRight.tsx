import React from 'react';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {usePasswordsStore} from '../../store/passwordStore';
import LightText from '../../components/atoms/LightText';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProfileContext} from '../../context/ProfileContext';
import {useProfileStore} from '../../store/profileStore';
import {StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';

const PasswordHeaderRight = () => {
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deletePasswords = usePasswordsStore(state => state.deletePasswords);
  const {openProfileSelection} = useProfileContext()!;
  const {selectedProfile} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
  }));
  if (selectedPasswords.length === 0) {
    return (
      <PressableWithFeedback
        onPress={openProfileSelection}
        style={styles.switch}>
        <LightText>{selectedProfile?.name ?? 'Mahesh'}</LightText>
        <MaterialIcon
          onPress={openProfileSelection}
          name="chevron-down"
          color="white"
          size={25}
        />
      </PressableWithFeedback>
    );
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
const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: myTheme.buttonBg,
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
