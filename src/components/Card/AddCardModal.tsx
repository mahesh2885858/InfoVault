import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ModalWrapper from '../ModalWrapper';
import PressableWithFeedback from '../PressableWithFeedback';
import {TextInput} from 'react-native';
import {useCardStore} from '../../Store/cardStore';
import {colors} from '../../globals';
import {TCard} from '../../Types/Card.types';
type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const initState: TCard = {
  cardName: '',
  cardNumber: '',
  CVV: '',
  expiry: '',
  NameOnCard: '',
};
const AddCardModal = (props: Props) => {
  const {addCard} = useCardStore();
  const [cardInputs, setCardInputs] = useState<TCard>(initState);
  const onChange = (text: string, field: keyof typeof cardInputs) => {
    let t = text;
    if (field === 'cardNumber') {
      const prevTextLastLetter = cardInputs.cardNumber
        .toString()
        .split('')
        .pop();

      if (text.length === 4 || text.length === 9 || text.length === 14) {
        if (prevTextLastLetter !== '-') {
          t = t + '-';
        }
      }
    }
    if (field === 'expiry') {
      if (text.length === 2 && cardInputs.expiry.split('').pop() !== '/') {
        t = t + '/';
      }
    }
    setCardInputs(prev => ({...prev, [field]: t}));
  };

  const AddACard = () => {
    addCard(cardInputs);
    setCardInputs(initState);
    props.setVisible(false);
  };
  return (
    <ModalWrapper
      width={'90%'}
      setVisibility={props.setVisible}
      visible={props.visible}>
      <View style={styles.content}>
        <View style={styles.nameAndExpiryBox}>
          <TextInput
            value={cardInputs.cardName}
            onChangeText={t => onChange(t, 'cardName')}
            style={[styles.nameBox, styles.textInput]}
          />
          <TextInput
            value={cardInputs.expiry}
            onChangeText={t => onChange(t, 'expiry')}
            maxLength={5}
            keyboardType="number-pad"
            style={[styles.expiryBox, styles.textInput]}
          />
        </View>
        <View style={styles.numbAndCvvBox}>
          <TextInput
            value={cardInputs.cardNumber.toString()}
            onChangeText={t => onChange(t, 'cardNumber')}
            keyboardType="number-pad"
            maxLength={19}
            style={[styles.textInput, styles.number]}
          />
          <TextInput
            value={cardInputs.CVV.toString()}
            maxLength={3}
            keyboardType="number-pad"
            onChangeText={t => onChange(t, 'CVV')}
            style={[styles.textInput, styles.cvv]}
          />
        </View>
        <View>
          <TextInput
            value={cardInputs.NameOnCard}
            onChangeText={t => onChange(t, 'NameOnCard')}
            style={[styles.textInput]}
          />
        </View>
      </View>
      <View style={styles.buttonsBox}>
        <PressableWithFeedback
          style={styles.button}
          onPress={() => props.setVisible(false)}>
          <Text style={styles.buttonText}>Close</Text>
        </PressableWithFeedback>
        <PressableWithFeedback onPress={() => AddACard()} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </PressableWithFeedback>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  nameAndExpiryBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 10,
  },
  content: {
    gap: 10,
  },
  nameBox: {
    width: '65%',
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
    width: '65%',
  },
  cvv: {
    width: '25%',
  },
  textInput: {
    fontSize: 20,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    // padding: 10,
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 20,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
});

export default AddCardModal;
