import React, { useCallback, useEffect } from 'react';
import { TextInput, TextInputProps, Vibration } from 'react-native';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';

type TProps = TextInputProps & {
  error?: string;
  ref: any;
  clearError: () => void;
};

const MTextInput = (props: TProps) => {
  const { error, ...restProps } = props;
  const offset = useSharedValue<number>(0);
  const borderWidth = useSharedValue(0);
  const theme = useTheme();
  const stylesX = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    borderWidth: borderWidth.value,
    borderColor: theme['warning-bg'],
  }));

  const checkAndWarn = useCallback(() => {
    Vibration.vibrate();
    offset.value = withRepeat(
      withTiming(10, {
        duration: 50,
      }),
      7,
      true,
      () => {
        offset.value = 0;
      },
    );

    borderWidth.value = withTiming(
      1,
      {
        duration: 1000,
        reduceMotion: ReduceMotion.Never,
      },
      () => {
        borderWidth.value = 0;
      },
    );
  }, [offset, borderWidth]);

  useEffect(() => {
    if (error) {
      checkAndWarn();
    }
  }, [error, checkAndWarn]);

  return (
    <>
      <Animated.View style={[stylesX, styles.textBox]}>
        <TextInput {...restProps} />
      </Animated.View>
    </>
  );
};

export default MTextInput;

const styles = StyleSheet.create({
  textBox: {
    borderRadius: 5,
  },
});
