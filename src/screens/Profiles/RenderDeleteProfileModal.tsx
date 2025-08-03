import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { textSize } from '../../../theme';
import Button from '../../components/atoms/Button';
import Typography from '../../components/atoms/Typography';
import ModalWrapper from '../../components/ModalWrapper';
import { useCardStore } from '../../store/cardStore';
import { usePasswordsStore } from '../../store/passwordStore';
import { TProfile } from '../../types';
import { useProfileStore } from '../../store/profileStore';
type TProps = {
  visible: boolean;
  onClose: () => void;
  profile: TProfile;
};
const RenderDeleteProfileModal = (props: TProps) => {
  const theme = useTheme();
  const cards = useCardStore(state => state.cards);
  const passwords = usePasswordsStore(state => state.passwords);
  const removeProfile = useProfileStore(state => state.removeProfile);
  const movePasswordsToDefaultProfile = usePasswordsStore(
    state => state.movePasswordsToDefaultProfile,
  );
  const moveCardsToDefaultProfile = useCardStore(
    state => state.moveCardsToDefaultProfile,
  );
  const profile = props.profile;
  const passwordsWithProfile = passwords.filter(
    password => password.profileId === profile.id,
  );
  const cardsWithProfile = cards.filter(card => card.profileId === profile.id);

  const handleDelete = useCallback(() => {
    if (passwordsWithProfile.length > 0) {
      movePasswordsToDefaultProfile(passwordsWithProfile);
    }
    if (cardsWithProfile.length > 0) {
      moveCardsToDefaultProfile(cardsWithProfile);
    }
    removeProfile(profile.id);
    props.onClose();
  }, [
    passwordsWithProfile,
    cardsWithProfile,
    movePasswordsToDefaultProfile,
    moveCardsToDefaultProfile,
    removeProfile,
    profile.id,
    props,
  ]);

  return (
    <ModalWrapper
      shouldCloseOnBackgroundPress={true}
      visible={props.visible}
      onClose={props.onClose}
    >
      <Surface
        elevation={5}
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View>
          <Typography style={styles.profileText}>
            Profile Name: {profile.name}
          </Typography>
          <Typography style={styles.descText}>
            Are you sure you want to delete this profile? This action cannot be
            undone.
          </Typography>
        </View>

        <View>
          {passwordsWithProfile.length > 0 && (
            <Typography
              style={{
                color: theme.colors.onErrorContainer,
              }}
            >
              This profile is associated with {passwordsWithProfile.length}{' '}
              password(s).
            </Typography>
          )}
          {cardsWithProfile.length > 0 && (
            <Typography
              style={{
                color: theme.colors.onErrorContainer,
              }}
            >
              This profile is associated with {cardsWithProfile.length} card(s).
            </Typography>
          )}
          {(passwordsWithProfile.length > 0 || cardsWithProfile.length > 0) && (
            <Typography style={styles.info}>
              All of the associated passwords and cards will be moved to the
              default profile.
            </Typography>
          )}
        </View>

        <View style={styles.buttons}>
          <Button label="Cancel" onButtonPress={props.onClose} />
          <Button label="Delete" onButtonPress={handleDelete} />
        </View>
      </Surface>
    </ModalWrapper>
  );
};

export default RenderDeleteProfileModal;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    gap: 10,
  },
  profileText: {
    fontSize: textSize.lg,
    marginBottom: 5,
  },
  descText: {
    fontSize: textSize.md,
  },
  info: {
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
