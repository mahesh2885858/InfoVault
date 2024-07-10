import React from 'react';
import PasswordHeaderTitleWithBackButton from './PasswordHeaderTitleWithBackButton';
import PasswordHeaderRight from './PasswordHeaderRight';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import {myTheme} from '../../../theme';

const PasswordHeader = (_props: DrawerHeaderProps) => {
  return (
    <View style={styles.container}>
      <PasswordHeaderTitleWithBackButton />
      <PasswordHeaderRight />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: myTheme.main,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
export default PasswordHeader;
