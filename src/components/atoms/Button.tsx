import React from 'react';
import PressableWithFeedback from '../PressableWithFeedback';
import Typography from './Typography';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

type TProps = {
  onButtonPress: () => void;
  label: string;
};

const Button = (props: TProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <PressableWithFeedback
      style={styles.button}
      onPress={() => props.onButtonPress()}>
      <Typography style={styles.text}>{props.label}</Typography>
    </PressableWithFeedback>
  );
};

const themedStyles = StyleService.create({
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
