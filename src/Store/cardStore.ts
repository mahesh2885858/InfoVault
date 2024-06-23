import {create} from 'zustand';
import {TCard} from '../Types/Card.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

type TCardStore = {
  cards: TCard[];
  addCard: (card: TCard) => void;
  removeCard: (number: string) => void;
};

export const useCardStore = create(
  persist<TCardStore>(
    set => {
      return {
        cards: [],
        addCard: (card: TCard) => {
          set(state => {
            return {cards: [...state.cards, card]};
          });
        },
        removeCard: (cardNumber: string) => {
          set(state => {
            const d = state.cards.filter(c => c.cardNumber !== cardNumber);
            return {cards: d};
          });
        },
      };
    },
    {
      name: 'cardStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
