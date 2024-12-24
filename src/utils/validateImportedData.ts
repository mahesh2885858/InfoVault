import {TCard, TPassword} from '../types';
type TProps = {
  cards: TCard[];
  passwords: TPassword[];
};
export const validateImportedData = (data: TProps): boolean => {
  let r = true;
  if (!data || (!data.cards && !data.passwords)) {
    console.log("invalid data, missing 'cards' or 'passwords'");
    return false;
  }

  // check the cards data
  if (data.cards && data.cards.length > 0) {
    data.cards.forEach(card => {
      if (
        !card.NameOnCard ||
        !card.cardNumber ||
        !card.CVV ||
        !card.expiry ||
        !card.cardName
      ) {
        console.log('invalid card data');
        r = false;
      }
    });
  }
  // check the passwords data
  if (data.passwords && data.passwords.length > 0) {
    data.passwords.forEach(password => {
      console.log({password});
      if (!password.password || !password.website || !password.username) {
        console.log('invalid password data');
        r = false;
      }
    });
  }
  return r;
};
