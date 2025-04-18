export type TCard = {
  NameOnCard: string;
  cardNumber: string;
  CVV: string;
  expiry: string;
  cardName: string;
  isSelected: boolean;
  profileId: string;
};
export type TCardInput = {
  cardName: TBaseInput;
  cardNumber: TBaseInput;
  CVV: TBaseInput;
  expiry: TBaseInput;
  NameOnCard: TBaseInput;
};
