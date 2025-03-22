import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {BackHandler, StatusBar, StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import {usePasswordsStore} from '../../store/passwordStore';
import RenderPassword from './RenderPassword';
import AddPasswordModal from './AddPasswordModal';
import {useProfileStore} from '../../store/profileStore';
import {DEFAULT_PROFILE_ID} from '../../constants';
import Animated, {LinearTransition} from 'react-native-reanimated';

const Passwords = () => {
  const [visible, setVisibility] = useState(false);
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  const passwords = usePasswordsStore(state => state.passwords);
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

  return (
    <Container style={styles.container}>
      <StatusBar backgroundColor={myTheme.main} />

      <Animated.FlatList
        data={passwordsToRender}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderPassword {...item.item} />;
        }}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={item => item.id}
      />

      <Fab
        callBack={() => {
          setVisibility(true);
        }}
      />

      <AddPasswordModal setVisible={setVisibility} visible={visible} />
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
