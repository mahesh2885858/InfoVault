import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  TChatListHeaderProps,
  TChatListItem,
} from '../../Types/ChatList.types.ts';
import {colors} from '../../globals.ts';
// import ArchiveScreen from './ArchiveScreen';
// import ChatArchiveUndoView from './ChatArchiveUndoView';
import list from '../../Lib/ChatList.ts';
import RenderChatList from '../../components/RenderChatList.tsx';
import {useStore} from '../../Store/store.ts';

const Home = () => {
  const store = useStore(state => state.chatList);
  const ToggleChatSelection = useStore(state => state.ToggleChatSelection);
  const ToggleSelectAllChats = useStore(state => state.ToggleSelectAllChats);
  const selectedChats = useStore(state => state.selectedChats);
  // const [data, setData] = useState(list);

  // const [selectedChats, setSelectedChats] = useState<TChatListItem[]>([]);

  const [archiveMode, setArchiveMode] = useState(false);

  // const [triggerForDataChange, setTriggerForDataChange] = useState<
  //   null | 'Chat selection' | 'Chat Pinned' | 'Chat archived' | 'Chat filtered'
  // >(null);

  const [renderUndoAction, setRenderUndoAction] = useState<
    'archived' | 'unarchived' | null
  >(null);

  const [toggleArchiveChatIds, setToggleArchiveChatIds] = useState<number[]>(
    [],
  );

  const [filters, setFilters] = useState<'All' | 'Unread' | 'Groups'>('All');

  const archivedChats = useMemo(() => store.filter(i => i.isArchived), [store]);

  const dataToRender = useMemo(
    () =>
      store.filter(item => {
        if (filters === 'Groups') {
          if (item.type === 'Group') return item;
        } else if (filters === 'Unread') {
          if (item.isMarkedAsUnread || item.noOfUnreadMessages > 0) return item;
        } else return item;
      }),
    [store, filters],
  );

  const changeFilter = (filter: typeof filters) => {
    setFilters(filter);
    sortList();
  };

  // const ToggleChatSelection = (id: number) => {
  //   setData(prev => {
  //     return prev.map(item => {
  //       if (item._id === id) return {...item, isSelected: !item.isSelected};
  //       return item;
  //     });
  //   });
  //   setTriggerForDataChange('Chat selection');
  // };

  // const ToggleSelectAllChats = (action?: 'select') => {
  //   setData(prev => {
  //     return prev.map(item => {
  //       return {...item, isSelected: action === 'select'};
  //     });
  //   });
  //   if (!action) return setSelectedChats([]);
  //   setTriggerForDataChange('Chat selection');
  // };

  const togglePinChats = () => {
    const areAllSelectedChatsArePinned = selectedChats.every(i => i.isPinned);

    setData(prev => {
      return prev.map(item => {
        if (item.isSelected)
          return {...item, isPinned: !areAllSelectedChatsArePinned};
        return item;
      });
    });

    setTriggerForDataChange('Chat Pinned');
    ToggleSelectAllChats();
  };

  // const sortList = useCallback(() => {
  //   let dataToSort = [...data];

  //   dataToSort.sort((a, b) => {
  //     if (a.isPinned && !b.isPinned) return -1;
  //     if (!a.isPinned && b.isPinned) return 1;
  //     return (
  //       new Date(b.lastMessage.createdAt).getTime() -
  //       new Date(a.lastMessage.createdAt).getTime()
  //     );
  //   });
  //   setData(dataToSort);
  //   setTriggerForDataChange(null);
  // }, [data]);

  const deleteChats = () => {
    setData(prev => {
      return prev.filter(m => !m.isSelected);
    });
    ToggleSelectAllChats();
  };

  const toggleMuteChat = () => {
    const AreAllSelectedChatsAreMuted = selectedChats.every(m => m.isMuted);
    setData(prev => {
      return prev.map(i => {
        if (i.isSelected) {
          return {...i, isMuted: !AreAllSelectedChatsAreMuted};
        } else return i;
      });
    });
    ToggleSelectAllChats();
  };

  const toggleArchiveChats = (mode: 'archived' | 'unarchived') => {
    let timeId: NodeJS.Timeout;
    let ids: number[] = [];

    setData(prev => {
      return prev.map(i => {
        if (i.isSelected) {
          ids.push(i._id);
          return {...i, isArchived: !i.isArchived};
        } else return i;
      });
    });

    setToggleArchiveChatIds(ids);
    ToggleSelectAllChats();
    setRenderUndoAction(mode);

    timeId = setTimeout(() => {
      setRenderUndoAction(null);
      setToggleArchiveChatIds([]);
      clearTimeout(timeId);
    }, 5000);
  };

  // const undoArchiveOrUnArchive = (id: number[]) => {
  //   setData(prev => {
  //     return prev.map(i => {
  //       if (id.indexOf(i._id) >= 0) {
  //         return {...i, isArchived: !i.isArchived};
  //       } else return i;
  //     });
  //   });
  //   setRenderUndoAction(null);
  // };

  const toggleChatReadStatus = () => {
    const AreAllSelectedChatsAreMarkedAsUnread = selectedChats.some(
      m => m.isMarkedAsUnread || m.noOfUnreadMessages > 0,
    );

    setData(prev => {
      return prev.map(i => {
        if (i.isSelected) {
          return {
            ...i,
            isMarkedAsUnread: !AreAllSelectedChatsAreMarkedAsUnread,
            noOfUnreadMessages: !i.isMarkedAsUnread ? 0 : i.noOfUnreadMessages,
          };
        } else return i;
      });
    });
    ToggleSelectAllChats();
  };

  const chatListHeaderProps = (
    beingPassedTo: 'home' | 'archive screen',
  ): TChatListHeaderProps => {
    return {
      archiveMode,
      archiveTrigger: beingPassedTo === 'home' ? 'archived' : 'unarchived',
      deleteChats,
      selectedChats,
      setArchiveMode,
      toggleArchiveChats,
      ToggleSelectAllChats,
      archivedChats,
      toggleMuteChat,
      togglePinChats,
      toggleChatReadStatus,
      selectedFilter: filters,
      setFilters: changeFilter,
    };
  };

  // useEffect(() => {
  //   switch (triggerForDataChange) {
  //     case 'Chat selection':
  //       setSelectedChats(data.filter(m => m.isSelected));
  //       break;
  //     case 'Chat Pinned':
  //       sortList();
  //       break;

  //     default:
  //       break;
  //   }
  // }, [triggerForDataChange, data, sortList]);

  // useEffect(() => {
  //   sortList();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.chatListContainer}
          data={dataToRender.filter(i => !i.isArchived)}
          getItemLayout={(_, index) => {
            return {length: 50, index, offset: 0};
          }}
          renderItem={({item}) => (
            <RenderChatList
              item={item}
              ToggleChatSelection={ToggleChatSelection}
              goToChat={() => {}}
              selectedChatsLength={selectedChats.length}
            />
          )}
        />
      </View>

      {/* <ArchiveScreen
        {...chatListHeaderProps('archive screen')}
        ToggleChatSelection={ToggleChatSelection}
        goToChat={props.goToChat}
        ids={toggleArchiveChatIds}
        undoArchiveOrUnArchive={undoArchiveOrUnArchive}
        renderUndoAction={renderUndoAction}
      /> */}

      {/* {renderUndoAction === 'archived' && (
        <ChatArchiveUndoView
          ids={toggleArchiveChatIds}
          undoArchiveOrUnArchive={undoArchiveOrUnArchive}
          trigger="archived"
        />
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    position: 'relative',
    flex: 1,
  },

  chatListContainer: {
    display: 'flex',
    paddingBottom: 70,
  },
});
export default Home;
