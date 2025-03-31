import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../store/cardStore';
import ModalWrapper from '../ModalWrapper';
import Box from '../atoms/Box';
import Container from '../atoms/Container';
import LightText from '../atoms/LightText';
import ButtonsForForms from '../Molecules/ButtonsForForms';
import {useProfileStore} from '../../store/profileStore';
import {useProfileContext} from '../../context/ProfileContext';
import PressableWithFeedback from '../PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MAX_LENGTH_NAME} from '../../constants';
import {uCFirst, isValidExpiryForCard} from 'commonutil-core';

import MTextInput from '../Molecules/MTextInput';
import {TCardInput} from '../../types';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialCardInput: TCardInput = {
  cardName: {
    value: '',
    error: '',
  },
  cardNumber: {
    value: '',
    error: '',
  },
  CVV: {
    value: '',
    error: '',
  },
  expiry: {
    value: '',
    error: '',
  },
  NameOnCard: {
    value: '',
    error: '',
  },
};

const PlaceholderTextColor = 'grey';

const AddCardModal = (props: Props) => {
  const {addCard} = useCardStore();
  const [cardInputs, setCardInputs] = useState<TCardInput>(initialCardInput);
  const cardNameRef = useRef<TextInput>(null);
  const expiryRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);
  const nameOnCardRef = useRef<TextInput>(null);
  const {selectedProfileForNew} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
    selectedProfileForNew: state.profiles.find(
      p => p.id === state.selectedProfileForAddingANewRecord,
    ),
  }));

  const {openProfileSelection} = useProfileContext()!;

  const handleCardNumber = (text: string) => {
    let t = text;
    const prevTextLastLetter = cardInputs.cardNumber.toString().split('').pop();

    if (text.length === 4 || text.length === 9 || text.length === 14) {
      if (prevTextLastLetter !== '-') {
        t = t + '-';
      }
    }
    if (text.length === 19) {
      expiryRef.current!.focus();
    }
    setCardInputs(prev => ({
      ...prev,
      cardNumber: {...prev.cardNumber, value: t},
    }));
  };

  const clearError = useCallback((field: keyof TCardInput) => {
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

      if (field === 'expiry') {
        if (text.length === 5) {
          console.log({texttoTEst: text});
          const {error, status} = isValidExpiryForCard(text);
          console.log({
            error,
            status,
            text,
          });
          if (!status) {
            setCardInputs(prev => ({
              ...prev,
              [field]: {
                ...prev[field],
                error: error ?? '',
                value: text,
              },
            }));
            return;
          }
          cvvRef.current!.focus();
        }
      }

      if (field === 'CVV') {
        if (text.length === 3) {
          nameOnCardRef.current!.focus();
        }
      }

      setCardInputs(prev => ({...prev, [field]: {...prev[field], value: t}}));
    },
    [clearError],
  );

  const validateInputs = (inputs: TCardInput) => {
    let r = true;
    Object.keys(inputs).forEach(key => {
      if (inputs[key as keyof TCardInput].value.trim().length < 2) {
        r = false;
      }
    });
    return r;
  };

  const moveToNext = () => {
    cardNumberRef.current!.focus();
  };

  const AddACard = () => {
    if (!validateInputs(cardInputs)) return;
    const profileId = selectedProfileForNew?.id ?? '';

    addCard({
      CVV: cardInputs.CVV.value,
      NameOnCard: cardInputs.NameOnCard.value,
      cardName: cardInputs.cardName.value,
      cardNumber: cardInputs.cardNumber.value,
      expiry: cardInputs.expiry.value,
      profileId,
    });
    setCardInputs(initialCardInput);
    props.setVisible(false);
  };

  const anyErrors = useMemo(() => {
    return Object.keys(cardInputs).some(
      k => cardInputs[k as keyof TCardInput].error.trim().length > 0,
    );
  }, [cardInputs]);

  const renderErrors = useCallback(() => {
    return Object.keys(cardInputs).map(key => {
      if (!cardInputs[key as keyof TCardInput].error) return null;
      return (
        <View key={key}>
          <LightText>
            {uCFirst(key)} : {cardInputs[key as keyof TCardInput].error}
          </LightText>
        </View>
      );
    });
  }, [cardInputs]);

  const close = useCallback(() => {
    setCardInputs(initialCardInput);
    props.setVisible(false);
  }, [props]);

  return (
    <ModalWrapper
      width={'90%'}
      onClose={close}
      bg={myTheme.main}
      visible={props.visible}>
      <Container style={styles.cardContainer}>
        {anyErrors && <View style={styles.errorBox}>{renderErrors()}</View>}
        <View style={styles.profileSwitch}>
          <LightText>Card will be saved in : </LightText>
          <PressableWithFeedback
            onPress={() => openProfileSelection({renderForNew: true})}
            style={styles.switch}>
            <LightText>{selectedProfileForNew?.name ?? ''}</LightText>
            <MaterialIcon
              onPress={() => openProfileSelection({renderForNew: true})}
              name="chevron-down"
              color="white"
              size={25}
            />
          </PressableWithFeedback>
        </View>
        <Box style={[styles.cardContent]}>
          <View style={styles.cardNameAndNumber}>
            <MTextInput
              value={cardInputs.cardName.value}
              autoFocus
              maxLength={MAX_LENGTH_NAME}
              ref={cardNameRef}
              onChangeText={t => onChange(t, 'cardName')}
              style={[styles.textInput, styles.title]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Card name"
              returnKeyType="next"
              onSubmitEditing={moveToNext}
              error={cardInputs.cardName.error}
              clearError={() => clearError('cardName')}
            />
            <MTextInput
              ref={cardNumberRef}
              value={cardInputs.cardNumber.value}
              onChangeText={handleCardNumber}
              keyboardType="number-pad"
              maxLength={19}
              style={[styles.textInput, styles.number, styles.cardText]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Number"
              error={cardInputs.cardNumber.error}
              clearError={() => clearError('cardNumber')}
            />
          </View>
          <View style={styles.cardExpiryCvvButtonBox}>
            <View style={styles.expiryAndCvvBox}>
              <LightText style={styles.title}>Valid Thru</LightText>
              <MTextInput
                ref={expiryRef}
                value={cardInputs.expiry.value}
                onChangeText={text => onChange(text, 'expiry')}
                maxLength={5}
                keyboardType="numbers-and-punctuation"
                style={[styles.textInput, styles.cardText]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="MM/YY"
                error={cardInputs.expiry.error}
                clearError={() => clearError('expiry')}
              />
            </View>
            <View style={styles.expiryAndCvvBox}>
              <LightText style={styles.title}>CVV</LightText>
              <MTextInput
                value={cardInputs.CVV.value}
                maxLength={3}
                ref={cvvRef}
                keyboardType="number-pad"
                onChangeText={t => onChange(t, 'CVV')}
                style={[styles.textInput, styles.cardText]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="CVV"
                error={cardInputs.CVV.error}
                clearError={() => clearError('CVV')}
              />
            </View>
          </View>
          <View>
            <MTextInput
              value={cardInputs.NameOnCard.value}
              onChangeText={t => onChange(t, 'NameOnCard')}
              style={[styles.textInput, styles.cardText]}
              maxLength={MAX_LENGTH_NAME}
              ref={nameOnCardRef}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Name on card"
              error={cardInputs.NameOnCard.error}
              clearError={() => clearError('NameOnCard')}
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
    backgroundColor: myTheme.warningBg,
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
    backgroundColor: myTheme.cardBg,
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
    color: myTheme.cardTitleText,
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardNumberText: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardText: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: myTheme.secondary,
  },
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: myTheme.buttonBg,
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
});

export default AddCardModal;
