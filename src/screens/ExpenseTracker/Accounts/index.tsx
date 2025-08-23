import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Typography } from '../../../components/atoms';
import Fab from '../../../components/Fab';
import AccountsHeader from './header';
import { useExpenseTrackerStore } from '../../../store/expenseTrackerStore';
import { useTranslation } from 'react-i18next';

const Accounts = () => {
  const accounts = useExpenseTrackerStore(state => state.accounts);
  const { t } = useTranslation();
  return (
    <Container style={styles.container}>
      <AccountsHeader />
      {accounts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Typography style={styles.emptyText}>
            {t('tracker.noAccountsFound')}
          </Typography>
          <Typography style={styles.emptyText}>
            {t('tracker.clickBelowToAddAccount')}
          </Typography>
        </View>
      ) : null}
      <Fab callBack={() => {}} />
    </Container>
  );
};

export default Accounts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
