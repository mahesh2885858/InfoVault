import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TPassword } from '../types/passwords';
import { DEFAULT_PROFILE_ID } from '../constants';

type TPasswordsStore = {
  passwords: TPassword[];
  selectedPasswords: TPassword[];
  addPassword: (password: TPassword) => void;
  editPassword: (password: TPassword) => void;
  deletePasswords: () => void;
  togglePasswordSelection: (id: string) => void;
  deSelectAll: () => void;
  setPasswords: (passwords: TPassword[]) => void;
  removePassword: (id: string) => void;
  focusedPassword: string;
  setFocusedPassword: (cardNumber: string) => void;
  togglePinPassword: () => void;
  unPinPassword: (id: string) => void;
  movePasswordsToDefaultProfile: (passwords: TPassword[]) => void;
};

export const usePasswordsStore = create(
  persist<TPasswordsStore>(
    (set, get) => {
      return {
        passwords: [],
        selectedPasswords: [],
        togglePasswordSelection(id) {
          set(state => {
            const updatedPasswords = state.passwords.map(p => {
              if (p.id === id) {
                return { ...p, isSelected: !p.isSelected };
              } else return p;
            });
            return {
              passwords: updatedPasswords,
              selectedPasswords: updatedPasswords.filter(p => p.isSelected),
            };
          });
        },
        deSelectAll: () => {
          set(state => {
            return {
              ...state,
              selectedPasswords: [],
              passwords: state.passwords.map(p => ({
                ...p,
                isSelected: false,
              })),
            };
          });
        },
        addPassword: password => {
          set(state => {
            return {
              passwords: [...state.passwords, { ...password }],
            };
          });
        },
        editPassword: password => {
          set(state => {
            const updatedPasswords = state.passwords.map(p => {
              if (p.id === password.id) {
                return { ...p, ...password };
              } else return p;
            });
            return { passwords: updatedPasswords };
          });
        },
        deletePasswords: () => {
          set(state => {
            return {
              passwords: state.passwords.filter(p => !p.isSelected),
              selectedPasswords: [],
            };
          });
        },
        setPasswords(passwords) {
          set({ passwords });
        },
        removePassword(id) {
          const filteredPasswords = get().passwords.filter(p => p.id !== id);
          set({ passwords: filteredPasswords });
        },
        focusedPassword: '',
        setFocusedPassword(cardNumber) {
          set({ focusedPassword: cardNumber });
        },
        togglePinPassword() {
          set(state => {
            const id = state.selectedPasswords[0]?.id;
            const updatedPasswords = state.passwords.map(p => {
              if (p.id === id) {
                return { ...p, isPinned: !p.isPinned };
              } else return p;
            });
            return { passwords: updatedPasswords };
          });
        },
        unPinPassword: id => {
          set(state => {
            const updatedPasswords = state.passwords.map(p => {
              if (p.id === id) {
                return { ...p, isPinned: false };
              } else return p;
            });
            return { passwords: updatedPasswords };
          });
        },
        movePasswordsToDefaultProfile: passwords => {
          set(state => {
            const updatedPasswords = passwords.map(p => ({
              ...p,
              profileId: DEFAULT_PROFILE_ID,
            }));
            return {
              // This will remove the passwords that are being moved from the current store
              // and add the updated passwords with the default profile ID.
              passwords: state.passwords
                .filter(p => !passwords.some(np => np.id === p.id))
                .concat(updatedPasswords),
            };
          });
        },
      };
    },
    {
      name: 'passwordsStore',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persistedState: any, version) => {
        switch (version) {
          case 1:
          case 2:
            // Migrating from version 0 to 1
            console.log('running the migration for version: ', version);
            return {
              ...persistedState,
              passwords: persistedState.passwords.map(
                (password: TPassword) => ({
                  ...password,
                  profileId: DEFAULT_PROFILE_ID, //adding a new field
                }),
              ),
            };

          default:
            return persistedState;
        }
      },
    },
  ),
);
