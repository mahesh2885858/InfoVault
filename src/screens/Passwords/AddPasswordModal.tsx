import React, {useCallback, useMemo, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';

import {TPasswordInput} from '../../types';
import {usePasswordsStore} from '../../store/passwordStore';
import ModalWrapper from '../../components/ModalWrapper';
import Container from '../../components/atoms/Container';
import Box from '../../components/atoms/Box';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonsForForms from '../../components/Molecules/ButtonsForForms';
import {useProfileStore} from '../../store/profileStore';
import Typography from '../../components/atoms/Typography';
import {HOME_PROFILE_ID, MAX_LENGTH_NAME} from '../../constants';
import {useProfileContext} from '../../context/ProfileContext';
import {TBaseInput} from '../../types';
import MTextInput from '../../components/Molecules/MTextInput';
import {uCFirst} from 'commonutil-core';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const baseInput: TBaseInput = {
  value: '',
  error: '',
};

const initState: TPasswordInput = {
  password: baseInput,
  username: baseInput,
  website: baseInput,
};

const AddPasswordModal = (props: Props) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const PlaceholderTextColor = theme['text-secondary'];
  const {addPassword, setFocusedPassword} = usePasswordsStore(state => ({
    addPassword: state.addPassword,
    setFocusedPassword: state.setFocusedPassword,
  }));
  const [passwordInputs, setPasswordInputs] =
    useState<TPasswordInput>(initState);
  const userNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const websiteRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {selectedProfileForNew} = useProfileStore(state => ({
    selectedProfile: state.getSelectedProfile(),
    selectedProfileForNew: state.profiles.find(
      p => p.id === state.selectedProfileForAddingANewRecord,
    ),
  }));

  const {openProfileSelection} = useProfileContext()!;

  const togglePasswordVisibility = async () => {
    setShowPassword(p => !p);
  };

  const onChange = (text: string, field: keyof typeof passwordInputs) => {
    if (field === 'username' || field === 'website') {
      if (text.trim().length > MAX_LENGTH_NAME) return;
    }
    setPasswordInputs(prev => ({
      ...prev,
      [field]: {...prev[field], value: text, error: ''},
    }));
  };

  const validateInputs = (inputs: TPasswordInput) => {
    let r = true;
    Object.keys(inputs).forEach(key => {
      const field = key as keyof TPasswordInput;
      if (inputs[field].value.trim().length < 3) {
        setPasswordInputs(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            error: 'The input should be more than three characters',
          },
        }));
        r = false;
      } else {
      }
    });
    return r;
  };
  const clearError = useCallback((field: keyof TPasswordInput) => {
    setPasswordInputs(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: '',
      },
    }));
  }, []);

  const AddAPassword = () => {
    if (!validateInputs(passwordInputs)) return;
    const {password, username, website} = passwordInputs;
    const id = String(Date.now());
    addPassword({
      password: password.value,
      username: username.value,
      website: website.value,
      id,
      isSelected: false,
      profileId: selectedProfileForNew?.id ?? HOME_PROFILE_ID,
    });
    setFocusedPassword(id);
    setPasswordInputs(initState);
    props.setVisible(false);
  };

  const moveToNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  const anyErrors = useMemo(() => {
    return Object.keys(passwordInputs).some(
      k => passwordInputs[k as keyof TPasswordInput].error.trim().length > 0,
    );
  }, [passwordInputs]);

  const renderErrors = useCallback(() => {
    return Object.keys(passwordInputs).map(key => {
      if (!passwordInputs[key as keyof TPasswordInput].error) return null;
      return (
        <View key={key}>
          <Typography style={{color: theme['warning-text-with-bg']}}>
            {uCFirst(key)} : {passwordInputs[key as keyof TPasswordInput].error}
          </Typography>
        </View>
      );
    });
  }, [passwordInputs, theme]);

  const closeModal = () => {
    setPasswordInputs(initState);
    props.setVisible(false);
  };

  return (
    <ModalWrapper
      width={'90%'}
      onClose={() => closeModal()}
      bg={theme['bg-main']}
      visible={props.visible}>
      <Container style={styles.cardContainer}>
        {anyErrors && <View style={styles.errorBox}>{renderErrors()}</View>}

        <View style={styles.profileSwitch}>
          <Typography>Card will be saved in : </Typography>
          <PressableWithFeedback
            onPress={() => openProfileSelection({renderForNew: true})}
            style={styles.switch}>
            <Typography
              style={{
                color: theme['bg-main'],
              }}>
              {selectedProfileForNew?.name ?? ''}
            </Typography>
            <MaterialIcon
              onPress={() => openProfileSelection({renderForNew: true})}
              name="chevron-down"
              color={theme['bg-main']}
              size={25}
            />
          </PressableWithFeedback>
        </View>
        <Box style={[styles.cardContent]}>
          <View style={styles.cardNameAndNumber}>
            <MTextInput
              value={passwordInputs.website.value}
              autoFocus
              ref={websiteRef}
              onChangeText={t => onChange(t, 'website')}
              style={[styles.textInput, styles.cardText]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Web site"
              returnKeyType="next"
              onSubmitEditing={() => moveToNext(userNameRef)}
              error={passwordInputs.website.error}
              clearError={() => clearError('website')}
            />
          </View>
          <View style={styles.username}>
            <MTextInput
              value={passwordInputs.username.value}
              ref={userNameRef}
              onChangeText={t => onChange(t, 'username')}
              style={[styles.textInput, styles.cardText]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Username"
              returnKeyType="next"
              onSubmitEditing={() => moveToNext(passwordRef)}
              clearError={() => clearError('username')}
              error={passwordInputs.username.error}
            />
          </View>

          <View style={styles.passwordBox}>
            <View style={{width: '100%'}}>
              <MTextInput
                value={passwordInputs.password.value}
                ref={passwordRef}
                onChangeText={t => onChange(t, 'password')}
                style={[styles.textInput, styles.cardText, {paddingRight: 50}]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="Password"
                returnKeyType="next"
                secureTextEntry={!showPassword}
                clearError={() => clearError('password')}
                error={passwordInputs.password.error}
              />
              <PressableWithFeedback
                onPress={() => togglePasswordVisibility()}
                style={styles.eyeIcon}>
                <MaterialIcon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme['text-primary']}
                />
              </PressableWithFeedback>
            </View>
          </View>
        </Box>

        <ButtonsForForms onCancel={closeModal} onSave={AddAPassword} />
      </Container>
    </ModalWrapper>
  );
};

const themedStyles = StyleService.create({
  content: {
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 5,
    gap: 20,
  },
  number: {
    width: '70%',
  },
  errorBox: {
    backgroundColor: 'warning-bg',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  textInput: {
    fontSize: 12,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'text-primary',
  },
  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  cardContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 20,
  },
  cardContent: {
    width: '87%',
    borderRadius: 10,
    padding: 15,
    gap: 20,
    flexDirection: 'column',
    backgroundColor: 'bg-card',
  },
  cardNameAndNumber: {
    paddingTop: 10,
    gap: 2,
  },
  cardExpiryCvvButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '65%',
  },
  expiryAndCvvBox: {
    flexDirection: 'column',
    gap: 2,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#bf03ab',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'text-secondary',
    fontSize: 16,
    fontWeight: '600',
  },
  cardNumberText: {
    fontSize: 17,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'text-primary',
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },

  cardUsername: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    flexDirection: 'column',
    gap: 2,
  },
  Button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#bf03ab',
  },

  passwordBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 7,
    right: 10,
  },
  switch: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'button-primary-bg',
    alignItems: 'center',
    gap: 10,
    borderRadius: 5,
  },
  profileSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default AddPasswordModal;
