import React from 'react';
import {Text, TextProps} from 'react-native';
import {myTheme} from '../../../theme';

const LightText = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style, {color: myTheme.secondary}]}>
      {props.children}
    </Text>
  );
};

export default LightText;
