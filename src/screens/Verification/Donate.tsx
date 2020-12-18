import React, { useContext, useEffect } from 'react';

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';
import { AuthContext } from 'context/Auth';
import SvgIconappios from 'assets/svgs/icons/IconAppIos';
import { Button } from 'components/Botton';
import { StackNavigationProp } from '@react-navigation/stack';
import { VerificationStackParamList } from 'navigation/verification';

const SAV = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))`
  flex: 1;
  padding-top: ${() => {
    if (DeviceInfo.getModel() === 'iPhone X') {
      return 36;
    }
    return Platform.OS === 'ios' ? 24 : 8;
  }}px;
  padding-horizontal: 18px;
`;

const TextHead = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 22px;
  padding-top: 25px;
  text-align: center;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Light'
    : 'sans-serif-light'};
`;

const TextCenterNormal = styled.Text``;

const TextCenterBold = styled.Text`
  font-weight: bold;
`;

const TextCenter = styled.Text`
  align-content: center;
  justify-content: space-between;
  flex: 1;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 17px;
  padding-top: 50px;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Light'
    : 'sans-serif-light'};
  text-align: center;
  padding-bottom: 18px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-right: 25px;
  padding-left: 25px;
  padding-bottom: 25px;
`;

type NavigationProp = StackNavigationProp<
  VerificationStackParamList,
  'VerificationDonation'
>;

export const SmsDonateScreen: React.FC = () => {
  const { navigate, goBack, popToTop } = useNavigation<NavigationProp>();
  const { refetch: refetchMe } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      refetchMe();
    };
  });

  const onClose = () => {
    refetchMe();
    popToTop();
    goBack();
  };

  const onDonate = async () => {
    navigate('VerificationDonation');
    refetchMe();
  };

  return (
    <SAV>
      <Container>
        <SvgIconappios width={75} height={75} />
        <TextHead>{'Deine Verifikation\nwar erfolgreich!'}</TextHead>
        <TextCenter>
          <TextCenterNormal>
            {
              'Das Versenden Deiner Bestätigungs-\nSMS hat das Projekt DEMOCRACY\nDeutschland '
            }
          </TextCenterNormal>
          <TextCenterBold>7,2 Cent</TextCenterBold>
          <TextCenterNormal>
            {
              ' gekostet.\n\nJede Spende hilft dem DEMOCRACY\nDeutschland e.V. erfolgreich seine\nunabhängige, überparteiliche und\nallgemeinnützige demokratische\nArbeit voranzubringen.'
            }
          </TextCenterNormal>
        </TextCenter>
        <ButtonContainer>
          <Button onPress={onClose} textColor="red" text="Später" />
          <Button
            onPress={onDonate}
            textColor="white"
            backgroundColor="blue"
            text="SPENDEN"
          />
        </ButtonContainer>
      </Container>
    </SAV>
  );
};
