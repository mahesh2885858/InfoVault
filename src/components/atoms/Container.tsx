import React from 'react';
import {View, ViewProps} from 'react-native';
import {myTheme} from '../../../theme';

const Container = (props: ViewProps) => {
  return (
    <View {...props} style={[{backgroundColor: myTheme.main}, props.style]}>
      {props.children}
    </View>
  );
};

export default Container;
