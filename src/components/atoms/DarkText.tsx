import React from 'react';
import { Text, TextProps } from 'react-native';

const DarkText = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style]}>
      {props.children}
    </Text>
  );
};

export default DarkText;
