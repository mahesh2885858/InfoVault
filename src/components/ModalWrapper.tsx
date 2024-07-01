import React from 'react';
import {Modal, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {colors} from '../globals.ts';
import {myTheme} from '../../theme.ts';

type TProps = {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: null | '90%';
};

const ModalWrapper = (props: TProps) => {
  return (
    <Modal visible={props.visible} animationType="fade" transparent>
      <StatusBar backgroundColor={myTheme.main} />
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ModalWrapper;
