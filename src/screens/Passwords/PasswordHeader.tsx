import React from 'react';
import PasswordHeaderTitleWithBackButton from './PasswordHeaderTitleWithBackButton';
import PasswordHeaderRight from './PasswordHeaderRight';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {useTheme} from '@ui-kitten/components';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

const PasswordHeader = (_props: DrawerHeaderProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme['bg-main'],
        },
      ]}>
      <PasswordHeaderTitleWithBackButton />
      <PasswordHeaderRight />
    </View>
  );
};
export default PasswordHeader;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'bg-main',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
