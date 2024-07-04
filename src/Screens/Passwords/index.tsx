import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Container from '../../components/atoms/Container';
import {myTheme} from '../../../theme';
import {PasswordProps} from '../../Types/Navigation';
import Fab from '../../components/Fab';

const Passwords = (_props: PasswordProps) => {
  return (
    <Container style={styles.container}>
      <StatusBar backgroundColor={myTheme.main} />
      <Fab callBack={() => {}} />
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Passwords;
