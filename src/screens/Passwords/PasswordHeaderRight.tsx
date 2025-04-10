import React from 'react';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {usePasswordsStore} from '../../store/passwordStore';
import Typography from '../../components/atoms/Typography';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProfileContext} from '../../context/ProfileContext';
import {useProfileStore} from '../../store/profileStore';
import {StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const PasswordHeaderRight = () => {
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deletePasswords = usePasswordsStore(state => state.deletePasswords);
  const {openProfileSelection} = useProfileContext()!;
  const {selectedProfile} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
  }));
  const styles = useStyleSheet(themedStyles);
  if (selectedPasswords.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => openProfileSelection()}
        style={styles.switch}>
        <Typography>{selectedProfile?.name ?? 'Mahesh'}</Typography>
        <MaterialIcon
          onPress={() => openProfileSelection()}
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
      <Typography>Delete</Typography>
    </PressableWithFeedback>
  );
};

export default PasswordHeaderRight;
const themedStyles = StyleService.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'button-primary-bg',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
