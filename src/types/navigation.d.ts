export type DrawerParamsList = {
  Cards: undefined;
  Passwords: undefined;
  Chat: undefined;
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
