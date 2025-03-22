import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {myTheme} from '../../../theme';

import {TPassword} from '../../types/passwords';
import {usePasswordsStore} from '../../store/passwordStore';
import ModalWrapper from '../../components/ModalWrapper';
import Container from '../../components/atoms/Container';
import Box from '../../components/atoms/Box';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonsForForms from '../../components/Molecules/ButtonsForForms';
import {useProfileStore} from '../../store/profileStore';
import LightText from '../../components/atoms/LightText';
import {DEFAULT_PROFILE_ID, MAX_LENGTH_NAME} from '../../constants';
import {useProfileContext} from '../../context/ProfileContext';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type TPasswordInput = Omit<TPassword, 'isSelected' | 'id'>;

const initState: TPasswordInput = {
  password: '',
  username: '',
  website: '',
  profileId: '123abd',
};

const PlaceholderTextColor = 'grey';

const AddPasswordModal = (props: Props) => {
  const addPassword = usePasswordsStore(state => state.addPassword);
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
    setPasswordInputs(prev => ({...prev, [field]: text}));
  };

  const validateInputs = (inputs: TPasswordInput) => {
    let r = true;
    Object.keys(inputs).forEach(key => {
      // @ts-expect-error: need to find later
      if (inputs[key].trim().length < 2) {
        r = false;
      }
    });
    return r;
  };

  const AddAPassword = () => {
    if (!validateInputs(passwordInputs)) return;
    addPassword({
      ...passwordInputs,
      id: Date.now().toString(),
      isSelected: false,
      profileId: selectedProfileForNew?.id ?? DEFAULT_PROFILE_ID,
    });
    setPasswordInputs(initState);
    props.setVisible(false);
  };

  const moveToNext = (nextRef: React.RefObject<TextInput>) => {
    nextRef.current?.focus();
  };

  const closeModal = () => {
    setPasswordInputs(initState);
    props.setVisible(false);
  };

  return (
    <ModalWrapper
      width={'90%'}
      onClose={() => closeModal()}
      visible={props.visible}>
      <Container style={styles.cardContainer}>
        <View style={styles.profileSwitch}>
          <LightText>Card will be saved in : </LightText>
          <PressableWithFeedback
            onPress={() => openProfileSelection({renderForNew: true})}
            style={styles.switch}>
            <LightText>{selectedProfileForNew?.name ?? ''}</LightText>
            <MaterialIcon
              onPress={() => openProfileSelection({renderForNew: true})}
              name="chevron-down"
              color="white"
              size={25}
            />
          </PressableWithFeedback>
        </View>
        <Box style={[styles.cardContent]}>
          <View style={styles.cardNameAndNumber}>
            <TextInput
              value={passwordInputs.website}
              autoFocus
              ref={websiteRef}
              onChangeText={t => onChange(t, 'website')}
              style={[styles.textInput, styles.cardText]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Web site"
              returnKeyType="next"
              onSubmitEditing={() => moveToNext(userNameRef)}
            />
          </View>
          <View style={styles.username}>
            <TextInput
              value={passwordInputs.username}
              ref={userNameRef}
              onChangeText={t => onChange(t, 'username')}
              style={[styles.textInput, styles.cardText]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Username"
              returnKeyType="next"
              onSubmitEditing={() => moveToNext(passwordRef)}
            />
          </View>

          <View style={styles.passwordBox}>
            <View style={{width: '100%'}}>
              <TextInput
                value={passwordInputs.password}
                ref={passwordRef}
                onChangeText={t => onChange(t, 'password')}
                style={[styles.textInput, styles.cardText, {paddingRight: 50}]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="Password"
                returnKeyType="next"
                secureTextEntry={!showPassword}
              />
              <PressableWithFeedback
                onPress={() => togglePasswordVisibility()}
                style={styles.eyeIcon}>
                {showPassword ? (
                  <MaterialIcon name="eye-off-outline" size={20} />
                ) : (
                  <MaterialIcon name="eye-outline" size={20} />
                )}
              </PressableWithFeedback>
            </View>
          </View>
        </Box>

        <ButtonsForForms onCancel={closeModal} onSave={AddAPassword} />
      </Container>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
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

  textInput: {
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#bf03ab50',
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
    backgroundColor: myTheme.cardBg,
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
    color: myTheme.cardTitleText,
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
    color: 'white',
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
    backgroundColor: myTheme.buttonBg,
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
