import { useFocusEffect } from '@react-navigation/native';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddCardModal from '../../components/Card/AddCardModal';
import Fab from '../../components/Fab';
import Container from '../../components/atoms/Container';
import { DEFAULT_PROFILE_ID } from '../../constants';
import { useCardStore } from '../../store/cardStore';
import { useMiscStore } from '../../store/miscStore';
import { useProfileStore } from '../../store/profileStore';
import { TCard } from '../../types';
import CardHeaders from './CardHeaders';
import RenderCard from './RenderCard';

const Cards = () => {
  const [visible, setVisibility] = useState(false);
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const selectedCards = useCardStore(state => state.selectedCards);
  const cards = useCardStore(state => state.cards);
  const deSelectAll = useCardStore(state => state.deSelectAll);
  const focusedId = useCardStore(state => state.focusedCard);

  const listRef = useRef<FlashListRef<TCard>>(null);
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
      <StatusBar backgroundColor={theme.colors.background} />
      <CardHeaders />
      <FlashList
        extraData={focusedId}
        data={cardsToRender}
        contentContainerStyle={styles.cardConatiner}
        renderItem={item => {
          listRef.current?.prepareForLayoutAnimationRender();
          return <RenderCard card={item.item} />;
        }}
        ref={listRef}
        keyExtractor={item => item.id || item.cardNumber}
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
    gap: 5,
    paddingBottom: 100,
    // paddingTop: 0,
    minHeight: '100%', // should be added to fix an issue refer:https://github.com/software-mansion/react-native-reanimated/issues/5728#issuecomment-2551570107
  },
});

export default Cards;
