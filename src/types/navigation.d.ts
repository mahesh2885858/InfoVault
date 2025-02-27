export type DrawerParamsList = {
  Cards: undefined;
  Passwords: undefined;
  Profiles: undefined;
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
