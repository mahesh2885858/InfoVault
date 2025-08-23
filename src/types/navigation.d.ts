import { NavigationProp } from '@react-navigation/native';

export type ExpenseTrackerStackParamList = {
  Accounts: undefined;
};

export type DrawerParamsList = {
  Cards: undefined;
  Passwords: undefined;
  Profiles: undefined;
  'Expense Tracker': NavigationProp<ExpenseTrackerStackParamList>;
};

export type RootStackParamList = {
  Drawer: DrawerParamsList;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
