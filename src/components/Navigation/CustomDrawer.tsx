import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {myTheme} from '../../../theme';
import {View} from 'react-native';
import Typography from '../atoms/Typography';
import {StyleSheet} from 'react-native';
import PressableWithFeedback from '../PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StyleService, useTheme} from '@ui-kitten/components';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: theme['bg-main'],
      }}
      {...props}>
      <View style={styles.container}>
        <Typography style={styles.largeText}>Hi,</Typography>
        <Typography style={styles.subTitleText}>User</Typography>
        <PressableWithFeedback
          onPress={() => {
            props.navigation.closeDrawer();
            navigation.navigate('Settings');
          }}
          style={styles.icon}>
          <MaterialIcon name="cog" size={24} color={myTheme.textMain} />
        </PressableWithFeedback>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const styles = StyleService.create({
  container: {
    paddingLeft: 20,
    paddingTop: 30,
    marginBottom: 20,
  },
  largeText: {
    fontSize: 30,
    fontWeight: '700',
  },
  subTitleText: {
    fontSize: 25,
    fontWeight: '500',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 45,
  },
});
export default CustomDrawer;
