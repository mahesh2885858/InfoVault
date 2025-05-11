import React from 'react';
import {View} from 'react-native';
import Typography from '../../components/atoms/Typography';
import BackButton from '../../components/Molecules/BackButton';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

const SettingsHeader = () => {
  const styles = useStyleSheet(themedstyles);
  return (
    <View style={styles.container}>
      <BackButton />
      <Typography style={styles.headerText}>Settings</Typography>
    </View>
  );
};

export default SettingsHeader;

const themedstyles = StyleService.create({
  container: {
    backgroundColor: 'bg-main',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
