import React from 'react';
import {Text, TextProps} from 'react-native';
import {myTheme} from '../../../theme';

const LightText = (props: TextProps) => {
  return (
    <Text {...props} style={[{color: myTheme.secondary}, props.style]}>
      {props.children}
    </Text>
  );
};

export default LightText;
