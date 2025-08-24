import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Typography } from '../../../components/atoms';
import PressableWithFeedback from '../../../components/PressableWithFeedback';
import { sizes } from '../../../globals';
import { useExpenseTrackerStore } from '../../../store/expenseTrackerStore';
import { TAccount } from '../../../types';

const RenderAccount = (prop: TAccount) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const selectAccount = useExpenseTrackerStore(state => state.selectItem);
  const deselectAccount = useExpenseTrackerStore(state => state.deselectItem);
  const getSelectedItemsCount = useExpenseTrackerStore(
    state => state.getSelectedItemsCount,
  );

  const toggleSelection = useCallback(() => {
    if (getSelectedItemsCount('account') === 0) return;
    if (prop.selected) {
      deselectAccount('account', prop.id);
    } else {
      selectAccount('account', prop.id);
    }
  }, [deselectAccount, selectAccount, prop, getSelectedItemsCount]);

  const onLongPress = useCallback(() => {
    if (getSelectedItemsCount('account') > 0) return;
    if (prop.selected) {
      deselectAccount('account', prop.id);
    } else {
      selectAccount('account', prop.id);
    }
  }, [deselectAccount, selectAccount, prop, getSelectedItemsCount]);

  if (!prop.id) return null;
  return (
    <PressableWithFeedback
      onPress={toggleSelection}
      onLongPress={onLongPress}
      style={[
        styles.card,
        {
          backgroundColor: prop.selected
            ? theme.colors.surfaceDisabled
            : theme.colors.surfaceVariant,
        },
      ]}
    >
      <Typography>{prop.name}</Typography>
      <View style={styles.availBalance}>
        <Typography>{t('tracker.availableBalance')}</Typography>
        <Typography>{prop.initialBalance ?? 0}</Typography>
      </View>
    </PressableWithFeedback>
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
