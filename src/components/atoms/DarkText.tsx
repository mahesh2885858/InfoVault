import React from 'react';
import {Text, TextProps} from 'react-native';
import {myTheme} from '../../../theme';

const DarkText = (props: TextProps) => {
  return (
    <Text {...props} style={[{color: myTheme.accent}, props.style]}>
      {props.children}
    </Text>
  );
};

export default DarkText;
