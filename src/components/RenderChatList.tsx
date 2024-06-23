import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../globals.ts';
import {TRenderChatListProps} from '../Types/ChatList.types.ts';
import {formatMessageDate} from '../Utils/formatTimeStamp.ts';
import LatestMessagePreview from './LatestMessagePreview';
import {Badge} from 'react-native-paper';
import {sizes} from '../globals.ts';

const RenderChatList = (props: TRenderChatListProps) => {
  const {item, goToChat, ToggleChatSelection, selectedChatsLength} = props;
  return (
    <Pressable
      onPress={() => {
        if (selectedChatsLength > 0) {
          return ToggleChatSelection(item._id);
        }
        goToChat({
          _id: item._id,
          name: item.name,
          avatar: item.avatar,
        });
      }}
      onLongPress={() => {
        ToggleChatSelection(item._id);
      }}
      delayLongPress={500}
      style={({pressed}) => [
        styles.chatListItem,
        {
          backgroundColor:
            pressed && !item.isSelected
              ? colors.secondary
              : pressed && item.isSelected
              ? colors.primaryLightTransparent
              : item.isSelected
              ? colors.primaryLightTransparent
              : colors.background,
        },
      ]}>
      {/* Avatar starts */}
      <Pressable>
        <Image source={{uri: String(item.avatar)}} style={styles.chatAvatar} />
        {item.isSelected && (
          <MaterialIcon
            style={styles.selectionIndicator}
            name="check-circle"
            color={colors.primaryGreen}
            size={20}
          />
        )}
      </Pressable>
      {/* Avatar ends */}
      <View style={styles.chatDetails}>
        <View style={styles.chatDetailBox}>
          <Text style={styles.chatUserName}>{item.name}</Text>
          <Text style={styles.greyText}>
            {formatMessageDate(item.lastMessage.createdAt)}
          </Text>
        </View>
        <View style={styles.chatDetailBox}>
          <LatestMessagePreview
            isLastMessageFromMe={item.lastMessage.sender._id === 1}
            message={item.lastMessage}
          />
          <View style={styles.icons}>
            {item.isMuted && (
              <MaterialIcon name="bell-off" color={'grey'} size={20} />
            )}
            {item.isPinned && (
              <MaterialIcon name="pin" color={'grey'} size={20} />
            )}
            {(item.noOfUnreadMessages > 0 || item.isMarkedAsUnread) && (
              <Badge style={styles.unreadBox}>
                {item.noOfUnreadMessages > 0 ? item.noOfUnreadMessages : ''}
              </Badge>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatListItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 15,
    padding: 10,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  selectionIndicator: {position: 'absolute', bottom: 0, right: 0},
  chatDetails: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  chatDetailBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatUserName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  icons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBox: {
    color: colors.primaryText,
    backgroundColor: colors.primaryGreen,
    alignSelf: 'center',
    fontSize: sizes.ml,
  },

  greyText: {
    color: colors.secondaryText,
    fontSize: 11,
  },
});

export default RenderChatList;
