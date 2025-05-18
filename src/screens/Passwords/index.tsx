import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import React, {useCallback, useRef, useState} from 'react';
import {BackHandler, FlatList, StatusBar, StyleSheet, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import {DEFAULT_PROFILE_ID, PASSWORD_HEIGHT} from '../../constants';
import {usePasswordsStore} from '../../store/passwordStore';
import {useProfileStore} from '../../store/profileStore';
import AddPasswordModal from './AddPasswordModal';
import RenderPassword from './RenderPassword';

const Passwords = () => {
  const [visible, setVisibility] = useState(false);
  const theme = useTheme();
  const listRef = useRef<FlatList>(null);
  const {selectedPasswords, deSelectAll, passwords, focusedId} =
    usePasswordsStore(state => ({
      selectedPasswords: state.selectedPasswords,
      deSelectAll: state.deSelectAll,
      passwords: state.passwords,
      focusedId: state.focusedPassword,
      setFocusedId: state.setFocusedPassword,
    }));
  const selectedProfile = useProfileStore(state => state.selectedProfileId);
  const passwordsToRender = passwords.filter(
    password =>
      selectedProfile === DEFAULT_PROFILE_ID ||
      password.profileId === selectedProfile,
  );

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
    <Container style={styles.container}>
      <StatusBar backgroundColor={theme['bg-main']} />

      <Animated.FlatList
        ref={listRef}
        data={passwordsToRender}
        contentContainerStyle={styles.cardConatiner}
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
  cardConatiner: {
    gap: 13,
    paddingBottom: 100,
    paddingTop: 20,
    minHeight: '100%', // should be added to fix an issue refer:https://github.com/software-mansion/react-native-reanimated/issues/5728#issuecomment-2551570107
  },

  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
});

export default Passwords;
