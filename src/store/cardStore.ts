import { create } from 'zustand';
import { TCard } from '../types/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_PROFILE_ID } from '../constants';
import { v4 as uuidv4 } from 'uuid';

type TCardStore = {
  cards: TCard[];
  selectedCards: TCard[];
  addCard: (card: Omit<TCard, 'isSelected'>) => void;
  editCard: (card: TCard) => void;
  removeCards: (ids: string[]) => void;
  toggleCardSelection: (id: string) => void;
  deSelectAll: () => void;
  setCards: (cards: TCard[]) => void;
  focusedCard: string;
  setFocusedCard: (cardNumber: string) => void;
  togglePinCard: () => void;
  unPinCard: (id: string) => void;
};

export const useCardStore = create(
  persist<TCardStore>(
    set => {
      return {
        cards: [],
        selectedCards: [],
        focusedCard: '',

        deSelectAll: () => {
          set(state => {
            return {
              selectedCards: [],
              cards: state.cards.map(c => ({ ...c, isSelected: false })),
            };
          });
        },

        addCard: (card: Omit<TCard, 'isSelected'>) => {
          set(state => {
            return { cards: [...state.cards, { ...card, isSelected: false }] };
          });
        },
        editCard: (card: TCard) => {
          set(state => {
            const updatedCards = state.cards.map(c => {
              if (c.id === card.id) return card;
              else return c;
            });
            return { cards: updatedCards };
          });
        },

        removeCards: ids => {
          set(state => {
            const d = state.cards.filter(c => !ids.includes(c.id));
            return { cards: d, selectedCards: [] };
          });
        },

        toggleCardSelection: (id: string) => {
          set(state => {
            const updatedCards = state.cards.map(card => {
              if (card.id === id)
                return { ...card, isSelected: !card.isSelected };
              else return card;
            });
            return {
              ...state,
              cards: updatedCards,
              selectedCards: updatedCards.filter(c => c.isSelected),
            };
          });
        },
        setFocusedCard(id) {
          set({ focusedCard: id });
        },
        setCards(cards) {
          set({ cards });
        },
        togglePinCard: () => {
          set(state => {
            const updatedCards = state.cards.map(c => {
              if (c.isSelected) {
                return { ...c, isPinned: !c.isPinned };
              } else return c;
            });
            return { cards: updatedCards };
          });
        },
        unPinCard: id => {
          set(state => {
            const updatedCards = state.cards.map(c => {
              if (c.id === id) {
                return { ...c, isPinned: false };
              } else return c;
            });
            return { cards: updatedCards };
          });
        },
      };
    },
    {
      name: 'cardStore',
      storage: createJSONStorage(() => AsyncStorage),
      version: 4,
      migrate: (persistedState: any, version) => {
        switch (version) {
          case 1:
          case 2:
            return {
              ...persistedState,
              cards: persistedState.cards.map((card: TCard) => ({
                ...card,
                profileId: DEFAULT_PROFILE_ID, //adding a new field
              })),
            };
          case 3:
          case 4:
            // add id field to each card if not present
            return {
              ...persistedState,
              cards: persistedState.cards.map((card: TCard) => ({
                ...card,
                id: uuidv4(), // ensure each card has a unique id
              })),
            };
          default:
            return persistedState;
        }
      },
    },
  ),
);
