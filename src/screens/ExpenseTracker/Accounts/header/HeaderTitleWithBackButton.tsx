import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import PressableWithFeedback from '../../../../components/PressableWithFeedback';
import { Typography } from '../../../../components/atoms';

const HeaderTitleWithBackButton = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* <PressableWithFeedback
        // hidden={selectedCards.length === 0}
        onPress={() => {
          //   if (selectedCards.length > 0) {
          //     deSelectAll();
          //   }
        }}
      >
        <MaterialIcon
          name="arrow-left-thin"
          size={24}
          color={theme['text-primary']}
        />
      </PressableWithFeedback> */}
      <PressableWithFeedback
        // hidden={selectedCards.length > 0}
        onPress={() => {
          //   if (selectedCards.length === 0) {
          //     navigation.dispatch(DrawerActions.openDrawer());
          //   } else {
          //     // navigation.goBack();
          //   }
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <MaterialIcon name="menu" size={24} color={theme['text-primary']} />
      </PressableWithFeedback>
      <Typography style={styles.text}>{t('tracker.accounts')}</Typography>
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
export default HeaderTitleWithBackButton;
