import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@ui-kitten/components';

const Container = (props: ViewProps) => {
  const theme = useTheme();
  return (
    <View {...props} style={[{backgroundColor: theme['bg-main']}, props.style]}>
      {props.children}
    </View>
  );
};

export default Container;
