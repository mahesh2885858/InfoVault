import React, { useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Box, Container } from '../../../components/atoms';
import ModalWrapper from '../../../components/ModalWrapper';
import MTextInput from '../../../components/Molecules/MTextInput';
import { useTranslation } from 'react-i18next';
import ButtonsForForms from '../../../components/Molecules/ButtonsForForms';
type TProps = {
  visible: boolean;
  onClose: () => void;
};
const AddAccountModal = (props: TProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const PlaceholderTextColor = theme.colors.onSurfaceDisabled;
  const accountNameRef = useRef<TextInput>(null);

  return (
    <ModalWrapper
      onClose={props.onClose}
      visible={props.visible}
      width={'90%'}
      bg={theme.colors.background}
    >
      <Container
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Box
          style={[
            styles.cardContent,

            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <MTextInput
            autoFocus
            clearError={() => {}}
            ref={accountNameRef}
            //   onChangeText={t => onChange(t, 'cardName')}
            style={[
              styles.textInput,
              styles.title,
              {
                color: theme.colors.onSurfaceVariant,
              },
            ]}
            placeholderTextColor={PlaceholderTextColor}
            placeholder={t('tracker.accountName')}
            returnKeyType="next"
            //   onSubmitEditing={moveToNext}
            //   error={cardInputs.cardName.error}
            //   clearError={() => clearError('cardName')}
          />
          <MTextInput
            // autoFocus
            keyboardType="numeric"
            clearError={() => {}}
            ref={accountNameRef}
            //   onChangeText={t => onChange(t, 'cardName')}
            style={[
              styles.textInput,
              styles.title,
              {
                color: theme.colors.onSurfaceVariant,
              },
            ]}
            placeholderTextColor={PlaceholderTextColor}
            placeholder={t('tracker.initialBalance')}
            returnKeyType="next"
            //   onSubmitEditing={moveToNext}
            //   error={cardInputs.cardName.error}
            //   clearError={() => clearError('cardName')}
          />
        </Box>
        <ButtonsForForms onCancel={props.onClose} onSave={() => {}} />
      </Container>
    </ModalWrapper>
  );
};

export default AddAccountModal;
const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 20,
  },
  cardContent: {
    width: '87%',
    borderRadius: 10,
    padding: 15,
    gap: 20,
    flexDirection: 'column',
  },
  title: {
    color: 'text-primary',
    fontSize: 15,
    fontWeight: '600',
  },
  textInput: {
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
});
