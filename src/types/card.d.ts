import { TBaseInput } from './passwords.d';
export type TCardType = 'creditDebit' | 'other';
export type TCardCreditDebit = {
  type: 'creditDebit';
  id: string;
  NameOnCard: string;
  cardNumber: string;
  CVV: string;
  expiry: string;
  cardName: string;
  isSelected: boolean;
  profileId: string;
  isPinned?: boolean;
};
export type TCardOther = {
  type: 'other';
  id: string;
  cardName: string;
  cardNumber: string;
  otherDetails: string;
  isSelected?: boolean;
  profileId: string;
  isPinned?: boolean;
};
export type TCard = TCardCreditDebit | TCardOther;

export type TCardCreditDebitInput = {
  cardName: TBaseInput;
  cardNumber: TBaseInput;
  CVV: TBaseInput;
  expiry: TBaseInput;
  NameOnCard: TBaseInput;
};
export type TCardOtherInput = {
  cardName: TBaseInput;
  cardNumber: TBaseInput;
  otherDetails: TBaseInput;
};

export type TCardInput = TCardCreditDebitInput | TCardOtherInput;
