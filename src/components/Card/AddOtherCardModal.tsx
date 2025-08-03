import { uCFirst } from 'commonutil-core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PROFILE_ID, MAX_LENGTH_NAME } from '../../constants';
import { useProfileContext } from '../../context/ProfileContext';
import { useCardStore } from '../../store/cardStore';
import { useProfileStore } from '../../store/profileStore';
import Box from '../atoms/Box';
import Container from '../atoms/Container';
import Typography from '../atoms/Typography';
import ModalWrapper from '../ModalWrapper';
import ButtonsForForms from '../Molecules/ButtonsForForms';
import PressableWithFeedback from '../PressableWithFeedback';

import { TCardOther, TCardOtherInput } from '../../types';
import MTextInput from '../Molecules/MTextInput';

import { Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: 'edit' | 'add';
  editCard?: TCardOther | null;
};

const initialCardInput: TCardOtherInput = {
  cardName: {
    value: '',
    error: '',
  },
  cardNumber: {
    value: '',
    error: '',
  },
  otherDetails: {
    value: '',
    error: '',
  },
};

const errorMessages: Record<keyof TCardOtherInput, string> = {
  cardName: 'It should be more than 3 characters and can not be empty',
  cardNumber: 'It should be more than 3 characters',
  otherDetails: '',
};

const AddOtherCardModal = (props: Props) => {
  const theme = useTheme();
  const PlaceholderTextColor = theme.colors.onSurfaceDisabled;
  const { addCard, setFocusedCard, editCard } = useCardStore();

  const [cardInputs, setCardInputs] = useState<TCardOtherInput>(
    props.mode === 'edit'
      ? {
          cardName: { value: props.editCard?.cardName ?? '', error: '' },
          cardNumber: { value: props.editCard?.cardNumber ?? '', error: '' },
          otherDetails: {
            value: props.editCard?.otherDetails ?? '',
            error: '',
          },
        }
      : initialCardInput,
  );
  const cardNameRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const nameOnCardRef = useRef<TextInput>(null);
  const profiles = useProfileStore(state => state.profiles);
  const selectedProfileForAddingANewRecord = useProfileStore(
    state => state.selectedProfileForAddingANewRecord,
  );

  const selectedProfileForNew = useMemo(() => {
    return profiles.find(p => p.id === selectedProfileForAddingANewRecord);
  }, [profiles, selectedProfileForAddingANewRecord]);

  const { openProfileSelection } = useProfileContext()!;

  const handleCardNumber = (text: string) => {
    clearError('cardNumber');
    setCardInputs(prev => ({
      ...prev,
      cardNumber: { ...prev.cardNumber, value: text },
    }));
  };

  const clearError = useCallback((field: keyof TCardOtherInput) => {
    setCardInputs(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: '',
      },
    }));
  }, []);

  const onChange = useCallback(
    (text: string, field: keyof typeof cardInputs) => {
      let t = text;
      clearError(field);

      setCardInputs(prev => ({
        ...prev,
        [field]: { ...prev[field], value: t },
      }));
    },
    [clearError],
  );

  const validateInputs = (inputs: TCardOtherInput) => {
    let r = true;
    Object.keys(inputs).forEach(key => {
      const field = key as keyof TCardOtherInput;
      if (field === 'otherDetails') return true;

      if (inputs[field].value.trim().length < 2) {
        r = false;
        setCardInputs(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            error: errorMessages[field],
          },
        }));
      }
      if (field === 'cardNumber') {
        r = false;
        if (inputs[field].value.trim().length < 3) {
          setCardInputs(prev => ({
            ...prev,
            cardNumber: {
              ...prev.cardNumber,
              error: errorMessages.cardNumber,
            },
          }));
        } else {
          r = true;
        }
      }
    });
    return r;
  };

  const moveToNext = () => {
    cardNumberRef.current!.focus();
  };

  const AddACard = () => {
    if (!validateInputs(cardInputs)) return;
    const profileId = selectedProfileForNew?.id ?? DEFAULT_PROFILE_ID;
    Keyboard.dismiss();
    let id = uuidv4();
    if (props.mode === 'edit' && props.editCard) {
      console.log({ props, cardInputs });
      id = props.editCard.id;
      if (props.editCard.type === 'other') {
        editCard({
          id,
          cardName: cardInputs.cardName.value,
          cardNumber: cardInputs.cardNumber.value,
          profileId,
          isSelected: false,
          type: 'other',
          otherDetails: cardInputs.otherDetails.value,
        });
      }
    } else {
      addCard({
        id,
        cardName: cardInputs.cardName.value,
        cardNumber: cardInputs.cardNumber.value,
        otherDetails: cardInputs.otherDetails.value,
        profileId,
        type: 'other',
        isSelected: false,
      });
    }

    setFocusedCard(id);
    setCardInputs(initialCardInput);
    props.setVisible(false);
  };

  const anyErrors = useMemo(() => {
    return Object.keys(cardInputs).some(
      k => cardInputs[k as keyof TCardOtherInput].error.trim().length > 0,
    );
  }, [cardInputs]);

  const renderErrors = useCallback(() => {
    return Object.keys(cardInputs).map(key => {
      if (!cardInputs[key as keyof TCardOtherInput].error) return null;
      return (
        <View style={{ marginBottom: 5 }} key={key}>
          <Typography
            style={{
              color: theme.colors.onError,
            }}
          >
            {uCFirst(key)} : {cardInputs[key as keyof TCardOtherInput].error}
          </Typography>
        </View>
      );
    });
  }, [cardInputs, theme]);

  const close = useCallback(() => {
    setCardInputs(initialCardInput);
    props.setVisible(false);
  }, [props]);

  return (
    <ModalWrapper
      width={'90%'}
      onClose={close}
      bg={theme.colors.background}
      visible={props.visible}
      shouldCloseOnBackgroundPress={false}
    >
      <Container
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        {anyErrors && <View style={styles.errorBox}>{renderErrors()}</View>}
        <View style={styles.profileSwitch}>
          <Typography>Card will be saved in : </Typography>
          <PressableWithFeedback
            onPress={() => openProfileSelection({ renderForNew: true })}
            style={[
              styles.switch,
              {
                backgroundColor: theme.colors.inverseSurface,
              },
            ]}
          >
            <Typography
              style={{
                color: theme.colors.inverseOnSurface,
              }}
            >
              {selectedProfileForNew?.name ?? ''}
            </Typography>
            <MaterialIcon
              onPress={() => openProfileSelection({ renderForNew: true })}
              name="chevron-down"
              color={theme.colors.surfaceVariant}
              size={25}
            />
          </PressableWithFeedback>
        </View>
        <Box
          style={[
            styles.cardContent,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <View style={styles.cardNameAndNumber}>
            <MTextInput
              value={cardInputs.cardName.value}
              autoFocus
              maxLength={MAX_LENGTH_NAME}
              ref={cardNameRef}
              onChangeText={t => onChange(t, 'cardName')}
              style={[
                styles.textInput,
                styles.title,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="What kind of card is it?"
              returnKeyType="next"
              onSubmitEditing={moveToNext}
              error={cardInputs.cardName.error}
              clearError={() => clearError('cardName')}
            />
            <MTextInput
              ref={cardNumberRef}
              value={cardInputs.cardNumber.value}
              onChangeText={handleCardNumber}
              style={[
                styles.textInput,
                styles.number,
                styles.cardText,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Number"
              error={cardInputs.cardNumber.error}
              clearError={() => clearError('cardNumber')}
            />
          </View>

          <View>
            <MTextInput
              value={cardInputs.otherDetails.value}
              onChangeText={t => onChange(t, 'otherDetails')}
              style={[
                styles.textInput,
                styles.cardText,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
              ref={nameOnCardRef}
              multiline
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Additional details"
              error={cardInputs.otherDetails.error}
              clearError={() => clearError('otherDetails')}
            />
          </View>
        </Box>
        <ButtonsForForms onCancel={close} onSave={() => AddACard()} />
      </Container>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 5,
    gap: 20,
  },
  errorBox: {
    backgroundColor: 'warning-bg',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  number: {
    width: '70%',
  },
  profileSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textInput: {
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

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
    backgroundColor: 'bg-card',
  },
  cardNameAndNumber: {
    paddingTop: 10,
    gap: 10,
  },
  cardExpiryCvvButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '65%',
  },
  expiryAndCvvBox: {
    flexDirection: 'column',
    gap: 2,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#bf03ab',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'text-primary',
    fontSize: 15,
    fontWeight: '600',
  },
  cardNumberText: {
    fontSize: 15,
    fontWeight: '700',
  },

  cardText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'text-primary',
  },
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'button-primary-bg',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});

export default AddOtherCardModal;
