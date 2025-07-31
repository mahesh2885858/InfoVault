import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../../components/atoms/Typography';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import { useProfileContext } from '../../context/ProfileContext';
import { usePasswordsStore } from '../../store/passwordStore';
import { useProfileStore } from '../../store/profileStore';

const PasswordHeaderRight = () => {
  const theme = useTheme();
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deletePasswords = usePasswordsStore(state => state.deletePasswords);
  const togglePinPassword = usePasswordsStore(state => state.togglePinPassword);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  const { openProfileSelection } = useProfileContext()!;
  const selectedProfile = useProfileStore(state => state.getSelectedProfile);
  if (selectedPasswords.length === 0) {
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
        <Typography style={{}}>
          {selectedProfile()?.name ?? 'Mahesh'}
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
        onPress={() => {
          deletePasswords();
        }}
      >
        <MaterialIcon
          name="delete"
          size={24}
          color={theme.colors.onBackground}
        />
      </PressableWithFeedback>
      <PressableWithFeedback
        hidden={selectedPasswords.length > 1}
        onPress={() => {
          togglePinPassword();
          deSelectAll();
        }}
      >
        <MaterialIcon name="pin" size={24} color={theme.colors.onBackground} />
      </PressableWithFeedback>
    </>
  );
};

export default PasswordHeaderRight;
const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});
