import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../../../components/atoms';
import { TAccount } from '../../../types';
import { useTheme } from 'react-native-paper';
import { sizes } from '../../../globals';
import { useTranslation } from 'react-i18next';

const RenderAccount = (prop: TAccount) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surfaceVariant,
        },
      ]}
    >
      <Typography>{prop.name}</Typography>
      <View style={styles.availBalance}>
        <Typography>{t('tracker.availableBalance')}</Typography>
        <Typography>{prop.initialBalance ?? 0}</Typography>
      </View>
    </View>
  );
};

export default RenderAccount;
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: sizes.m,
  },
  availBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
