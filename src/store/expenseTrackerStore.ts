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

type TItemType = 'account' | 'category' | 'expense' | 'income';

type TExpenseTrackerStore = {
  accounts: TAccount[];
  categories: TCategory[];
  expenses: TExpense[];
  incomes: TIncome[];
  addItem: (params: TAddItemParams) => void;
  removeItems: (type: TItemType, itemIds: string[]) => void;
  updateItem: (params: TAddItemParams) => void;
  selectItem: (type: TItemType, itemId: string) => void;
  deselectItem: (type: TItemType, itemId: string) => void;
  deselectAll: (type: TItemType) => void;
  getSelectedItemsCount: (type: TItemType) => number;
};
const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  name: DEFAULT_CATEGORY_NAME,
};
export const useExpenseTrackerStore = create(
  persist<TExpenseTrackerStore>(
    (set, get) => {
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
        removeItems: (type, itemIds) => {
          switch (type) {
            case 'account':
              set(state => ({
                accounts: state.accounts.filter(
                  acc => !itemIds.includes(acc.id),
                ),
              }));
              break;
            case 'category':
              set(state => ({
                categories: state.categories.filter(
                  cat => !itemIds.includes(cat.id),
                ),
              }));
              break;
            case 'expense':
              set(state => ({
                expenses: state.expenses.filter(
                  exp => !itemIds.includes(exp.id),
                ),
              }));
              break;
            case 'income':
              set(state => ({
                incomes: state.incomes.filter(inc => !itemIds.includes(inc.id)),
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
        deselectAll: type => {
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
        getSelectedItemsCount: type => {
          switch (type) {
            case 'account':
              return get().accounts.filter(acc => acc.selected).length;
            case 'category':
              return get().categories.filter(cat => cat.selected).length;
            case 'expense':
              return get().expenses.filter(exp => exp.selected).length;
            case 'income':
              return get().incomes.filter(inc => inc.selected).length;
            default:
              break;
          }
          return 0;
        },
      };
    },
    {
      name: 'expenseTrackerStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
