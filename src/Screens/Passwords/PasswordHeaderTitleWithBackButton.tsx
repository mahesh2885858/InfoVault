import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import LightText from '../../components/atoms/LightText';
import {usePasswordsStore} from '../../Store/passwordStore';
const PasswordHeaderTitleWithBackButton = () => {
  const navigation = useNavigation();
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  return (
    <View style={styles.container}>
      <PressableWithFeedback
        onPress={() => {
          if (selectedPasswords.length > 0) {
            return;
          } else {
            navigation.goBack();
          }
        }}>
        <MaterialIcon name="arrow-left-thin" size={24} />
      </PressableWithFeedback>

      <LightText style={styles.text}>Passwords</LightText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: myTheme.secondary,
  },
});
export default PasswordHeaderTitleWithBackButton;
