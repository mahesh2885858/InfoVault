import { useFocusEffect } from '@react-navigation/native';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import { DEFAULT_PROFILE_ID, HOME_PROFILE_ID } from '../../constants';
import { useMiscStore } from '../../store/miscStore';
import { usePasswordsStore } from '../../store/passwordStore';
import { useProfileStore } from '../../store/profileStore';
import { TPassword } from '../../types';
import AddPasswordModal from './AddPasswordModal';
import PasswordHeader from './PasswordHeader';
import RenderPassword from './RenderPassword';

const Passwords = () => {
  const [visible, setVisibility] = useState(false);
  const theme = useTheme();
  const listRef = useRef<FlashListRef<TPassword>>(null);
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  const passwords = usePasswordsStore(state => state.passwords);
  const focusedId = usePasswordsStore(state => state.focusedPassword);
  const selectedProfile = useProfileStore(state => state.selectedProfileId);
  const search = useMiscStore(state => state.search);
  const selectProfileForAddingANewRecord = useProfileStore(
    state => state.selectProfileForAddingANewRecord,
  );
  const passwordsToRender = passwords
    .filter(
      password =>
        (selectedProfile === DEFAULT_PROFILE_ID ||
          password.profileId === selectedProfile) &&
        (search.trim().length === 0 ||
          password.website.toLowerCase().includes(search.toLowerCase())),
    )
    .reduce((acc, password) => {
      if (password.isPinned) {
        acc.unshift(password);
      } else {
        acc.push(password);
      }
      return acc;
    }, [] as TPassword[]);

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (selectedPasswords.length > 0) {
          deSelectAll();
          return true;
        }
        return false;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => subscription.remove();
    }, [selectedPasswords, deSelectAll]),
  );

  useFocusEffect(
    useCallback(() => {
      if (focusedId.trim().length === 0) return;
      const indexOfFocusedId = passwords.findIndex(
        password => password.id === focusedId,
      );

      if (indexOfFocusedId >= 0) {
        listRef.current!.scrollToIndex({
          index: indexOfFocusedId,
          animated: true,
        });
      }
    }, [focusedId, passwords]),
  );

  return (
    <Container style={[styles.container]}>
      <StatusBar backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        <PasswordHeader />
      </View>
      <FlashList
        ref={listRef}
        data={passwordsToRender}
        contentContainerStyle={styles.cardContainer}
        renderItem={item => {
          listRef.current?.prepareForLayoutAnimationRender();
          return <RenderPassword {...item.item} />;
        }}
        keyExtractor={item => item.id}
      />

      <Fab
        callBack={() => {
          selectProfileForAddingANewRecord(
            selectedProfile === DEFAULT_PROFILE_ID
              ? HOME_PROFILE_ID
              : selectedProfile,
          );
          setVisibility(true);
        }}
      />
      <View>
        <AddPasswordModal setVisible={setVisibility} visible={visible} />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    gap: 13,
    paddingBottom: 100,
  },

  header: {
    paddingVertical: 10,
  },
});

export default Passwords;
