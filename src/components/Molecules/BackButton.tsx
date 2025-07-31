import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
type TProps = {
  onPress?: () => void;
};
const BackButton = (props: TProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <MaterialIcon
      onPress={() =>
        props.onPress
          ? props.onPress()
          : navigation.canGoBack() && navigation.goBack()
      }
      name="arrow-left-thin"
      size={24}
      color={theme.colors.onBackground}
    />
  );
};

export default BackButton;
