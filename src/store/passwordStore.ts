import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {TPassword} from '../types/passwords';

type TPasswordsStore = {
  passwords: TPassword[];
  selectedPasswords: TPassword[];
  addPassword: (password: TPassword) => void;
  deletePasswords: () => void;
  togglePasswordSelection: (id: string) => void;
  deSelectAll: () => void;
  setPasswords: (passwords: TPassword[]) => void;
};

export const usePasswordsStore = create(
  persist<TPasswordsStore>(
    set => {
      return {
        passwords: [],
        selectedPasswords: [],
        togglePasswordSelection(id) {
          set(state => {
            const updatedPasswords = state.passwords.map(p => {
              if (p.id === id) {
                return {...p, isSelected: !p.isSelected};
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
              passwords: state.passwords.map(p => ({...p, isSelected: false})),
            };
          });
        },
        addPassword: password => {
          set(state => {
            return {
              passwords: [...state.passwords, {...password}],
            };
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
          set({passwords});
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
                  profileId: '123abd', //adding a new field
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
