import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../../components/atoms/Typography';
import PressableWithFeedback from '../../components/PressableWithFeedback';

const ProfileHeader = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.box}>
        <View style={styles.header}>
          <PressableWithFeedback>
            <MaterialIcon
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              name="menu"
              size={24}
              color={theme.colors.onBackground}
            />
          </PressableWithFeedback>

          <Typography
            style={[
              styles.text,
              {
                color: theme.colors.onBackground,
              },
            ]}
          >
            Profiles
          </Typography>
        </View>
      </View>
    </View>
  );
};
export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: { flexDirection: 'row', alignItems: 'center' },
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
