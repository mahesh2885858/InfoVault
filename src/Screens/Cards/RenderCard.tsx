import {View, Text} from 'react-native';
import React from 'react';
import {TCard} from '../../Types/Card.types';
import {StyleSheet} from 'react-native';
import {colors} from '../../globals';

const RenderCard = (card: TCard) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.nameAndExpiry}>
          <Text style={styles.cardText}>{card.cardName}</Text>
          <Text style={styles.cardText}>{card.expiry}</Text>
        </View>
        <View style={styles.nameAndExpiry}>
          <Text style={styles.cardText}>{card.cardNumber}</Text>
          <Text style={styles.cardText}> {card.CVV}</Text>
        </View>
        <View>
          <Text style={styles.cardText}>{card.NameOnCard}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },
  cardContent: {
    width: '90%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    gap: 20,
  },
  nameAndExpiry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
    textTransform: 'uppercase',
  },
});
export default RenderCard;
