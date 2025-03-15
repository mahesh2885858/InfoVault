import React, {useContext, useState, useEffect, useCallback} from 'react';
import {createContext} from 'react';
import {BackHandler, Modal} from 'react-native';
import {View} from 'react-native';
import {StyleSheet, AppState} from 'react-native';
import LightText from '../components/atoms/LightText';
import {authenticateLocal} from '../utils/authenticateLocal';
import Button from '../components/atoms/Button';

export const AuthContext = createContext<{
  setIsAuthenticated: (choice: boolean) => void;
} | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authenticate = useCallback(async () => {
    setIsAuthenticating(true);
    const result = await authenticateLocal();
    if (result) {
      setIsAuthenticated(true);
    }
    setIsAuthenticating(false);
    return;
  }, []);

  const exit = useCallback(() => {
    BackHandler.exitApp();
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);
  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated: choice => setIsAuthenticated(choice),
      }}>
      {(!isAuthenticated || AppState.currentState === 'background') && (
        <Modal visible={!isAuthenticated} transparent>
          <View style={[StyleSheet.absoluteFill, styles.container]}>
            <LightText>
              {isAuthenticating
                ? 'Authenticating user'
                : 'Not authenticated please authenticate your self.'}
            </LightText>
            {!isAuthenticating && (
              <View style={styles.buttonBox}>
                <Button label="Authenticate" onButtonPress={authenticate} />
                <Button label="Exit the app" onButtonPress={exit} />
              </View>
            )}
          </View>
        </Modal>
      )}
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b0017',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buttonBox: {
    flexDirection: 'row',
    gap: 20,
  },
});
