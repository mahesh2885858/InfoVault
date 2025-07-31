import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../../components/atoms/Typography';
import BackButton from '../../components/Molecules/BackButton';
import { useTheme } from 'react-native-paper';

const SettingsHeader = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <BackButton />
      <Typography
        style={[
          styles.headerText,
          {
            color: theme.colors.onBackground,
          },
        ]}
      >
        Settings
      </Typography>
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
