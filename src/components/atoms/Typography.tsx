import React from 'react';
import {useTheme} from '@ui-kitten/components';
import {Text, type TextProps} from '@ui-kitten/components';

const Typography = (props: TextProps) => {
  const theme = useTheme();
  return (
    <Text {...props} style={[{color: theme['text-primary']}, props.style]}>
      {props.children}
    </Text>
  );
};

export default Typography;
