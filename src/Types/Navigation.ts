import type {NativeStackScreenProps} from '@react-navigation/native-stack';
export type RootStackParamList = {
  Home: undefined;
  Cards: undefined;
};
export type CardProps = NativeStackScreenProps<RootStackParamList, 'Cards'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
