import React from 'react';
import { Text } from 'react-native-paper';

const Typography = (props: any) => {
  return (
    <Text {...props} style={[props.style]}>
      {props.children}
    </Text>
  );
};

export default Typography;
