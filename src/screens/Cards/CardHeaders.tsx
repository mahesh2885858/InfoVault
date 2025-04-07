import {View} from 'react-native';
import React from 'react';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';
import CardHeaderRight from './CardHeaderRight';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const CardHeaders = (_props: DrawerHeaderProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container]}>
      <CardHeaderTitleWithBackButton />
      <CardHeaderRight />
    </View>
  );
};
const themedStyles = StyleService.create({
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
export default CardHeaders;
