import React from 'react';
import {View} from 'react-native';
import LightText from '../../components/atoms/LightText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {myTheme} from '../../../theme';
import Fab from '../../components/Fab';

const Profiles = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LightText>Profiles</LightText>
      <Fab callBack={() => {}} />
    </SafeAreaView>
  );
};
export default Profiles;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.main,
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
