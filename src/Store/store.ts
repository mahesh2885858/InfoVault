import {create} from 'zustand';
import list from '../Lib/ChatList';
import {TChatListItem} from '../Types/ChatList.types';

//   const [selectedChats, setSelectedChats] = useState<TChatListItem[]>([]);

//   const [archiveMode, setArchiveMode] = useState(false);

// const [triggerForDataChange, setTriggerForDataChange] = useState<
//   null | 'Chat selection' | 'Chat Pinned' | 'Chat archived' | 'Chat filtered'
// >(null);

// const [renderUndoAction, setRenderUndoAction] = useState<
//   'archived' | 'unarchived' | null
// >(null);

// const [toggleArchiveChatIds, setToggleArchiveChatIds] = useState<number[]>([]);
const toggleArchiveChatIds: number[] = [];

// const [filters, setFilters] = useState<'All' | 'Unread' | 'Groups'>('All');

// const archivedChats = useMemo(() => data.filter(i => i.isArchived), [data]);

// const dataToRender = useMemo(
//   () =>
//     data.filter(item => {
//       if (filters === 'Groups') {
//         if (item.type === 'Group') return item;
//       } else if (filters === 'Unread') {
//         if (item.isMarkedAsUnread || item.noOfUnreadMessages > 0) return item;
//       } else return item;
//     }),
//   [data, filters],
// );

const ToggleChatSelection = (
  id: number,
  prevStore: State & Actions,
): State & Actions => {
  const updatedMessages = prevStore.chatList.map(item => {
    if (item._id === id) return {...item, isSelected: !item.isSelected};
    return item;
  });
  return {
    ...prevStore,
    chatList: updatedMessages,
    selectedChats: updatedMessages.filter(m => m.isSelected),
    triggerForDataChange: 'Chat selection',
  };
};

const ToggleSelectAllChats = (
  prevStore: State & Actions,
  action?: 'select',
): State & Actions => {
  return {
    ...prevStore,
    chatList: prevStore.chatList.map(item => {
      return {...item, isSelected: action === 'select'};
    }),
    selectedChats: !action ? [] : prevStore.selectedChats,
    triggerForDataChange: !action
      ? prevStore.triggerForDataChange
      : 'Chat selection',
  };
};

type State = {
  chatList: TChatListItem[];
  selectedChats: TChatListItem[];
  archiveMode: boolean;
  triggerForDataChange:
    | 'Chat selection'
    | 'Chat Pinned'
    | 'Chat archived'
    | 'Chat filtered'
    | null;
  renderUndoAction: 'archived' | 'unarchived' | null;
  toggleArchiveChatIds: number[];
  filters: 'All' | 'Unread' | 'Groups';
};

type Actions = {
  ToggleChatSelection: (id: number) => void;
  ToggleSelectAllChats: (action?: 'select') => void;
};

export const useStore = create<State & Actions>(set => ({
  chatList: list,
  selectedChats: [],
  archiveMode: false,
  triggerForDataChange: null,
  filters: 'All',
  renderUndoAction: null,
  toggleArchiveChatIds,
  ToggleChatSelection: (id: number) => {
    set(state => {
      console.log({id});
      return ToggleChatSelection(id, state);
    });
  },
  ToggleSelectAllChats: (action?: 'select') => {
    set(state => {
      return ToggleSelectAllChats(state, action);
    });
  },
}));
