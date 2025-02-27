import React from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import Container from '../../components/atoms/Container';
import {TextInput} from 'react-native';
import Button from '../../components/atoms/Button';
import {StyleService} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import LightText from '../../components/atoms/LightText';

type TProps = {
  onClose: () => void;
  visible: boolean;
};

const AddProfileModal = (props: TProps) => {
  return (
    <ModalWrapper visible={props.visible} onClose={props.onClose}>
      <Container
        style={{
          width: '100%',
        }}>
        <TextInput style={styles.input} />
        <PressableWithFeedback>
          <LightText>Add</LightText>
        </PressableWithFeedback>
      </Container>
    </ModalWrapper>
  );
};
export default AddProfileModal;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 10,
    fontSize: 20,
  },
});
