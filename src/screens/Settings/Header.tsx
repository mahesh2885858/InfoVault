import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../../components/atoms/Typography';
import BackButton from '../../components/Molecules/BackButton';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const SettingsHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation();
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
        {t('settings.title')}
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
    paddingTop: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
