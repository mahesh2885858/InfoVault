import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {TPassword} from '../Types/Passwords.type';

type TPasswordsStore = {
  passwords: TPassword[];
  selectedPasswords: TPassword[];
  addPassword: (password: TPassword) => void;
  // removePassword: () => void;
  // togglePasswordSelection: (id: string) => void;
  deSelectAll: () => void;
};

export const usePasswordsStore = create(
  persist<TPasswordsStore>(
    set => {
      return {
        passwords: [],
        selectedPasswords: [],
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
      };
    },
    {
      name: 'passwordsStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
