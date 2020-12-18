import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert, Platform, Dimensions } from 'react-native';

import Description from './Components/Description';
import PhonenumberInput from './Components/PhonenumberInput';

import REQUEST_CODE from './graphql/mutation/requestCode';
import { useMutation } from '@apollo/client';
import {
  RequestSmsCode,
  RequestSmsCodeVariables,
} from './graphql/mutation/__generated__/RequestSmsCode';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonNext } from '.';
import { VerificationContext } from 'context/Verification';
import SvgDemocracyBubble from 'assets/svgs/icons/DemocracyBubble';
import { VerificationStackParamList } from 'navigation/verification';
import { AuthContext } from 'context/Auth';

const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 100,
  // enabled: true,
}))`
  background-color: ${({ theme }) => theme.backgroundColor};
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'always',
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
}))``;

const RequestCodeButton = styled(ButtonNext)`
  align-self: stretch;
`;

const DEVICE_HEIGT = Dimensions.get('window').height;

export const PhoneNumber: React.FC = () => {
  const { refetch: refetchMe } = useContext(AuthContext);
  const navigation = useNavigation<
    StackNavigationProp<VerificationStackParamList>
  >();
  const {
    phoneNumber,
    setPhoneNumber,
    setExpireTime,
    setResendTime,
  } = useContext(VerificationContext);
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(
    phoneNumber.substr(3),
  );
  const [requestCode] = useMutation<RequestSmsCode, RequestSmsCodeVariables>(
    REQUEST_CODE,
  );

  const showNotification = (message: string) => {
    Alert.alert('Verifikationsfehler', message);
  };

  const sendNumber = () => {
    let preparedPhoneNumber = phoneNumberInputValue;
    if (preparedPhoneNumber.charAt(0) === '0') {
      preparedPhoneNumber = preparedPhoneNumber.substr(1);
    }
    preparedPhoneNumber = `+49${preparedPhoneNumber}`;
    Alert.alert(
      'Bestätigung der Telefonnummer',
      `${preparedPhoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: 'Bearbeiten',
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: async () => {
            setPhoneNumber(preparedPhoneNumber);
            const res = await requestCode({
              variables: { newPhone: preparedPhoneNumber },
            });

            if (res.data && !res.data.requestCode.succeeded) {
              setExpireTime(res.data.requestCode.expireTime);
              setResendTime(res.data.requestCode.resendTime);
              showNotification(res.data.requestCode.reason || '');
              refetchMe();
            } else if (res.data) {
              setExpireTime(res.data.requestCode.expireTime);
              setResendTime(res.data.requestCode.resendTime);
              navigation.push('VerificationCodeInput', {});
            }
          },
        },
      ],
    );
  };

  return (
    <Container>
      <ScrollView>
        {DEVICE_HEIGT > 500 && (
          <SvgDemocracyBubble width="125" height="125" color="#000" />
        )}
        <Description text="Bitte gib Deine aktuelle Handynummer ein" />
        <PhonenumberInput
          phoneNumber={phoneNumberInputValue}
          onChange={setPhoneNumberInputValue}
        />
        <RequestCodeButton
          text="CODE ANFORDERN"
          onPress={sendNumber}
          disabled={phoneNumberInputValue.length < 9}
          textColor="white"
          backgroundColor="blue"
          testID="VerificationCodeButton"
        />
      </ScrollView>
    </Container>
  );
};
