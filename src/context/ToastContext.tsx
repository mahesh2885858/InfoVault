import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Typography from '../components/atoms/Typography';
import { ToastOptions } from '../types';
import { useTheme } from 'react-native-paper';
type ToastContext = {
  show: (text: string, toastOptions?: ToastOptions) => void;
  visible: boolean;
  close: () => void;
};
export const ToastContext = createContext<ToastContext>({
  close() {},
  show() {},
  visible: false,
});

export const useToastContext = () => {
  const context = useContext(ToastContext);
  return context;
};

export const ToastProvider = (props: { children: React.ReactNode }) => {
  const { top } = useSafeAreaInsets();
  const [renderToast, setRenderToast] = useState(false);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<ToastOptions>({
    duration: 2000,
    type: 'success',
  });
  const theme = useTheme();
  const showToast = (text: string, toastOptions?: ToastOptions) => {
    if (renderToast) {
      // close the existing toast before showing a new one
      closeToast();
    }
    setMessage(text);
    setRenderToast(true);
    if (toastOptions) {
      setOptions(p => ({ ...p, ...toastOptions }));
    }
  };

  const closeToast = useCallback(() => {
    setMessage('');
    setRenderToast(false);
    setOptions({ duration: 2000, type: 'success' });
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (renderToast) {
      timer = setTimeout(() => {
        closeToast();
        if (timer) {
          clearTimeout(timer);
        }
      }, 2000);
    } else {
      // clear the timer if the user closed the toast manually
      if (timer) {
        clearTimeout(timer);
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [renderToast, closeToast]);

  return (
    <ToastContext.Provider
      value={{
        close: closeToast,
        show: showToast,
        visible: renderToast,
      }}
    >
      {renderToast && (
        <SafeAreaView
          edges={['top']}
          style={[styles.toastContainer, { marginTop: top }]}
        >
          <Animated.View
            entering={SlideInUp}
            exiting={SlideOutUp}
            style={[
              styles.toast,
              {
                backgroundColor:
                  options.type === 'success'
                    ? theme.colors.primary
                    : options.type === 'error'
                    ? theme.colors.errorContainer
                    : theme.colors.tertiary,
              },
            ]}
          >
            <Typography
              style={{
                color:
                  options.type === 'success'
                    ? theme.colors.onPrimary
                    : options.type === 'error'
                    ? theme.colors.onErrorContainer
                    : theme.colors.onTertiary,
              }}
            >
              {message}
            </Typography>
          </Animated.View>
        </SafeAreaView>
      )}
      {props.children}
    </ToastContext.Provider>
  );
};
const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    left: 0,
    width: '100%',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'green',
    width: '85%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
