import React from 'react';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {usePasswordsStore} from '../../store/passwordStore';
import Typography from '../../components/atoms/Typography';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProfileContext} from '../../context/ProfileContext';
import {useProfileStore} from '../../store/profileStore';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';

const PasswordHeaderRight = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deletePasswords = usePasswordsStore(state => state.deletePasswords);
  const togglePinPassword = usePasswordsStore(state => state.togglePinPassword);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  const {openProfileSelection} = useProfileContext()!;
  const {selectedProfile} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
  }));
  if (selectedPasswords.length === 0) {
    return (
      <PressableWithFeedback
        onPress={() => openProfileSelection()}
        style={styles.switch}>
        <Typography style={styles.text}>
          {selectedProfile?.name ?? 'Mahesh'}
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
    <>
      <PressableWithFeedback
        onPress={() => {
          deletePasswords();
        }}>
        <MaterialIcon name="delete" size={24} color={theme['text-primary']} />
      </PressableWithFeedback>
      <PressableWithFeedback
        hidden={selectedPasswords.length > 1}
        onPress={() => {
          togglePinPassword();
          deSelectAll();
        }}>
        <MaterialIcon name="pin" size={24} color={theme['text-primary']} />
      </PressableWithFeedback>
    </>
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
  text: {
    color: 'bg-main',
  },
});
