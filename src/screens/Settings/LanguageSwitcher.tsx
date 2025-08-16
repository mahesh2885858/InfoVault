import { changeLanguage } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import ModalWrapper from '../../components/ModalWrapper';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import { LANGUAGES } from '../../constants';
import { useUiStore } from '../../store/UiStore';
import { TCommonModalProps } from '../../types';

const LanguageSwitcher = (props: TCommonModalProps) => {
  const paper = useTheme();

  const selectLanguage = useUiStore(state => state.selectLanguage);
  const language = useUiStore(state => state.selectedLanguage);

  const switchLanguage = (lan: string) => {
    selectLanguage(lan);
    changeLanguage(LANGUAGES[lan].code ?? 'en');
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
        {Object.keys(LANGUAGES).map(lan => (
          <PressableWithFeedback
            key={lan}
            onPress={() => switchLanguage(lan)}
            style={styles.option}
          >
            <RadioButton.Android
              onPress={() => switchLanguage(lan)}
              value={lan}
              status={language === lan ? 'checked' : 'unchecked'}
            />
            <Typography style={styles.optionText}>
              {LANGUAGES[lan]?.localizedName}
            </Typography>
          </PressableWithFeedback>
        ))}
      </View>
    </ModalWrapper>
  );
};

export default LanguageSwitcher;
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
