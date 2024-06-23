import React from 'react';
import {Modal, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {colors} from '../globals.ts';

type TProps = {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: null | '90%';
};

const ModalWrapper = (props: TProps) => {
  return (
    <Modal visible={props.visible} animationType="fade" transparent>
      <StatusBar backgroundColor={colors.background} />
      <Pressable style={styles.container}>
        <View style={[styles.content, {width: props.width ?? '85%'}]}>
          {props.children}
        </View>
      </Pressable>
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
  content: {
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    gap: 20,
  },
});

export default ModalWrapper;
