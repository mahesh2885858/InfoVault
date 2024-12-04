import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {myTheme} from '../../../theme';
import {View} from 'react-native';
import LightText from '../atoms/LightText';
import {StyleSheet} from 'react-native';
import PressableWithFeedback from '../PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: myTheme.cardBg,
      }}
      {...props}>
      <View style={styles.container}>
        <LightText style={styles.largeText}>Hi,</LightText>
        <LightText style={styles.subTitleText}>User</LightText>
        <PressableWithFeedback
          onPress={() => {
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
