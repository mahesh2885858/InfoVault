import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TMessageType} from '../Types/Message.types.ts';
import {colors} from '../globals.ts';

type Props = {
  message: TMessageType;
  isLastMessageFromMe: boolean;
};
const LatestMessagePreview = (props: Props) => {
  const text =
    props.message.type === 'text'
      ? props.message.text
      : props.message.type + ' Message';

  let readReceipts: any = null;
  let messageIcon: any = null;

  switch (props.message.type) {
    case 'multiImage':
      messageIcon = (
        <MaterialIcon name="image-outline" size={17} color={'grey'} />
      );
      break;

    case 'video':
      messageIcon = (
        <MaterialIcon name="video-outline" size={17} color={'grey'} />
      );
      break;

    case 'location':
      messageIcon = <MaterialIcon name="map-marker" size={17} color={'grey'} />;
      break;

    case 'audio':
      messageIcon = (
        <MaterialIcon name="music-note-outline" size={17} color={'grey'} />
      );
      break;

    case 'list':
      messageIcon = (
        <MaterialIcon name="format-list-bulleted" size={17} color={'grey'} />
      );
      break;
    default:
      break;
  }

  switch (props.message.status) {
    case 'sent':
      readReceipts = <MaterialIcon name="check" size={17} color={'grey'} />;
      break;

    case 'delivered':
      readReceipts = <MaterialIcon name="check-all" size={17} color={'grey'} />;
      break;

    case 'read':
      readReceipts = (
        <MaterialIcon name="check-all" size={17} color={'skyblue'} />
      );

      break;
    default:
      break;
  }

  return (
    <View style={styles.previewContainer}>
      <View style={styles.previewContainer}>
        {props.isLastMessageFromMe && readReceipts}
        {messageIcon}
        <Text numberOfLines={1} style={styles.text} ellipsizeMode="tail">
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: colors.secondaryText,
  },
});
export default LatestMessagePreview;
