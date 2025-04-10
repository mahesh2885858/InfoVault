import React, {useState} from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import {TextInput} from 'react-native';
import Button from '../../components/atoms/Button';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

import {myTheme} from '../../../theme';
import {useProfileStore} from '../../store/profileStore';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

type TProps = {
  onClose: () => void;
  visible: boolean;
  mode?: 'new' | 'edit';
};

const AddProfileModal = (props: TProps) => {
  const {mode = 'new'} = props;
  const styles = useStyleSheet(themedStyles);

  const {selectedId, selectedProfile, createProfile, updateProfile} =
    useProfileStore(state => ({
      selectedId: state.selectedProfileId,
      selectedProfile: state.getSelectedProfile(),
      createProfile: state.addProfile,
      updateProfile: state.updateProfile,
    }));

  const [input, setInput] = useState(
    mode === 'new' ? '' : selectedProfile?.name ?? '',
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
    color: 'white',
  },
});
