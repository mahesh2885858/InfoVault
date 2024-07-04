import type {NativeStackScreenProps} from '@react-navigation/native-stack';
export type RootStackParamList = {
  Home: undefined;
  Cards: undefined;
  Passwords: undefined;
};
export type CardProps = NativeStackScreenProps<RootStackParamList, 'Cards'>;
export type PasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'Passwords'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
