import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {colors} from '../globals.ts';
import ModalWrapper from './ModalWrapper';

type TProps = {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  deleteChats: () => void;
  numberOfselectedChats: number;
};

const DeleteConfirmModal = (props: TProps) => {
  const info =
    props.numberOfselectedChats > 1
      ? 'Delete ' + props.numberOfselectedChats + ' chats?'
      : 'Delete this chat?';

  const [cleanMedia, setCleanMedia] = useState(false);

  return (
    <ModalWrapper visible={props.visible} setVisibility={props.setVisibility}>
      <Text style={styles.titleText}>{info}</Text>
      <View style={styles.radioOptionContainer}>
        <Pressable
          style={({pressed}) => [
            styles.radioOption,
            {backgroundColor: pressed ? 'grey' : 'transparent'},
          ]}>
          <RadioButton
            value={'cleanMedia'}
            color="white"
            uncheckedColor="white"
            onPress={() => {
              setCleanMedia(p => !p);
            }}
            status={cleanMedia ? 'checked' : 'unchecked'}
          />
          <Text style={styles.subText} numberOfLines={2}>
            Also delete media received in this chat from the device gallery
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => {
            props.setVisibility(false);
          }}>
          <Text style={[styles.subText, styles.buttonsText]}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            props.deleteChats();
          }}>
          <Text style={[styles.subText, styles.buttonsText]}>Delete chat</Text>
        </Pressable>
      </View>
    </ModalWrapper>
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
  radioOptionContainer: {
    gap: 4,
  },
  titleText: {
    fontSize: 24,
    color: colors.primaryText,
  },
  subText: {
    color: '#ffffff60',
    fontSize: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  buttonsText: {
    fontSize: 15,
    color: colors.primaryGreen,
  },
});

export default DeleteConfirmModal;
