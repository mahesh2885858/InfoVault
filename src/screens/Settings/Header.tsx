import React from 'react';
import {StyleSheet, View} from 'react-native';
import {myTheme} from '../../../theme';
import Typography from '../../components/atoms/Typography';
import BackButton from '../../components/Molecules/BackButton';

const SettingsHeader = () => {
  return (
    <View style={styles.container}>
      <BackButton />
      <Typography style={styles.headerText}>Settings</Typography>
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: myTheme.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 20,
  },
  headerText: {
    fontSize: 20,
  },
});
