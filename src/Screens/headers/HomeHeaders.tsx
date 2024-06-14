import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Menu} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import {colors} from '../../globals';

export const HomeHeaders: NativeStackNavigationOptions = {
  headerTitle: 'WhatsApp',
  headerStyle: {backgroundColor: colors.background},
  statusBarColor: colors.background,
  headerTitleStyle: {color: colors.primaryText},
  headerRight: () => {
    return (
      <View style={styles.box}>
        <PressableWithFeedback>
          <MaterialIcon
            name="qrcode-scan"
            color={colors.primaryText}
            size={22}
          />
        </PressableWithFeedback>

        <PressableWithFeedback>
          <MaterialIcon
            name="camera-outline"
            color={colors.primaryText}
            size={22}
          />
        </PressableWithFeedback>
        <Menu
          contentStyle={styles.additionalMenu}
          visible={true}
          anchorPosition="bottom"
          onDismiss={() => {}}
          anchor={
            <PressableWithFeedback>
              <MaterialIcon
                name="dots-vertical"
                color={colors.primaryText}
                size={22}
              />
            </PressableWithFeedback>
          }>
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="New group"
            onPress={() => {}}
          />
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="New broadcast"
            onPress={() => {}}
          />
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="Linked devices"
            onPress={() => {}}
          />
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="Starred messages"
            onPress={() => {}}
          />
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="Payments"
            onPress={() => {}}
          />
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="Settings"
            onPress={() => {}}
          />
          <Menu.Item
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="Switch accounts"
            onPress={() => {}}
          />
        </Menu>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  additionalMenu: {
    backgroundColor: colors.background,
    // backgroundColor: 'red',
    marginTop: 10,
  },
  menuItem: {
    // paddingRight: 20,
  },
  titleText: {
    color: colors.primaryText,
    paddingRight: 40,
  },
});
