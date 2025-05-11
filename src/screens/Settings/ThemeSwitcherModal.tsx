import React from 'react';
import ModalWrapper from '../../components/ModalWrapper';
import Typography from '../../components/atoms/Typography';
import {TCommonModalProps} from '../../types';
import {RadioButton} from 'react-native-paper';
import {View} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {useTranslation} from 'react-i18next';
import {useUiStore} from '../../store/UiStore';
import {ColorSchemeName} from 'react-native';

const ThemeSwitcherModal = (props: TCommonModalProps) => {
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation();

  const {setTheme, theme} = useUiStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));

  const siwtchTheme = (mode: ColorSchemeName) => {
    setTheme(mode);
    props.onClose();
  };

  return (
    <ModalWrapper onClose={props.onClose} visible={props.visible}>
      <View style={styles.container}>
        <PressableWithFeedback
          onPress={() => siwtchTheme('light')}
          style={styles.option}>
          <RadioButton.Android
            onPress={() => siwtchTheme('light')}
            value="mahesh"
            status={theme === 'light' ? 'checked' : 'unchecked'}
          />
          <Typography style={styles.optionText}>{t('common.light')}</Typography>
        </PressableWithFeedback>
        <PressableWithFeedback
          onPress={() => siwtchTheme('dark')}
          style={styles.option}>
          <RadioButton.Android
            onPress={() => siwtchTheme('dark')}
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
const themedStyles = StyleService.create({
  container: {
    width: '75%',
    backgroundColor: 'bg-main',
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
