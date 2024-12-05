import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <MaterialIcon
      onPress={() => navigation.goBack()}
      name="arrow-left-thin"
      size={24}
      color={myTheme.textMain}
    />
  );
};

export default BackButton;
