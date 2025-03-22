import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../store/cardStore';
import {TCard} from '../../types/card';
import ModalWrapper from '../ModalWrapper';
import Box from '../atoms/Box';
import Container from '../atoms/Container';
import LightText from '../atoms/LightText';
import ButtonsForForms from '../Molecules/ButtonsForForms';
import {useProfileStore} from '../../store/profileStore';
import {useProfileContext} from '../../context/ProfileContext';
import PressableWithFeedback from '../PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DEFAULT_PROFILE_ID, MAX_LENGTH_NAME} from '../../constants';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type TCardInput = Omit<TCard, 'isSelected'>;

const initState: TCardInput = {
  cardName: '',
  cardNumber: '',
  CVV: '',
  expiry: '',
  NameOnCard: '',
  profileId: DEFAULT_PROFILE_ID,
};

const PlaceholderTextColor = 'grey';

const AddCardModal = (props: Props) => {
  const {addCard} = useCardStore();
  const [cardInputs, setCardInputs] = useState<TCardInput>(initState);
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
    setCardInputs(prev => ({...prev, cardNumber: t}));
  };

  const onChange = useCallback(
    (text: string, field: keyof typeof cardInputs) => {
      let t = text;
      if (field === 'expiry') {
        if (text.length === 2 && cardInputs.expiry.split('').pop() !== '/') {
          t = t + '/';
        }
        if (text.length === 5) {
          cvvRef.current!.focus();
        }
      }

      if (field === 'CVV') {
        if (text.length === 3) {
          nameOnCardRef.current!.focus();
        }
      }

      if (field === 'cardName' || field === 'NameOnCard') {
        if (text.trim().length > MAX_LENGTH_NAME) return;
      }

      setCardInputs(prev => ({...prev, [field]: t}));
    },
    [cardInputs],
  );

  const validateInputs = (inputs: TCardInput) => {
    let r = true;
    Object.keys(inputs).forEach(key => {
      // @ts-expect-error: need to find later
      if (inputs[key].trim().length < 2) {
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
    cardInputs.profileId = selectedProfileForNew?.id ?? '';
    addCard(cardInputs);
    setCardInputs(initState);
    props.setVisible(false);
  };

  const close = useCallback(() => {
    setCardInputs(initState);
    props.setVisible(false);
  }, [props]);

  return (
    <ModalWrapper width={'90%'} onClose={close} visible={props.visible}>
      <Container style={styles.cardContainer}>
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
            <TextInput
              value={cardInputs.cardName}
              autoFocus
              ref={cardNameRef}
              onChangeText={t => onChange(t, 'cardName')}
              style={[styles.textInput, styles.title]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Card name"
              returnKeyType="next"
              onSubmitEditing={moveToNext}
            />
            <TextInput
              ref={cardNumberRef}
              value={cardInputs.cardNumber.toString()}
              onChangeText={handleCardNumber}
              keyboardType="number-pad"
              maxLength={19}
              style={[styles.textInput, styles.number, styles.cardText]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Number"
            />
          </View>
          <View style={styles.cardExpiryCvvButtonBox}>
            <View style={styles.expiryAndCvvBox}>
              <LightText style={styles.title}>Valid Thru</LightText>
              <TextInput
                ref={expiryRef}
                value={cardInputs.expiry}
                onChangeText={text => onChange(text, 'expiry')}
                maxLength={5}
                keyboardType="number-pad"
                style={[styles.textInput, styles.cardText]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="Exp"
              />
            </View>
            <View style={styles.expiryAndCvvBox}>
              <LightText style={styles.title}>CVV</LightText>
              <TextInput
                value={cardInputs.CVV.toString()}
                maxLength={3}
                ref={cvvRef}
                keyboardType="number-pad"
                onChangeText={t => onChange(t, 'CVV')}
                style={[styles.textInput, styles.cardText]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="CVV"
              />
            </View>
          </View>
          <View>
            <TextInput
              value={cardInputs.NameOnCard}
              onChangeText={t => onChange(t, 'NameOnCard')}
              style={[styles.textInput, styles.cardText]}
              ref={nameOnCardRef}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Name on card"
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
  number: {
    width: '70%',
  },
  profileSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textInput: {
    fontSize: 15,
    padding: 2,
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
    gap: 2,
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
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardNumberText: {
    fontSize: 17,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardText: {
    fontSize: 17,
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
