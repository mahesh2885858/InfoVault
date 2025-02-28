import React from 'react';
import ModalWrapper from './ModalWrapper';
import {useProfileStore} from '../store/profileStore';
import {RadioButton} from 'react-native-paper';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import PressableWithFeedback from './PressableWithFeedback';
import LightText from './atoms/LightText';
import {myTheme} from '../../theme';
import Button from './atoms/Button';
type TProps = {
  visible: boolean;
  onClose: () => void;
};
const ProfileSelectionModal = (props: TProps) => {
  const {profiles, selectedId, selectProfile} = useProfileStore(state => ({
    profiles: state.profiles,
    selectedId: state.selectedProfileId,
    selectProfile: state.selectProfile,
  }));

  console.log({selectedId});

  return (
    <ModalWrapper onClose={props.onClose} visible={props.visible}>
      <View style={styles.rootView}>
        <View style={styles.container}>
          {profiles.map(item => (
            <PressableWithFeedback
              key={item.id}
              onPress={() => {
                selectProfile(item.id);
                props.onClose();
              }}
              style={styles.radioItem}>
              <RadioButton
                value={item.name}
                status={selectedId === item.id ? 'checked' : 'unchecked'}
                onPress={() => {
                  selectProfile(item.id);
                  props.onClose();
                }}
              />
              <LightText style={styles.text}>{item.name}</LightText>
            </PressableWithFeedback>
          ))}
        </View>
        <Button label="close" onButtonPress={props.onClose} />
      </View>
    </ModalWrapper>
  );
};

export default ProfileSelectionModal;

const styles = StyleSheet.create({
  rootView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  container: {
    gap: 15,
    width: '80%',
    alignItems: 'flex-start',
    backgroundColor: myTheme.cardBg,
    padding: 10,
    borderRadius: 5,
  },
  radioItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
});
