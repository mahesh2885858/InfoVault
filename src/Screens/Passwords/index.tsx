import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {BackHandler, FlatList, StatusBar, StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import {PasswordProps} from '../../Types/Navigation';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import {usePasswordsStore} from '../../Store/passwordStore';
import RenderPassword from './RenderPassword';
import AddPasswordModal from './AddPasswordModal';

const Passwords = (_props: PasswordProps) => {
  const [visible, setVisibility] = useState(false);
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  const passwords = usePasswordsStore(state => state.passwords);
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

      <FlatList
        data={passwords}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderPassword {...item.item} />;
        }}
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
