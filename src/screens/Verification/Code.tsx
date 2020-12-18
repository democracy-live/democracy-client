import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Keyboard, Alert, Platform, Dimensions } from 'react-native';
import { sha256 } from 'react-native-sha256';
import AsyncStorage from '@react-native-community/async-storage';

import Description from './Components/Description';
import { CodeInput } from './Components/CodeInput';

// GraphQL
import REQUEST_CODE from './graphql/mutation/requestCode';
import REQUEST_VERIFICATION from './graphql/mutation/requestVerification';
import {
  RequestVerification,
  RequestVerificationVariables,
} from './graphql/mutation/__generated__/RequestVerification';
import { useMutation } from '@apollo/client';
import {
  RequestSmsCode,
  RequestSmsCodeVariables,
} from './graphql/mutation/__generated__/RequestSmsCode';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonNext } from '.';
import { VerificationStackParamList } from 'navigation/verification';
import { VerificationContext } from 'context/Verification';
import { ListFilterContext } from 'context/ListFilter';
import { ConstituencyContext } from 'context/constituency';
import {
  ProcedureDetailDocument,
  ProceduresListDocument,
} from 'generated/graphql';
import SvgDemocracyBubble from 'assets/svgs/icons/DemocracyBubble';

const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 100,
  // enabled: true,
}))`
  background-color: ${({ theme }) => theme.backgroundColor};
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
}))``;

const ResendCodeButton = styled(ButtonNext)`
  align-self: stretch;
`;

type CodeInputNavigationProps = StackNavigationProp<
  VerificationStackParamList,
  'VerificationCodeInput'
>;

const DEVICE_HEIGT = Dimensions.get('window').height;

type RouteProps = RouteProp<
  VerificationStackParamList,
  'VerificationCodeInput'
>;

interface Props {
  route: RouteProps;
}

export const CodeInputScreen: React.FC<Props> = ({ route }) => {
  const { countdown, setExpireTime, setResendTime, phoneNumber } = useContext(
    VerificationContext,
  );
  const { proceduresFilter } = useContext(ListFilterContext);
  const { constituency } = useContext(ConstituencyContext);
  const navigation = useNavigation<CodeInputNavigationProps>();
  const [requestCode] = useMutation<RequestSmsCode, RequestSmsCodeVariables>(
    REQUEST_CODE,
  );
  const [requestVerification] = useMutation<
    RequestVerification,
    RequestVerificationVariables
  >(REQUEST_VERIFICATION);
  const [code, setCode] = useState('');

  const showNotification = (message: string) => {
    Alert.alert('Verifikationsfehler', message);
  };

  const onChangeCode = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length === 6) {
      const phoneNumberHash = await sha256(phoneNumber);
      const refetchQueries = [];
      if (route.params && route.params.procedureId) {
        // Detail View
        refetchQueries.push({
          query: ProcedureDetailDocument,
          variables: {
            constituency,
            id: route.params.procedureId,
          },
        });
      }
      // Lists
      ['CONFERENCEWEEKS_PLANNED', 'PAST', 'TOP100'].forEach((list) => {
        refetchQueries.push({
          query: ProceduresListDocument,
          variables: {
            listTypes: [list],
            pageSize: 10,
            filter: proceduresFilter,
            constituencies: constituency ? [constituency] : [],
          },
        });
      });
      const res = await requestVerification({
        variables: {
          code: newCode,
          newPhoneHash: phoneNumberHash,
          newUser: true, // TODO ask user if he already used the App with same phone number
        },
        refetchQueries,
      });

      if (res.data && res.data.requestVerification.succeeded) {
        AsyncStorage.setItem('auth_phoneHash', phoneNumberHash);
        AsyncStorage.removeItem('verification_tmp_phone_number');
        Keyboard.dismiss();
        navigation.navigate('VerificationDonation');
      } else if (res.data) {
        showNotification(res.data.requestVerification.reason || '');
      }
    }
  };

  const sendNumber = async () => {
    Alert.alert(
      'Bestätigung der Telefonnummer',
      `${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: 'Bearbeiten',
          onPress: () => navigation.pop(),
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: async () => {
            const res = await requestCode({
              variables: { newPhone: phoneNumber },
            });
            if (res.data) {
              const {
                succeeded,
                reason,
                expireTime,
                resendTime,
              } = res.data.requestCode;
              if (!succeeded) {
                showNotification(reason || '');
              } else {
                setExpireTime(expireTime);
                setResendTime(resendTime);
              }
            }
          },
        },
      ],
    );
  };

  let buttonTitle = 'Code erneut senden';
  if (countdown > 0) {
    buttonTitle += ` (${countdown})`;
  }

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="always">
        {DEVICE_HEIGT > 500 && (
          <SvgDemocracyBubble width="125" height="125" color="#000" />
        )}
        <Description text={`Bitte gib Deinen Code ein für\n${phoneNumber}`} />
        <CodeInput onChange={onChangeCode} code={code} />
        <ResendCodeButton
          text={buttonTitle}
          onPress={sendNumber}
          disabled={countdown === undefined || countdown > 0}
          textColor="white"
          backgroundColor="blue"
        />
      </ScrollView>
    </Container>
  );
};
