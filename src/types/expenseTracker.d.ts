export type TAccount = {
  id: string;
  name: string;
  initialBalance?: number;
  selected?: boolean;
};

export type TCategory = {
  id: string;
  name: string;
  selected?: boolean;
};

export type TExpenseIncomeCommon = {
  id: string;
  date: string;
  description?: string;
  amount: number;
  category: string;
  accountId: string;
  selected?: boolean;
};

export type TExpense = {
  type: 'expense';
} & TExpenseIncomeCommon;

export type TIncome = {
  type: 'income';
} & TExpenseIncomeCommon;
