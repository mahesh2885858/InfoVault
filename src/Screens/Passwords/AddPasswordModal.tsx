import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {myTheme} from '../../../theme';

import {TPassword} from '../../Types/Passwords.type';
import {usePasswordsStore} from '../../Store/passwordStore';
import ModalWrapper from '../../components/ModalWrapper';
import Container from '../../components/atoms/Container';
import Box from '../../components/atoms/Box';
import LightText from '../../components/atoms/LightText';
import PressableWithFeedback from '../../components/PressableWithFeedback';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type TPasswordInput = Omit<TPassword, 'isSelected' | 'id'>;

const initState: TPasswordInput = {
  password: '',
  username: '',
  website: '',
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

  const togglePasswordVisibility = async () => {
    setShowPassword(p => !p);
  };

  const onChange = (text: string, field: keyof typeof passwordInputs) => {
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
    });
    setPasswordInputs(initState);
    props.setVisible(false);
  };
  return (
    <ModalWrapper
      width={'90%'}
      setVisibility={props.setVisible}
      visible={props.visible}>
      <Container style={styles.cardContainer}>
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
              // onSubmitEditing={moveToNext}
            />
          </View>
          <View style={styles.username}>
            {/* <LightText style={styles.title}>User name</LightText> */}
            <TextInput
              value={passwordInputs.username}
              ref={userNameRef}
              onChangeText={t => onChange(t, 'username')}
              style={[styles.textInput, styles.title]}
              placeholderTextColor={PlaceholderTextColor}
              placeholder="Username"
              returnKeyType="next"
              // onSubmitEditing={moveToNext}
            />
          </View>

          <View style={styles.passwordBox}>
            <View style={{width: '100%'}}>
              {/* <LightText style={styles.title}>Password</LightText> */}

              <TextInput
                value={passwordInputs.password}
                ref={passwordRef}
                onChangeText={t => onChange(t, 'password')}
                style={[styles.textInput, styles.cardText, {paddingRight: 50}]}
                placeholderTextColor={PlaceholderTextColor}
                placeholder="Password"
                returnKeyType="next"
                secureTextEntry={!showPassword}
                // onSubmitEditing={moveToNext}
              />
              <PressableWithFeedback
                onPress={() => togglePasswordVisibility()}
                style={{
                  position: 'absolute',
                  bottom: 7,
                  right: 10,
                }}>
                {showPassword ? (
                  <MaterialIcon name="eye-off-outline" size={20} />
                ) : (
                  <MaterialIcon name="eye-outline" size={20} />
                )}
                {/* <MaterialIcon name="eye-off-outline" size={15} /> */}
              </PressableWithFeedback>
            </View>
          </View>
        </Box>
        <View style={styles.buttonsBox}>
          <PressableWithFeedback
            onPress={() => {
              props.setVisible(false);
            }}
            style={styles.button}>
            <LightText>Cancel</LightText>
          </PressableWithFeedback>
          <PressableWithFeedback
            onPress={() => {
              AddAPassword();
            }}
            style={styles.button}>
            <LightText>Save</LightText>
          </PressableWithFeedback>
        </View>
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
    // textTransform: 'uppercase',
  },
  cardNumberText: {
    fontSize: 17,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardText: {
    fontSize: 17,
    fontWeight: '500',
    // textTransform: 'uppercase',
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
    // borderWidth: 2,
    // borderColor: 'black',
  },
});

export default AddPasswordModal;