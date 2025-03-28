import React, {useContext, useState} from 'react';
import {createContext} from 'react';
import ProfileSelectionModal from '../components/ProfileSelectionModal';
import {View} from 'react-native';

export const ProfileContext = createContext<{
  openProfileSelection: (props?: {renderForNew?: boolean}) => void;
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
  const [renderForNewItem, setRenderForNewItem] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        closeProfileSelection: () => setRenderModal(false),
        openProfileSelection: (props?: {renderForNew?: boolean}) => {
          setRenderForNewItem(!!props?.renderForNew);
          setRenderModal(true);
        },
      }}>
      {renderModal && (
        <View>
          <ProfileSelectionModal
            renderingForNewItemAdd={renderForNewItem}
            onClose={() => setRenderModal(false)}
            visible={renderModal}
          />
        </View>
      )}
      {children}
    </ProfileContext.Provider>
  );
};
