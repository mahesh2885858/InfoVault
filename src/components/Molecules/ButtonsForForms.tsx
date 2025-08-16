import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../atoms/Button';
import Box from '../atoms/Box';
import { useTranslation } from 'react-i18next';

type TProps = {
  onSave: () => void;
  onCancel: () => void;
};

const ButtonsForForms = (props: TProps) => {
  const { t } = useTranslation();
  return (
    <Box style={styles.buttonsBox}>
      <Button label={t('common.cancel')} onButtonPress={props.onCancel} />
      <Button label={t('common.save')} onButtonPress={props.onSave} />
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
