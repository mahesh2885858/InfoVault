import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TChatListHeaderProps} from '../Types/ChatList.types.ts';
import {colors, sizes} from '../globals.ts';
import ChatListHeaderActions from './ChatListHeaderActions';
import PressableWithFeedback from './PressableWithFeedback';
import {useNavigation} from '@react-navigation/native';

const ChatListHeader = (props: TChatListHeaderProps) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const toast = useToast();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.background} />
      {props.selectedChats.length > 0 ? (
        <ChatListHeaderActions {...props} />
      ) : (
        <View style={styles.headerContainer}>
          <View style={styles.headerRight}>
            <PressableWithFeedback hidden={props.archiveMode}>
              <MaterialIcon
                name="qrcode-scan"
                color={colors.primaryText}
                size={24}
              />
            </PressableWithFeedback>

            <PressableWithFeedback hidden={props.archiveMode}>
              <MaterialIcon
                name="camera-outline"
                color={colors.primaryText}
                size={24}
              />
            </PressableWithFeedback>

            {!props.archiveMode && (
              <Menu
                contentStyle={styles.additionalMenu}
                visible={open}
                anchorPosition="bottom"
                onDismiss={closeMenu}
                anchor={
                  <PressableWithFeedback onPress={openMenu}>
                    <MaterialIcon
                      name="dots-vertical"
                      color={colors.primaryText}
                      size={24}
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
                  title="Cards"
                  onPress={() => {
                    closeMenu();
                    navigation.navigate('Cards');
                  }}
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
            )}

            {props.archiveMode && (
              <Menu
                contentStyle={styles.additionalMenu}
                visible={open}
                anchorPosition="bottom"
                onDismiss={closeMenu}
                anchor={
                  <PressableWithFeedback onPress={openMenu}>
                    <MaterialIcon
                      name="dots-vertical"
                      color={colors.primaryText}
                      size={22}
                    />
                  </PressableWithFeedback>
                }>
                <Menu.Item
                  style={styles.menuItem}
                  title="Archive settings"
                  // onPress={() => props.openArchiveSettings!()}
                  titleStyle={styles.titleText}
                />
              </Menu>
            )}
          </View>
        </View>
      )}
      {/* header ends */}
      {props.archiveMode && (
        <>
          <Divider />
          <Pressable
            onPress={() => {
              toast.show('Coming soon!', {duration: 2000});
            }}>
            <Text style={styles.infoText}>
              These chats stay archived when new messages are received. Tap to
              change.
            </Text>
          </Pressable>
          <Divider />
        </>
      )}
      {/* {!props.archiveMode && (
        <>
          <ChatListSearch />
          <ChatListFilters
            selectedFilter={props.selectedFilter!}
            setFilters={props.setFilters!}
          />
          {props.archivedChats!.length > 0 && <Archive {...props} />}
        </>
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerLeftText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    color: colors.primaryText,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    top: 10,
    left: 20,
  },
  searchInput: {
    backgroundColor: colors.secondary,
    marginHorizontal: 10,
    borderRadius: 30,
    paddingLeft: 45,
    fontSize: 16,
    height: 50,
  },
  numberOfSelectedChannels: {
    color: colors.primaryText,
    fontWeight: 'bold',
    fontSize: sizes.l,
  },
  titleText: {
    color: colors.primaryText,
    paddingRight: 40,
  },
  appNameText: {padding: sizes.m, flex: 1},
  icons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  additionalMenu: {
    backgroundColor: colors.background,
    // backgroundColor: 'red',
    marginTop: 10,
  },
  menuItem: {
    // paddingRight: 20,
  },
  infoText: {
    paddingRight: 20,
    textAlign: 'center',
    color: colors.primaryText,
  },
});
export default ChatListHeader;
