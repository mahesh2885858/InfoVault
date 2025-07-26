import RNBiometrics from 'react-native-simple-biometrics';

export const authenticateLocal = async () => {
  const can = await RNBiometrics.canAuthenticate();
  if (can) {
    try {
      const result = await RNBiometrics.requestBioAuth(
        'Authentication Required',
        'Please authenticate to continue',
      );
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    console.log('Biometrics not available');
    return true;
  }
};
