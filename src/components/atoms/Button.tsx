import React from 'react';
import { StyleSheet } from 'react-native';
import PressableWithFeedback from '../PressableWithFeedback';
import Typography from './Typography';
import { useTheme } from 'react-native-paper';

type TProps = {
  onButtonPress: () => void;
  label: string;
};

const Button = (props: TProps) => {
  const theme = useTheme();
  return (
    <PressableWithFeedback
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={() => props.onButtonPress()}
    >
      <Typography
        style={[
          styles.text,
          {
            color: theme.colors.onPrimary,
          },
        ]}
      >
        {props.label}
      </Typography>
    </PressableWithFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: 'button-primary-bg',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'button-primary-text',
  },
});

export default Button;
