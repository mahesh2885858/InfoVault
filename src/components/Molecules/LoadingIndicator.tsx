import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {myTheme} from '../../../theme';

const LoadingIndicator = () => {
  return (
    <View>
      <ActivityIndicator animating color={myTheme.textMain} />
    </View>
  );
};

export default LoadingIndicator;
