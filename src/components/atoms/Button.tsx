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
      <LightText>{props.label}</LightText>
    </PressableWithFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: myTheme.buttonBg,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
