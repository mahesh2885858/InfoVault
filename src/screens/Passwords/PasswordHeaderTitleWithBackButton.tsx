import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myTheme} from '../../../theme';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import {usePasswordsStore} from '../../store/passwordStore';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const PasswordHeaderTitleWithBackButton = () => {
  const navigation = useNavigation();
  const selectedPasswords = usePasswordsStore(state => state.selectedPasswords);
  const deSelectAll = usePasswordsStore(state => state.deSelectAll);
  return (
    <View style={styles.container}>
      <PressableWithFeedback
        hidden={selectedPasswords.length === 0}
        onPress={() => {
          if (selectedPasswords.length > 0) {
            deSelectAll();
          }
        }}>
        <MaterialIcon
          name="arrow-left-thin"
          size={24}
          color={myTheme.textMain}
        />
      </PressableWithFeedback>
      <PressableWithFeedback
        hidden={selectedPasswords.length > 0}
        onPress={() => {
          if (selectedPasswords.length === 0) {
            navigation.dispatch(DrawerActions.openDrawer());
          }
        }}>
        <MaterialIcon name="menu" size={24} color={myTheme.textMain} />
      </PressableWithFeedback>

      <Typography style={styles.text}>Passwords</Typography>
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
