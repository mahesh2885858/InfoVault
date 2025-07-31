import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../atoms/Typography';
import PressableWithFeedback from '../PressableWithFeedback';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
      {...props}
    >
      <View style={styles.container}>
        <Typography style={styles.largeText}>Hi,</Typography>
        <Typography style={styles.subTitleText}>User</Typography>
        <PressableWithFeedback
          onPress={() => {
            props.navigation.closeDrawer();
            navigation.navigate('Settings');
          }}
          style={styles.icon}
        >
          <MaterialIcon
            name="cog"
            size={24}
            color={theme.colors.onBackground}
          />
        </PressableWithFeedback>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
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
