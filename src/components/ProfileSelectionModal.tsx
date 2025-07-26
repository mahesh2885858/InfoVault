import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {DEFAULT_PROFILE_ID} from '../constants';
import {useProfileStore} from '../store/profileStore';
import ModalWrapper from './ModalWrapper';
import PressableWithFeedback from './PressableWithFeedback';
import Button from './atoms/Button';
import Typography from './atoms/Typography';
type TProps = {
  visible: boolean;
  onClose: () => void;
  renderingForNewItemAdd?: boolean;
};
const ProfileSelectionModal = (props: TProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {
    profiles,
    selectedId,
    selectProfile,
    selectedProfileForAddingANewRecord,
    selectProfileForAddingANewRecord,
  } = useProfileStore(state => ({
    profiles: state.profiles,
    selectedId: state.selectedProfileId,
    selectProfile: state.selectProfile,
    selectedProfileForAddingANewRecord:
      state.selectedProfileForAddingANewRecord,
    selectProfileForAddingANewRecord: state.selectProfileForAddingANewRecord,
  }));

  const idToCompare = props.renderingForNewItemAdd
    ? selectedProfileForAddingANewRecord
    : selectedId;

  const selectItem = useCallback(
    (id: string) => {
      if (props.renderingForNewItemAdd) {
        selectProfileForAddingANewRecord(id);
        props.onClose();

        return;
      }
      selectProfile(id);
      props.onClose();
    },
    [props, selectProfile, selectProfileForAddingANewRecord],
  );
  return (
    <ModalWrapper onClose={props.onClose} visible={props.visible}>
      <View style={styles.rootView}>
        <View style={styles.container}>
          {profiles.map(item => {
            if (props.renderingForNewItemAdd && item.id === DEFAULT_PROFILE_ID)
              return null;
            return (
              <PressableWithFeedback
                key={item.id}
                onPress={() => selectItem(item.id)}
                style={styles.radioItem}>
                <RadioButton
                  value={item.name}
                  status={idToCompare === item.id ? 'checked' : 'unchecked'}
                  onPress={() => selectItem(item.id)}
                  color={theme['button-primary-bg']}
                />
                <Typography style={styles.text}>{item.name}</Typography>
              </PressableWithFeedback>
            );
          })}
        </View>
        <Button label="close" onButtonPress={props.onClose} />
      </View>
    </ModalWrapper>
  );
};

export default ProfileSelectionModal;

const themedStyles = StyleService.create({
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
    backgroundColor: 'bg-main',
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
