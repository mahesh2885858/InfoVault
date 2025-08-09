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
type ToastContext = {
  show: (text: string) => void;
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

  const showToast = (text: string) => {
    setMessage(text);
    setRenderToast(true);
  };

  const closeToast = useCallback(() => {
    setMessage('');
    setRenderToast(false);
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
            style={[styles.toast]}
          >
            <Typography>{message}</Typography>
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
