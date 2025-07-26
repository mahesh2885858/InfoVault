import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Container = (props: ViewProps) => {
  const theme = useTheme();
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      {...props}
      style={[
        {backgroundColor: theme['bg-main']},
        props.style,
        {
          paddingTop: top,
          paddingBottom: bottom,
        },
      ]}>
      {props.children}
    </View>
  );
};

export default Container;
