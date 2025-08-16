import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import Typography from '../../components/atoms/Typography';
import { usePasswordsStore } from '../../store/passwordStore';
import { useTranslation } from 'react-i18next';

const PasswordHeaderTitleWithBackButton = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
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
        }}
      >
        <MaterialIcon
          name="arrow-left-thin"
          size={24}
          color={theme['text-primary']}
        />
      </PressableWithFeedback>
      <PressableWithFeedback
        hidden={selectedPasswords.length > 0}
        onPress={() => {
          if (selectedPasswords.length === 0) {
            navigation.dispatch(DrawerActions.openDrawer());
          }
        }}
      >
        <MaterialIcon name="menu" size={24} color={theme['text-primary']} />
      </PressableWithFeedback>

      <Typography style={styles.text}>{t('passwords.title')}</Typography>
    </View>
  );
};
const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: 'text-primary',
  },
});
export default PasswordHeaderTitleWithBackButton;
