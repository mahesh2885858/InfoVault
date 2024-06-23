import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Menu} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../globals.ts';
import {TChatListHeaderProps} from '../Types/ChatList.types.ts';
import DeleteConfirmModal from './DeleteConfirmModal';
import MuteConfirmModal from './MuteConfirmModal';
import PressableWithFeedback from './PressableWithFeedback';
import MenuItemWithHideOption from './MenuItemWithHideOption';

const ChatListHeaderActions = (props: TChatListHeaderProps) => {
  const {
    selectedChats,
    ToggleSelectAllChats,
    togglePinChats: togglePinning,
    deleteChats,
  } = props;
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showMuteConfirmationModal, setShowMuteConfirmationModal] =
    useState(false);

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  let AreAllSelectedChatsPinned = true;
  let AreAllSelectedChatsMuted = true;
  let AreAllSelectedChatsArchived = true;
  let AreAllSelectedChatsMarkedAsUnread = false;
  let AtLeastOneGroupIsSelected = false;
  let AreAllSelectedChatsAreGroups = true;

  selectedChats.forEach(item => {
    if (!item.isPinned) {
      AreAllSelectedChatsPinned = false;
    }
    if (!item.isMuted) {
      AreAllSelectedChatsMuted = false;
    }
    if (!item.isArchived) {
      AreAllSelectedChatsArchived = false;
    }
    if (item.isMarkedAsUnread || item.noOfUnreadMessages > 0) {
      AreAllSelectedChatsMarkedAsUnread = true;
    }
    if (item.type === 'Group') {
      AtLeastOneGroupIsSelected = true;
    }
    if (item.type === 'Individual') {
      AreAllSelectedChatsAreGroups = false;
    }
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRight}>
        <PressableWithFeedback
          hidden={props.archiveMode}
          onPress={() => togglePinning!()}>
          {AreAllSelectedChatsPinned ? (
            <MaterialIcon
              name="pin-off-outline"
              color={colors.primaryText}
              size={24}
            />
          ) : (
            <MaterialIcon
              name="pin-outline"
              color={colors.primaryText}
              size={24}
            />
          )}
        </PressableWithFeedback>

        <PressableWithFeedback
          hidden={AtLeastOneGroupIsSelected}
          onPress={() => setShowDeleteConfirmationModal(true)}>
          <MaterialIcon
            name="delete-outline"
            color={colors.primaryText}
            size={24}
          />
        </PressableWithFeedback>

        <PressableWithFeedback
          hidden={props.archiveMode}
          onPress={() => {
            if (AreAllSelectedChatsMuted) {
              props.toggleMuteChat!();
              return;
            }
            setShowMuteConfirmationModal(true);
          }}>
          {AreAllSelectedChatsMuted ? (
            <MaterialIcon
              name="bell-outline"
              color={colors.primaryText}
              size={24}
            />
          ) : (
            <MaterialIcon
              name="bell-off-outline"
              color={colors.primaryText}
              size={24}
            />
          )}
        </PressableWithFeedback>

        <PressableWithFeedback
          onPress={() => props.toggleArchiveChats(props.archiveTrigger!)}>
          {AreAllSelectedChatsArchived ? (
            <MaterialIcon
              name="archive-arrow-up-outline"
              color={colors.primaryText}
              size={24}
            />
          ) : (
            <MaterialIcon
              name="archive-arrow-down-outline"
              color={colors.primaryText}
              size={24}
            />
          )}
        </PressableWithFeedback>

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
          <MenuItemWithHideOption
            hidden={!AreAllSelectedChatsAreGroups}
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title={selectedChats.length > 1 ? 'Exit groups' : 'Exit group'}
            onPress={() => {}}
          />

          <MenuItemWithHideOption
            hidden={props.selectedChats.length > 1}
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="Add chat shortcut"
            onPress={() => {}}
          />
          <MenuItemWithHideOption
            hidden={props.selectedChats.length > 1}
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title="View Contact"
            onPress={() => {}}
          />
          <MenuItemWithHideOption
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title={
              AreAllSelectedChatsMarkedAsUnread
                ? 'Mark as read'
                : 'Mark as unread'
            }
            onPress={() => {
              closeMenu();
              props.toggleChatReadStatus();
            }}
          />
          <MenuItemWithHideOption
            titleStyle={styles.titleText}
            title="Select all"
            style={styles.menuItem}
            onPress={() => {}}
          />
          <MenuItemWithHideOption
            titleStyle={styles.titleText}
            style={styles.menuItem}
            title={props.selectedChats.length > 1 ? 'Lock chats' : 'Lock chat'}
            onPress={() => {}}
          />
          <MenuItemWithHideOption
            hidden={props.selectedChats.length > 1}
            style={styles.menuItem}
            titleStyle={styles.titleText}
            title="Block"
            onPress={() => {}}
          />
        </Menu>
      </View>

      <DeleteConfirmModal
        deleteChats={deleteChats}
        setVisibility={setShowDeleteConfirmationModal}
        visible={showDeleteConfirmationModal}
        numberOfselectedChats={selectedChats.length}
      />
      <MuteConfirmModal
        setVisibility={setShowMuteConfirmationModal}
        toggleMuteChat={props.toggleMuteChat!}
        visible={showMuteConfirmationModal}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
    gap: 20,
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
    padding: 10,
    color: colors.primaryText,
  },
  titleText: {
    color: colors.primaryText,
    paddingRight: 40,
  },
  additionalMenu: {
    backgroundColor: colors.background,
    marginTop: 10,
  },
  menuItem: {},
});

export default ChatListHeaderActions;
