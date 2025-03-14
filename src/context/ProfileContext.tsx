import React, {useContext, useState} from 'react';
import {createContext} from 'react';
import ProfileSelectionModal from '../components/ProfileSelectionModal';

export const ProfileContext = createContext<{
  openProfileSelection: () => void;
  closeProfileSelection: () => void;
} | null>(null);

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  return context;
};

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [renderModal, setRenderModal] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        closeProfileSelection: () => setRenderModal(false),
        openProfileSelection: () => setRenderModal(true),
      }}>
      {renderModal && (
        <ProfileSelectionModal
          onClose={() => setRenderModal(false)}
          visible={renderModal}
        />
      )}
      {children}
    </ProfileContext.Provider>
  );
};
