import { useCallback, useMemo } from 'react';
import { useExpenseTrackerStore } from '../store/expenseTrackerStore';
import { TAccount } from '../types';
import useHandleErrors from './useHandleErrors';
import { v4 as uuidv4 } from 'uuid';

const useManageAccounts = () => {
  const addAccount = useExpenseTrackerStore(state => state.addItem);
  const removeAccounts = useExpenseTrackerStore(state => state.removeItems);
  const deselectAllItems = useExpenseTrackerStore(state => state.deselectAll);
  const accounts = useExpenseTrackerStore(state => state.accounts);
  const selectedAccounts = useMemo(
    () => accounts.filter(acc => acc.selected),
    [accounts],
  );
  const { showErrorMessage } = useHandleErrors();

  const addNewAccount = useCallback(
    (props: Pick<TAccount, 'initialBalance' | 'name'>) => {
      try {
        if (!props || !props.name) {
          throw new Error('Name field is required');
        }
        const data: TAccount = {
          id: uuidv4(),
          name: props.name,
          initialBalance: props.initialBalance ?? 0,
          selected: false,
        };
        addAccount({
          type: 'account',
          item: data,
        });
      } catch (error) {
        showErrorMessage(error);
      }
    },
    [addAccount, showErrorMessage],
  );

  const deleteAccount = useCallback(
    (id: string) => {
      try {
        if (!id) {
          throw new Error('Id not provided');
        }
        removeAccounts('account', [id]);
      } catch (error) {
        showErrorMessage(error);
      }
    },
    [showErrorMessage, removeAccounts],
  );

  const deleteSelectedAccounts = useCallback(() => {
    try {
      if (selectedAccounts.length === 0) {
        throw new Error('None selected');
      }
      const ids = selectedAccounts.map(i => i.id);
      removeAccounts('account', ids);
    } catch (error) {
      showErrorMessage(error);
    }
  }, [showErrorMessage, removeAccounts, selectedAccounts]);

  return {
    addNewAccount,
    deleteAccount,
    selectedAccounts,
    deleteSelectedAccounts,
    selectedAccountsCount: selectedAccounts.length,
    deselectAll: () => deselectAllItems('account'),
  };
};

export default useManageAccounts;
