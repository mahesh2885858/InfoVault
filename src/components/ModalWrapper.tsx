import React from 'react';
import {ColorValue} from 'react-native';
import {StyleProp} from 'react-native';
import {Pressable} from 'react-native';
import {Modal, StatusBar, StyleSheet} from 'react-native';

type TProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: null | '90%';
  bg?: StyleProp<ColorValue>;
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
        style={[
          styles.container,
          {
            backgroundColor: props.bg ? props.bg : '#00000099',
          },
        ]}
        onPress={e => {
          props.onClose();
        }}>
        <Pressable
          style={styles.child}
          onPress={e => {
            e.stopPropagation(); // This prevents the background press from triggering
          }}>
          {props.children}
        </Pressable>
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
  child: {
    width: '100%',
  },
});

export default ModalWrapper;
