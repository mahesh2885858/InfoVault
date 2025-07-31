import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import Typography from '../atoms/Typography';
import PressableWithFeedback from '../PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StyleService } from '@ui-kitten/components';
import { useTheme } from 'react-native-paper';

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
