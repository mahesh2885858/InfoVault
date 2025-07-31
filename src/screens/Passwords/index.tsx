import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import { DEFAULT_PROFILE_ID, PASSWORD_HEIGHT } from '../../constants';
import { usePasswordsStore } from '../../store/passwordStore';
import { useProfileStore } from '../../store/profileStore';
import AddPasswordModal from './AddPasswordModal';
import RenderPassword from './RenderPassword';
import PasswordHeader from './PasswordHeader';
import { useMiscStore } from '../../store/miscStore';
import { TPassword } from '../../types';
import { useTheme } from 'react-native-paper';

const Passwords = () => {
  const [visible, setVisibility] = useState(false);
  const theme = useTheme();
  const listRef = useRef<FlatList>(null);
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  const passwords = usePasswordsStore(state => state.passwords);
  const focusedId = usePasswordsStore(state => state.focusedPassword);
  const selectedProfile = useProfileStore(state => state.selectedProfileId);
  const search = useMiscStore(state => state.search);
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
      <Animated.FlatList
        ref={listRef}
        data={passwordsToRender}
        contentContainerStyle={styles.cardContainer}
        renderItem={item => {
          return <RenderPassword {...item.item} />;
        }}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={item => item.id}
        getItemLayout={(_, index) => ({
          length: PASSWORD_HEIGHT,
          index,
          offset: PASSWORD_HEIGHT * index,
        })}
      />

      <Fab
        callBack={() => {
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
    paddingTop: 25,
    minHeight: '100%', // should be added to fix an issue refer:https://github.com/software-mansion/react-native-reanimated/issues/5728#issuecomment-2551570107
  },

  header: {
    paddingTop: 20,
  },
});

export default Passwords;
