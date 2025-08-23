import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Container, Typography } from '../../../components/atoms';
import Fab from '../../../components/Fab';
import { useExpenseTrackerStore } from '../../../store/expenseTrackerStore';
import { TAccount } from '../../../types';
import AccountsHeader from './header';
import RenderAccount from './RenderAccount';

const Accounts = () => {
  const accounts = useExpenseTrackerStore(state => state.accounts);
  const { t } = useTranslation();
  const dumyData: TAccount[] = [
    {
      id: '1',
      name: 'Cash',
      initialBalance: 1000,
    },
    {
      id: '2',
      name: 'Bank',
      initialBalance: 5000,
    },
    {
      id: '3',
      name: 'Credit Card',
      initialBalance: 2000,
    },
    {
      id: '4',
      name: 'Wallet',
      initialBalance: 300,
    },
    {
      id: '5',
      name: 'Savings',
      initialBalance: 8000,
    },
    {
      id: '6',
      name: 'Investment',
      initialBalance: 15000,
    },
    {
      id: '7',
      name: 'Emergency Fund',
      initialBalance: 4000,
    },
    {
      id: '8',
      name: 'Travel Fund',
      initialBalance: 1200,
    },
    {
      id: '9',
      name: 'Education Fund',
      initialBalance: 6000,
    },
    {
      id: '10',
      name: 'Health Fund',
      initialBalance: 2500,
    },
  ];
  return (
    <Container style={styles.container}>
      <AccountsHeader />
      {dumyData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Typography style={styles.emptyText}>
            {t('tracker.noAccountsFound')}
          </Typography>
          <Typography style={styles.emptyText}>
            {t('tracker.clickBelowToAddAccount')}
          </Typography>
        </View>
      ) : (
        <View style={[styles.container, styles.accountContainer]}>
          <FlashList
            data={dumyData}
            renderItem={({ item }) => <RenderAccount {...item} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      <Fab callBack={() => {}} />
    </Container>
  );
};

export default Accounts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    padding: 10,
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
