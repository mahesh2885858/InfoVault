import {create} from 'zustand';
import {TCard} from '../types/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

type TCardStore = {
  cards: TCard[];
  selectedCards: TCard[];
  addCard: (card: Omit<TCard, 'isSelected'>) => void;
  removeCard: (id?: string) => void;
  toggleCardSelection: (id: string) => void;
  deSelectAll: () => void;
  setCards: (cards: TCard[]) => void;
};

export const useCardStore = create(
  persist<TCardStore>(
    set => {
      return {
        cards: [],
        selectedCards: [],

        deSelectAll: () => {
          set(state => {
            return {
              selectedCards: [],
              cards: state.cards.map(c => ({...c, isSelected: false})),
            };
          });
        },

        addCard: (card: Omit<TCard, 'isSelected'>) => {
          set(state => {
            return {cards: [...state.cards, {...card, isSelected: false}]};
          });
        },

        removeCard: id => {
          set(state => {
            const d = state.cards.filter(c =>
              id ? c.cardNumber !== id : !c.isSelected,
            );
            return {cards: d, selectedCards: []};
          });
        },

        toggleCardSelection: (id: string) => {
          set(state => {
            const updatedCards = state.cards.map(card => {
              if (card.cardNumber === id)
                return {...card, isSelected: !card.isSelected};
              else return card;
            });
            return {
              ...state,
              cards: updatedCards,
              selectedCards: updatedCards.filter(c => c.isSelected),
            };
          });
        },
        setCards(cards) {
          set({cards});
        },
      };
    },
    {
      name: 'cardStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);