import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const Box = (props: ViewProps) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[{ backgroundColor: theme.colors.secondary }, props.style]}
    >
      {props.children}
    </View>
  );
};

export default Box;
