import React from 'react';
import { TextProps } from 'react-native';
import { Text } from 'react-native-paper';

const Typography = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style]}>
      {props.children}
    </Text>
  );
};

export default Typography;
