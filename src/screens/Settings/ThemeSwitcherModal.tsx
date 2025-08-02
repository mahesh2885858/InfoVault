import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColorSchemeName, StyleSheet, View } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import ModalWrapper from '../../components/ModalWrapper';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import { useUiStore } from '../../store/UiStore';
import { TCommonModalProps } from '../../types';

const ThemeSwitcherModal = (props: TCommonModalProps) => {
  const { t } = useTranslation();
  const paper = useTheme();

  const theme = useUiStore(state => state.theme);
  const setTheme = useUiStore(state => state.setTheme);

  const switchTheme = (mode: ColorSchemeName) => {
    setTheme(mode);
    props.onClose();
  };

  return (
    <ModalWrapper
      shouldCloseOnBackgroundPress
      onClose={props.onClose}
      visible={props.visible}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: paper.colors.background,
          },
        ]}
      >
        <PressableWithFeedback
          onPress={() => switchTheme('light')}
          style={styles.option}
        >
          <RadioButton.Android
            onPress={() => switchTheme('light')}
            value="mahesh"
            status={theme === 'light' ? 'checked' : 'unchecked'}
          />
          <Typography style={styles.optionText}>{t('common.light')}</Typography>
        </PressableWithFeedback>
        <PressableWithFeedback
          onPress={() => switchTheme('dark')}
          style={styles.option}
        >
          <RadioButton.Android
            onPress={() => switchTheme('dark')}
            value="mahesh"
            status={theme === 'dark' ? 'checked' : 'unchecked'}
          />
          <Typography style={styles.optionText}>{t('common.dark')}</Typography>
        </PressableWithFeedback>
      </View>
    </ModalWrapper>
  );
};

export default ThemeSwitcherModal;
const styles = StyleSheet.create({
  container: {
    width: '75%',
    margin: 'auto',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 5,
  },
  optionText: {
    fontSize: 18,
  },
});
