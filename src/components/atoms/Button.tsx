import React from 'react';
import {StyleSheet} from 'react-native';
import PressableWithFeedback from '../PressableWithFeedback';
import LightText from './LightText';
import {myTheme} from '../../../theme';

type TProps = {
  onButtonPress: () => void;
  label: string;
};

const Button = (props: TProps) => {
  return (
    <PressableWithFeedback
      style={styles.button}
      onPress={() => props.onButtonPress()}>
      <LightText style={styles.text}>{props.label}</LightText>
    </PressableWithFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: myTheme.buttonBg,
    // width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default Button;
