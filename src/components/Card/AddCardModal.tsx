import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../Store/cardStore';
import {TCard} from '../../Types/Card.types';
import ModalWrapper from '../ModalWrapper';
import PressableWithFeedback from '../PressableWithFeedback';
import Box from '../atoms/Box';
import Container from '../atoms/Container';
import DarkText from '../atoms/DarkText';

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

  const handleCardNumber = (text: string) => {
    let t = text;
    const prevTextLastLetter = cardInputs.cardNumber.toString().split('').pop();

    if (text.length === 4 || text.length === 9 || text.length === 14) {
      if (prevTextLastLetter !== '-') {
        t = t + '-';
      }
    }
    if (text.length === 19) {
      cvvRef.current!.focus();
    }
    setCardInputs(prev => ({...prev, cardNumber: t}));
  };

  const onChange = (text: string, field: keyof typeof cardInputs) => {
    let t = text;
    if (field === 'expiry') {
      if (text.length === 2 && cardInputs.expiry.split('').pop() !== '/') {
        t = t + '/';
      }
      console.log('text', text);
      if (text.length === 5) {
        console.log('text', text);
        cardNumberRef.current!.focus();
      }
    }

    if (field === 'CVV') {
      if (text.length === 3) {
        nameOnCardRef.current!.focus();
      }
    }

    setCardInputs(prev => ({...prev, [field]: t}));
  };

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
    expiryRef.current!.focus();
  };

  const AddACard = () => {
    if (!validateInputs(cardInputs)) return;
    addCard(cardInputs);
    setCardInputs(initState);
    props.setVisible(false);
  };
  return (
    <ModalWrapper
      width={'90%'}
      setVisibility={props.setVisible}
      visible={props.visible}>
      <Container style={styles.content}>
        <View style={styles.box1}>
          <View style={styles.nameAndExpiryBox}>
            <TextInput
              value={cardInputs.cardName}
              autoFocus
              ref={cardNameRef}
              onChangeText={t => onChange(t, 'cardName')}
              style={[styles.nameBox, styles.textInput]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Card name"
              returnKeyType="next"
              onSubmitEditing={moveToNext}
            />
            <TextInput
              ref={expiryRef}
              value={cardInputs.expiry}
              onChangeText={text => onChange(text, 'expiry')}
              maxLength={5}
              keyboardType="number-pad"
              style={[styles.expiryBox, styles.textInput]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Exp"
            />
          </View>
          <View style={styles.numbAndCvvBox}>
            <TextInput
              ref={cardNumberRef}
              value={cardInputs.cardNumber.toString()}
              onChangeText={handleCardNumber}
              keyboardType="number-pad"
              maxLength={19}
              style={[styles.textInput, styles.number]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Number"
            />
            <TextInput
              value={cardInputs.CVV.toString()}
              maxLength={3}
              ref={cvvRef}
              keyboardType="number-pad"
              onChangeText={t => onChange(t, 'CVV')}
              style={[styles.textInput, styles.cvv]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="CVV"
            />
          </View>
          <View>
            <TextInput
              value={cardInputs.NameOnCard}
              onChangeText={t => onChange(t, 'NameOnCard')}
              style={[styles.textInput]}
              ref={nameOnCardRef}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Name on card"
            />
          </View>
        </View>
        <Container style={styles.buttonsBox}>
          <PressableWithFeedback
            onPress={() => {
              setCardInputs(initState);
              props.setVisible(false);
            }}>
            <Box style={styles.button}>
              <DarkText style={styles.buttonText}>Close</DarkText>
            </Box>
          </PressableWithFeedback>
          <PressableWithFeedback onPress={() => AddACard()}>
            <Box style={styles.button}>
              <DarkText style={styles.buttonText}>Save</DarkText>
            </Box>
          </PressableWithFeedback>
        </Container>
      </Container>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  nameAndExpiryBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  content: {
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 5,
    gap: 20,
  },
  box1: {
    gap: 10,
  },
  nameBox: {
    width: '70%',
    borderWidth: 1,
    // borderColor: colors.background,
  },
  expiryBox: {
    width: '25%',
  },
  numbAndCvvBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    width: '70%',
  },
  cvv: {
    width: '25%',
  },
  textInput: {
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
    backgroundColor: myTheme.secondary,
    color: myTheme.accent,
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: myTheme.main,
  },
  button: {
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
});

export default AddCardModal;
