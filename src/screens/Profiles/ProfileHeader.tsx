import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../../components/atoms/Typography';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const ProfileHeader = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.box}>
        <View style={styles.header}>
          <PressableWithFeedback>
            <MaterialIcon
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              name="menu"
              size={24}
              color={theme['text-primary']}
            />
          </PressableWithFeedback>

          <Typography style={styles.text}>Profiles</Typography>
        </View>
      </View>
    </View>
  );
};
export default ProfileHeader;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'bg-main',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {flexDirection: 'row', alignItems: 'center'},
  gap: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingLeft: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: 'text-primary',
  },
});
