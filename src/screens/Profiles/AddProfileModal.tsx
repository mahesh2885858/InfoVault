import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Button from '../../components/atoms/Button';
import ModalWrapper from '../../components/ModalWrapper';

import { useTheme } from 'react-native-paper';
import { useProfileStore } from '../../store/profileStore';

type TProps = {
  onClose: () => void;
  visible: boolean;
  mode?: 'new' | 'edit';
};

const AddProfileModal = (props: TProps) => {
  const { mode = 'new' } = props;
  const theme = useTheme();

  const selectedId = useProfileStore(state => state.selectedProfileId);
  const selectedProfile = useProfileStore(state => state.getSelectedProfile);
  const createProfile = useProfileStore(state => state.addProfile);
  const updateProfile = useProfileStore(state => state.updateProfile);

  const [input, setInput] = useState(
    mode === 'new' ? '' : selectedProfile()?.name ?? '',
  );

  const onSave = () => {
    if (input.trim().length < 2) return;

    if (mode === 'new') {
      createProfile({
        id: Date.now().toString(),
        name: input.trim(),
      });
    } else {
      updateProfile({
        id: selectedId,
        name: input.trim(),
      });
    }
    props.onClose();
  };

  return (
    <ModalWrapper
      visible={props.visible}
      shouldCloseOnBackgroundPress
      onClose={props.onClose}
    >
      <View style={styles.container}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={[
            styles.input,
            {
              color: theme.colors.onSurface,
              backgroundColor: theme.colors.surface,
            },
          ]}
          placeholder="Click here to enter profile name"
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <Button
          label={mode === 'new' ? 'Add' : 'Update'}
          onButtonPress={onSave}
        />
      </View>
    </ModalWrapper>
  );
};
export default AddProfileModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    width: '70%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 14,
    borderRadius: 10,
  },
});
