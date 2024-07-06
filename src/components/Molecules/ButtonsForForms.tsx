import React from 'react';
import {StyleSheet} from 'react-native';
import Button from '../atoms/Button';
import Box from '../atoms/Box';

type TProps = {
  onSave: () => void;
  onCancel: () => void;
};

const ButtonsForForms = (props: TProps) => {
  return (
    <Box style={styles.buttonsBox}>
      <Button label="Cancel" onButtonPress={props.onCancel} />
      <Button label="Save" onButtonPress={props.onSave} />
    </Box>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 15,
    padding: 2,
    borderRadius: 5,
    borderWidth: 0,
  },
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#00000000',
  },
});
export default ButtonsForForms;
