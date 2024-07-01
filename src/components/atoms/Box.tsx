import React from 'react';
import {View, ViewProps} from 'react-native';
import {myTheme} from '../../../theme';

const Box = (props: ViewProps) => {
  return (
    <View
      {...props}
      style={[{backgroundColor: myTheme.secondary}, props.style]}>
      {props.children}
    </View>
  );
};

export default Box;
