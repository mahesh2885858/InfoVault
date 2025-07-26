import {View} from 'react-native';
import React from 'react';
import CardHeaderTitleWithBackButton from './CardHeaderTitleWithBackButton';
import CardHeaderRight from './CardHeaderRight';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

const CardHeaders = (_props: DrawerHeaderProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <CardHeaderTitleWithBackButton />
        <CardHeaderRight />
      </View>
    </SafeAreaView>
  );
};
const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'bg-main',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
export default CardHeaders;
