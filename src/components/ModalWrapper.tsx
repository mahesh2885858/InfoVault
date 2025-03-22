import React from 'react';
import {Pressable} from 'react-native';
import {Modal, StatusBar, StyleSheet} from 'react-native';

type TProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: null | '90%';
};

const ModalWrapper = (props: TProps) => {
  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent
      onRequestClose={props.onClose}>
      <StatusBar backgroundColor={'#00000099'} />
      <Pressable
        onPress={e => {
          e.stopPropagation();
          props.onClose();
        }}
        style={styles.container}>
        {props.children}
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ModalWrapper;
