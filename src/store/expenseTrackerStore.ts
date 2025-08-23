import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TAccount, TCategory, TExpense, TIncome } from '../types';
import { DEFAULT_CATEGORY_ID, DEFAULT_CATEGORY_NAME } from '../constants';

type TAddItemParams =
  | {
      type: 'account';
      item: TAccount;
    }
  | {
      type: 'category';
      item: TCategory;
    }
  | {
      type: 'expense';
      item: TExpense;
    }
  | {
      type: 'income';
      item: TIncome;
    };

type TExpenseTrackerStore = {
  accounts: TAccount[];
  categories: TCategory[];
  expenses: TExpense[];
  incomes: TIncome[];
  addItem: (params: TAddItemParams) => void;
  removeItem: (
    type: 'account' | 'category' | 'expense' | 'income',
    itemId: string,
  ) => void;
  updateItem: (params: TAddItemParams) => void;
  selectItem: (
    type: 'account' | 'category' | 'expense' | 'income',
    itemId: string,
  ) => void;
  deselectItem: (
    type: 'account' | 'category' | 'expense' | 'income',
    itemId: string,
  ) => void;
  deselectAll: (type: 'account' | 'category' | 'expense' | 'income') => void;
};
const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  name: DEFAULT_CATEGORY_NAME,
};
export const useExpenseTrackerStore = create(
  persist<TExpenseTrackerStore>(
    set => {
      return {
        accounts: [],
        categories: [DEFAULT_CATEGORY],
        expenses: [],
        incomes: [],
        addItem: ({ type, item }) => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: [...state.accounts, item],
              }));
              break;
            case 'category':
              set(state => ({
                categories: [...state.categories, item],
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: [...state.expenses, item],
              }));
              break;
            case 'income':
              set(state => ({
                incomes: [...state.incomes, item],
              }));
              break;
            default:
              console.warn('Invalid type for addItem');
          }
        },
        removeItem: (type, itemId) => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: state.accounts.filter(acc => acc.id !== itemId),
              }));
              break;
            case 'category':
              set(state => ({
                categories: state.categories.filter(cat => cat.id !== itemId),
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: state.expenses.filter(exp => exp.id !== itemId),
              }));
              break;
            case 'income':
              set(state => ({
                incomes: state.incomes.filter(inc => inc.id !== itemId),
              }));
              break;
            default:
              console.warn('Invalid type for removeItem');
          }
        },
        updateItem: ({ type, item }) => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: state.accounts.map(acc =>
                  acc.id === item.id ? item : acc,
                ),
              }));
              break;
            case 'category':
              set(state => ({
                categories: state.categories.map(cat =>
                  cat.id === item.id ? item : cat,
                ),
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: state.expenses.map(exp =>
                  exp.id === item.id ? item : exp,
                ),
              }));
              break;
            case 'income':
              set(state => ({
                incomes: state.incomes.map(inc =>
                  inc.id === item.id ? item : inc,
                ),
              }));
              break;
            default:
              console.warn('Invalid type for updateItem');
          }
        },
        selectItem: (type, itemId) => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: state.accounts.map(acc => ({
                  ...acc,
                  selected: acc.id === itemId ? !acc.selected : acc.selected,
                })),
              }));
              break;
            case 'category':
              set(state => ({
                categories: state.categories.map(cat => ({
                  ...cat,
                  selected: cat.id === itemId ? !cat.selected : cat.selected,
                })),
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: state.expenses.map(exp => ({
                  ...exp,
                  selected: exp.id === itemId ? !exp.selected : exp.selected,
                })),
              }));
              break;
            case 'income':
              set(state => ({
                incomes: state.incomes.map(inc => ({
                  ...inc,
                  selected: inc.id === itemId ? !inc.selected : inc.selected,
                })),
              }));
              break;
            default:
              console.warn('Invalid type for selectItem');
          }
        },
        deselectItem: (type, itemId) => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: state.accounts.map(acc => ({
                  ...acc,
                  selected: acc.id === itemId ? false : acc.selected,
                })),
              }));
              break;
            case 'category':
              set(state => ({
                categories: state.categories.map(cat => ({
                  ...cat,
                  selected: cat.id === itemId ? false : cat.selected,
                })),
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: state.expenses.map(exp => ({
                  ...exp,
                  selected: exp.id === itemId ? false : exp.selected,
                })),
              }));
              break;
            case 'income':
              set(state => ({
                incomes: state.incomes.map(inc => ({
                  ...inc,
                  selected: inc.id === itemId ? false : inc.selected,
                })),
              }));
              break;
            default:
              console.warn('Invalid type for deselectItem');
          }
        },
        deselectAll: (type: 'account' | 'category' | 'expense' | 'income') => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: state.accounts.map(acc => ({
                  ...acc,
                  selected: false,
                })),
              }));
              break;
            case 'category':
              set(state => ({
                categories: state.categories.map(cat => ({
                  ...cat,
                  selected: false,
                })),
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: state.expenses.map(exp => ({
                  ...exp,
                  selected: false,
                })),
              }));
              break;
            case 'income':
              set(state => ({
                incomes: state.incomes.map(inc => ({
                  ...inc,
                  selected: false,
                })),
              }));
              break;
            default:
              console.warn('Invalid type for deselectAll');
          }
        },
      };
    },
    {
      name: 'expenseTrackerStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
