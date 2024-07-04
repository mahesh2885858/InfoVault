import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../Store/cardStore';
import {TCard} from '../../Types/Card.types';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Box from '../../components/atoms/Box';
import Container from '../../components/atoms/Container';
import LightText from '../../components/atoms/LightText';
import * as LocalAuthentication from 'expo-local-authentication';

const RenderCard = (card: TCard) => {
  const toggleCardSelection = useCardStore(state => state.toggleCardSelection);
  const selectedCards = useCardStore(state => state.selectedCards);
  const [showCVV, setShowCVV] = useState(false);
  const toggleCvv = async () => {
    try {
      if (!showCVV) {
        const t = await LocalAuthentication.authenticateAsync();
        if (t.success) {
          setShowCVV(true);
        }
      } else {
        setShowCVV(false);
      }
    } catch (e) {
      console.log({e});
    }
  };
  return (
    <Container style={styles.card}>
      <PressableWithFeedback
        onLongPress={() => {
          if (selectedCards.length === 0) {
            toggleCardSelection(card.cardNumber);
          }
        }}
        onPress={() => {
          if (selectedCards.length >= 1) {
            toggleCardSelection(card.cardNumber);
          }
        }}
        style={styles.cardContainer}>
        <Box
          style={[
            styles.cardContent,
            {
              backgroundColor: card.isSelected
                ? myTheme.cardSelectedBg
                : myTheme.cardBg,
            },
          ]}>
          <View style={styles.cardNameAndNumber}>
            <LightText style={styles.title}>{card.cardName}</LightText>
            <LightText style={styles.cardNumberText}>
              {card.cardNumber}
            </LightText>
          </View>
          <View style={styles.cardExpiryCvvButtonBox}>
            <View style={styles.expiryAndCvvBox}>
              <LightText style={styles.title}>Valid Thru</LightText>
              <LightText style={styles.cardText}> {card.expiry}</LightText>
            </View>
            <View style={styles.expiryAndCvvBox}>
              <LightText style={styles.title}>CVV</LightText>
              <LightText style={styles.cardText}>
                {showCVV ? card.CVV : '***'}
              </LightText>
            </View>
            <PressableWithFeedback
              onPress={() => toggleCvv()}
              style={styles.cvvButton}>
              <LightText>{showCVV ? 'Hide CVV' : 'View CVV'}</LightText>
            </PressableWithFeedback>
          </View>
          <View>
            <LightText style={styles.cardText}>{card.NameOnCard}</LightText>
          </View>
        </Box>
      </PressableWithFeedback>
    </Container>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cardContent: {
    width: '87%',
    borderRadius: 10,
    padding: 15,
    gap: 20,
    flexDirection: 'column',
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
  },
  expiryAndCvvBox: {
    flexDirection: 'column',
    gap: 2,
  },
  cvvButton: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#bf03ab',
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
  },
});
export default RenderCard;
