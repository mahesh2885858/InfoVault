import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '@ui-kitten/components';
import React, { useCallback, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Animated, { LinearTransition } from 'react-native-reanimated';
import AddCardModal from '../../components/Card/AddCardModal';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import { CARD_HEIGHT, DEFAULT_PROFILE_ID } from '../../constants';
import { useCardStore } from '../../store/cardStore';
import { useProfileStore } from '../../store/profileStore';
import RenderCard from './RenderCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMiscStore } from '../../store/miscStore';
import { TCard } from '../../types';
import CardHeaders from './CardHeaders';

const Cards = () => {
  const [visible, setVisibility] = useState(false);
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const selectedCards = useCardStore(state => state.selectedCards);
  const cards = useCardStore(state => state.cards);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const focusedId = useCardStore(state => state.focusedCard);

  const listRef = useRef<FlatList>(null);
  const selectedProfile = useProfileStore(state => state.selectedProfileId);
  const search = useMiscStore(state => state.search);
  const cardsToRender = cards
    .filter(
      card =>
        (selectedProfile === DEFAULT_PROFILE_ID ||
          card.profileId === selectedProfile) &&
        (search.trim().length === 0 ||
          card.cardName.toLowerCase().includes(search.toLowerCase())),
    )
    .reduce((acc, card) => {
      if (card.isPinned) {
        acc.unshift(card);
      } else {
        acc.push(card);
      }
      return acc;
    }, [] as TCard[]);

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (selectedCards.length > 0) {
          deSelectAll();
          return true;
        }
        return false;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => subscription.remove();
    }, [selectedCards, deSelectAll]),
  );

  useFocusEffect(
    useCallback(() => {
      if (focusedId.trim().length === 0) return;
      const indexOfFocusedId = cards.findIndex(
        card => card.cardNumber === focusedId,
      );

      if (indexOfFocusedId >= 0) {
        listRef.current!.scrollToIndex({
          index: indexOfFocusedId,
          animated: true,
        });
      }
    }, [focusedId, cards]),
  );

  return (
    <Container
      onLayout={() => {
        BootSplash.hide();
      }}
      style={[styles.container, { paddingBottom: bottom }]}
    >
      <StatusBar backgroundColor={theme['bg-main']} />
      <CardHeaders />
      <Animated.FlatList
        extraData={focusedId}
        data={cardsToRender}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          return <RenderCard {...item.item} />;
        }}
        ref={listRef}
        itemLayoutAnimation={LinearTransition}
        keyExtractor={item => item.cardNumber}
        getItemLayout={(_, index) => ({
          length: CARD_HEIGHT,
          index,
          offset: CARD_HEIGHT * index,
        })}
      />

      <Fab
        callBack={() => {
          setVisibility(true);
        }}
      />
      <View>
        <AddCardModal setVisible={setVisibility} visible={visible} />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardConatiner: {
    gap: 13,
    paddingBottom: 100,
    paddingTop: 20,
    minHeight: '100%', // should be added to fix an issue refer:https://github.com/software-mansion/react-native-reanimated/issues/5728#issuecomment-2551570107
  },
});

export default Cards;
