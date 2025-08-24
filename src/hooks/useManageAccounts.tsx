import { useCallback } from 'react';
import { useExpenseTrackerStore } from '../store/expenseTrackerStore';
import { TAccount } from '../types';
import useHandleErrors from './useHandleErrors';
import { v4 as uuidv4 } from 'uuid';

const useManageAccounts = () => {
  const addAccount = useExpenseTrackerStore(state => state.addItem);
  const removeAccount = useExpenseTrackerStore(state => state.removeItem);
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
        removeAccount('account', id);
      } catch (error) {
        showErrorMessage(error);
      }
    },
    [showErrorMessage, removeAccount],
  );

  return {
    addNewAccount,
    deleteAccount,
  };
};

export default useManageAccounts;
