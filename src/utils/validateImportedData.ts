import {TCard, TPassword, TProfile} from '../types';
type TProps = {
  cards: TCard[];
  passwords: TPassword[];
  profiles: TProfile[];
};
export const validateImportedData = (data: TProps): boolean => {
  let r = true;
  if (!data || (!data.cards && !data.passwords && !data.profiles)) {
    console.log("invalid data, missing 'cards' or 'passwords' or 'profiles' ");
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

  // check the profiles data
  if (data.profiles && data.profiles.length > 0) {
    data.profiles.forEach(profile => {
      console.log({profile});
      if (!profile.name || !profile.id) {
        console.log('invalid profile data');
        r = false;
      }
    });
  }

  return r;
};
