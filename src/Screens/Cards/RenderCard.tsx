import React from 'react';
import {StyleSheet, View} from 'react-native';
import {myTheme} from '../../../theme';
import {useCardStore} from '../../Store/cardStore';
import {TCard} from '../../Types/Card.types';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Box from '../../components/atoms/Box';
import Container from '../../components/atoms/Container';
import DarkText from '../../components/atoms/DarkText';
import {colors} from '../../globals';

const RenderCard = (card: TCard) => {
  const toggleCardSelection = useCardStore(state => state.toggleCardSelection);
  const selectedCards = useCardStore(state => state.selectedCards);
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
            {backgroundColor: card.isSelected ? '#98a2ff' : myTheme.secondary},
          ]}>
          <View style={styles.nameAndExpiry}>
            <DarkText style={[styles.cardText, styles.cardNameText]}>
              {card.cardName}
            </DarkText>
            <DarkText style={styles.cardText}>{card.expiry}</DarkText>
          </View>
          <View style={styles.nameAndExpiry}>
            <DarkText style={styles.cardText}>{card.cardNumber}</DarkText>
            <DarkText style={styles.cardText}> {card.CVV}</DarkText>
          </View>
          <View>
            <DarkText style={styles.cardText}>{card.NameOnCard}</DarkText>
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
  cardContainer: {width: '100%', alignItems: 'center'},
  cardContent: {
    width: '90%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    gap: 15,
  },
  nameAndExpiry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardNameText: {
    fontWeight: '700',
    fontFamily: 'PlaywriteITModernaRegular',
  },
  cardText: {
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
export default RenderCard;
