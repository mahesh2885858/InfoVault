import React from 'react';
import {useStore} from '../../Store/store';
import ChatListHeader from '../../components/ChatListHeader';

const HomeHeader = () => {
  // const [open, setOpen] = useState(false);
  // const openMenu = () => setOpen(true);
  // const closeMenu = () => setOpen(false);
  const {
    ToggleSelectAllChats,
    archiveMode,

    selectedChats,
  } = useStore(state => state);
  return (
    <ChatListHeader
      ToggleSelectAllChats={ToggleSelectAllChats}
      archiveMode={archiveMode}
      selectedChats={selectedChats}
    />
  );
};
export default HomeHeader;
