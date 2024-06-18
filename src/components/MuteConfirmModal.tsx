import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ModalWrapper from './ModalWrapper';

type TProps = {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMuteChat: () => void;
};

const MuteConfirmModal = (props: TProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('8 hours');
  const muteOptions = ['8 hours', '1 week', 'Always'];

  return (
    <ModalWrapper visible={props.visible} setVisibility={props.setVisibility}>
      <Text style={[styles.text, styles.headerText]}>Mute notifications</Text>
      <Text style={[styles.text, styles.subHeadingText]}>
        Other members will now see that you muted this chat. You will be
        notified if you are mentioned.
      </Text>

      <View style={styles.radioOptionContainer}>
        {muteOptions.map(p => {
          return (
            <Pressable
              key={p}
              onPress={() => {
                setSelectedValue(p);
              }}
              style={({pressed}) => [
                styles.radioOption,
                {backgroundColor: pressed ? 'grey' : 'transparent'},
              ]}>
              <RadioButton
                value={p}
                onPress={() => {
                  setSelectedValue(p);
                }}
                color="white"
                uncheckedColor="white"
                status={selectedValue === p ? 'checked' : 'unchecked'}
              />
              <Text style={styles.text}>{p}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => {
            props.setVisibility(false);
          }}>
          <Text style={[styles.text, styles.buttonsText]}>close</Text>
        </Pressable>

        <Pressable onPress={props.toggleMuteChat}>
          <Text style={[styles.text, styles.buttonsText]}>Mute</Text>
        </Pressable>
      </View>
    </ModalWrapper>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
  },
  subHeadingText: {
    fontSize: 15,
  },
  radioOptionContainer: {
    gap: 4,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  buttonsText: {
    fontSize: 15,
  },
});

export default MuteConfirmModal;
