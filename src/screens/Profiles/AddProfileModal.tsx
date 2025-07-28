import React, { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import { TextInput } from 'react-native';
import Button from '../../components/atoms/Button';
import { View } from 'react-native';

import { useProfileStore } from '../../store/profileStore';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';

type TProps = {
  onClose: () => void;
  visible: boolean;
  mode?: 'new' | 'edit';
};

const AddProfileModal = (props: TProps) => {
  const { mode = 'new' } = props;
  const styles = useStyleSheet(themedStyles);
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
    <ModalWrapper visible={props.visible} onClose={props.onClose}>
      <View style={styles.container}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Add profile"
          placeholderTextColor={theme['text-secondary']}
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

const themedStyles = StyleService.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    width: '70%',
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    backgroundColor: 'bg-main',
    borderRadius: 10,
    color: 'text-primary',
  },
});
