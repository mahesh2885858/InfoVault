import React from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import Container from '../../components/atoms/Container';
import {TextInput} from 'react-native';

type TProps = {
  onClose: () => void;
  visible: boolean;
};

const AddProfileModal = (props: TProps) => {
  return (
    <ModalWrapper visible={props.visible} onClose={props.onClose}>
      <Container>
        <TextInput />
      </Container>
    </ModalWrapper>
  );
};
export default AddProfileModal;
