import React from 'react';
import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

const PressableWithFeedback = (
  props: PressableProps & {feedbackColor?: ColorValue; hidden?: boolean},
) => {
  const {children, feedbackColor} = props;
  if (props.hidden) return null;
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? feedbackColor : 'transparent',

          opacity: pressed ? 0.5 : 1,
        },
        props.style as StyleProp<ViewStyle>,
      ]}>
      {children}
    </Pressable>
  );
};

export default PressableWithFeedback;
