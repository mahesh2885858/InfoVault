import React from 'react';
import {Modal, StatusBar, StyleSheet, View} from 'react-native';

type TProps = {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: null | '90%';
};

const ModalWrapper = (props: TProps) => {
  return (
    <Modal visible={props.visible} animationType="fade" transparent>
      <StatusBar backgroundColor={'#00000099'} />
      <View style={styles.container}>{props.children}</View>
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
