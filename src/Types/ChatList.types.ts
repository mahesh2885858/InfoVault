import {TMessageType, TUser} from './Message.types';

export type TChatListItem = TUser & {
  lastMessage: TMessageType;
  noOfUnreadMessages: number;
  isMuted: boolean;
  isPinned: boolean;
  isSelected: boolean;
  isArchived: boolean;
  isMarkedAsUnread: boolean;
  type: 'Individual' | 'Group';
};

export type TChatListIndexProps = {
  goToChat: (user: TUser) => void;
};

export type TRenderChatListProps = {
  item: TChatListItem;
  goToChat: (user: TUser) => void;
  ToggleChatSelection: (id: number) => void;
  selectedChatsLength: number;
};
export type TFilterProps = {
  selectedFilter: 'All' | 'Unread' | 'Groups';
  setFilters: (props: 'All' | 'Unread' | 'Groups') => void;
};

export type TChatListHeaderProps = Partial<TFilterProps> & {
  selectedChats: TChatListItem[];
  ToggleSelectAllChats: (props?: 'select') => void;
  // togglePinChats?: () => void;
  // deleteChats: () => void;
  // toggleMuteChat?: () => void;
  // toggleArchiveChats: (mode: 'archived' | 'unarchived') => void;
  archiveMode: boolean;
  // setArchiveMode: React.Dispatch<React.SetStateAction<boolean>>;
  // archivedChats?: TChatListItem[];
  // archiveTrigger: 'archived' | 'unarchived';
  // openArchiveSettings?: () => void;
  // toggleChatReadStatus: () => void;
};

export type TArchiveScreenProps = TChatListHeaderProps &
  Omit<TRenderChatListProps, 'item' | 'selectedChatsLength'> & {
    undoArchiveOrUnArchive: (ids: number[]) => void;
    ids: number[];
    renderUndoAction: 'archived' | 'unarchived' | null;
  };
