import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../globals';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';
import CardHeaderRight from './CardHeaderRight';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {myTheme} from '../../../theme';

const CardHeaders = (props: DrawerHeaderProps) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <CardHeaderTitleWithBackButton />
      <CardHeaderRight />
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
export default CardHeaders;
