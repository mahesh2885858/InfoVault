import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppState, BackHandler, Modal, StyleSheet, View } from 'react-native';
import Button from '../components/atoms/Button';
import Typography from '../components/atoms/Typography';
import { authenticateLocal } from '../utils/authenticateLocal';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

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
  const theme = useTheme();
  const { t } = useTranslation();
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
      }}
    >
      {(!isAuthenticated || AppState.currentState === 'background') && (
        <Modal visible={!isAuthenticated} transparent>
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.container,
              {
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            <Typography
              style={{
                color: theme.colors.onBackground,
              }}
            >
              {isAuthenticating
                ? t('auth.authenticating')
                : t('auth.notAuthenticated')}
            </Typography>
            {!isAuthenticating && (
              <View style={styles.buttonBox}>
                <Button
                  label={t('auth.authenticate')}
                  onButtonPress={authenticate}
                />
                <Button label={t('auth.exitApp')} onButtonPress={exit} />
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buttonBox: {
    flexDirection: 'row',
    gap: 20,
  },
});
