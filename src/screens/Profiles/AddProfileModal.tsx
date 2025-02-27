import React from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import {TextInput} from 'react-native';
import Button from '../../components/atoms/Button';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

import {myTheme} from '../../../theme';

type TProps = {
  onClose: () => void;
  visible: boolean;
};

const AddProfileModal = (props: TProps) => {
  return (
    <ModalWrapper visible={props.visible} onClose={props.onClose}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Add profile" />
        <Button label="Add" onButtonPress={() => {}} />
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
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    backgroundColor: myTheme.main,
    borderRadius: 10,
  },
});
