import { getDigits, uCFirst } from 'commonutil-core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Box, Container, Typography } from '../../../components/atoms';
import ModalWrapper from '../../../components/ModalWrapper';
import ButtonsForForms from '../../../components/Molecules/ButtonsForForms';
import MTextInput from '../../../components/Molecules/MTextInput';
import useHandleErrors from '../../../hooks/useHandleErrors';
import useManageAccounts from '../../../hooks/useManageAccounts';
import { TAccountInput } from '../../../types';
type TProps = {
  visible: boolean;
  onClose: () => void;
};
const AddAccountModal = (props: TProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const PlaceholderTextColor = theme.colors.onSurfaceDisabled;
  const accountNameRef = useRef<TextInput>(null);
  const initialBalanceRef = useRef<TextInput>(null);
  const { addNewAccount } = useManageAccounts();
  const { showErrorMessage } = useHandleErrors();
  const [inputs, setInputs] = useState<TAccountInput>({
    name: {
      value: '',
      error: '',
    },
    initialBalance: {
      value: '',
      error: '',
    },
  });

  const clearError = useCallback((field: keyof TAccountInput) => {
    setInputs(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: '',
      },
    }));
  }, []);

  const onInputChange = useCallback(
    (field: keyof TAccountInput, value: string) => {
      setInputs(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          value,
        },
      }));
      clearError(field);
    },
    [clearError],
  );

  const moveToBalance = useCallback(() => {
    initialBalanceRef?.current?.focus();
  }, []);

  const onSave = useCallback(() => {
    try {
      console.log({ inputs });
      if (!inputs.name || inputs.name.value.trim().length < 3) {
        setInputs(prev => ({
          ...prev,
          name: {
            ...prev.name,
            error: t('tracker.accountNameRequired'),
          },
        }));
        return;
      }
      //parse initial balance
      const digits = getDigits(inputs.initialBalance.value || '0');
      addNewAccount({
        name: inputs.name.value,
        initialBalance: parseInt(digits, 10),
      });
      props.onClose();
    } catch (error) {
      console.log({ error });
      showErrorMessage(error);
    }
  }, [addNewAccount, showErrorMessage, inputs, props, t]);

  const anyErrors = useMemo(() => {
    return Object.keys(inputs).some(
      k => inputs[k as keyof TAccountInput].error.trim().length > 0,
    );
  }, [inputs]);

  const renderErrors = useCallback(() => {
    return Object.keys(inputs).map(key => {
      if (!inputs[key as keyof TAccountInput].error) return null;
      return (
        <View style={[styles.errorItem]} key={key}>
          <Typography
            style={{
              color: theme.colors.onError,
            }}
          >
            {uCFirst(key)}: {inputs[key as keyof TAccountInput].error}
          </Typography>
        </View>
      );
    });
  }, [inputs, theme]);

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
        {anyErrors && (
          <View
            style={[
              styles.errorBox,
              {
                backgroundColor: theme.colors.error,
              },
            ]}
          >
            {renderErrors()}
          </View>
        )}
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
            ref={accountNameRef}
            onChangeText={text => onInputChange('name', text)}
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
            onSubmitEditing={moveToBalance}
            error={inputs.name.error}
            clearError={() => clearError('name')}
            value={inputs.name.value}
          />
          <MTextInput
            keyboardType="numeric"
            clearError={() => clearError('initialBalance')}
            ref={accountNameRef}
            onChangeText={text => onInputChange('initialBalance', text)}
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
            error={inputs.initialBalance.error}
          />
        </Box>
        <ButtonsForForms onCancel={props.onClose} onSave={onSave} />
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
  errorBox: {
    backgroundColor: 'warning-bg',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  errorItem: {
    marginBottom: 5,
  },
});
