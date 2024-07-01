import {create} from 'zustand';
import {TCard} from '../Types/Card.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

type TCardStore = {
  cards: TCard[];
  selectedChats: TCard[];
  addCard: (card: Omit<TCard, 'isSelected'>) => void;
  removeCard: () => void;
  toggleCardSelection: (id: string) => void;
  deSelectAll: () => void;
};

export const useCardStore = create(
  persist<TCardStore>(
    set => {
      return {
        cards: [],
        selectedChats: [],
        deSelectAll: () => {
          set(state => {
            return {
              selectedChats: [],
              cards: state.cards.map(c => ({...c, isSelected: false})),
            };
          });
        },
        addCard: (card: Omit<TCard, 'isSelected'>) => {
          set(state => {
            return {cards: [...state.cards, {...card, isSelected: false}]};
          });
        },
        removeCard: () => {
          set(state => {
            const d = state.cards.filter(c => !c.isSelected);
            return {cards: d};
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
              selectedChats: updatedCards.filter(c => c.isSelected),
            };
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
