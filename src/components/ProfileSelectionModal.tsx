import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import { useProfileStore } from '../store/profileStore';
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
  const theme = useTheme();
  const profiles = useProfileStore(state => state.profiles);
  const selectedId = useProfileStore(state => state.selectedProfileId);
  const selectProfile = useProfileStore(state => state.selectProfile);
  const selectedProfileForAddingANewRecord = useProfileStore(
    state => state.selectedProfileForAddingANewRecord,
  );
  const selectProfileForAddingANewRecord = useProfileStore(
    state => state.selectProfileForAddingANewRecord,
  );

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
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          {profiles.map(item => {
            // if (props.renderingForNewItemAdd && item.id === DEFAULT_PROFILE_ID)
            //   return null;
            return (
              <PressableWithFeedback
                key={item.id}
                onPress={() => selectItem(item.id)}
                style={styles.radioItem}
              >
                <RadioButton
                  value={item.name}
                  status={idToCompare === item.id ? 'checked' : 'unchecked'}
                  onPress={() => selectItem(item.id)}
                  color={theme.colors.onBackground}
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
