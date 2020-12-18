// TODO move this to mobile-ui library
import React, { useContext } from 'react';
import Description from './Components/Description';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { Button } from 'components/Botton';
import { VerificationContext } from 'context/Verification';
import SvgDemocracyBubble from 'assets/svgs/icons/DemocracyBubble';
import Folding from 'components/Folding';
import { linking } from 'lib/linking';
import { VerificationStackParamList } from 'navigation/verification';

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 18,
  },
}))`
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const DemocracyBubble = styled(SvgDemocracyBubble)`
  align-self: center;
`;

const Text = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondaryText};
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
  padding-top: ${({ theme }) => theme.paddings.outer};
`;

const TextLink = styled.Text`
  font-size: 15px;
  padding-bottom: 8px;
  color: rgb(68, 148, 211);
  text-decoration: underline;
`;

export const Space = styled.View`
  padding-top: 18px;
`;

export const ButtonNext = styled(Button)`
  margin-horizontal: ${({ theme }) => theme.paddings.outer};
`;

type VerificationNavigationProps = StackNavigationProp<
  VerificationStackParamList,
  'VerificationIntro'
>;

export const VerificationStart: React.FC = () => {
  const navigation = useNavigation<VerificationNavigationProps>();
  const { countdown, expireTime } = useContext(VerificationContext);

  const authCodeExpires = expireTime > new Date();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <DemocracyBubble width="125" height="125" color="#000" />
      <Space />
      <Description
        text={
          'Selbst Abstimmen und Ergebnisse vergleichen kannst Du in DEMOCRACY nur mit einer verifizierten Handynummer.\n\nAktiviere die Verifizierung, indem Du in zwei Schritten einen Zugangscode an Deine Handynummer anforderst.'
        }
      />
      <Folding title="Wofür braucht DEMOCRACY meine Handynummer?">
        <Text>
          <Text>
            {`Ergebnisintegrität ist eine der zentralen Anforderungen eines Wahlverfahrens und bedeutet, dass genau die Stimmen gezählt werden, die von wahlberechtigten BürgerInnen abgegeben werden.\n
Da uns von DEMOCRACY Deutschland e.V. allerdings keine Wählerkartei vorliegt, haben wir uns dafür entschieden, das sogenannte Urnenbuchproblem heuristisch zu lösen und Deine deutsche Handynummer als Schlüsselidentifikator zu verwenden. Das Urnenbuchproblem beschäftigt sich mit der Frage, wer bei einer konkreten Wahl/Abstimmung berechtigt ist, seine Stimme abzugeben und führt die Berechtigten in eben diesem.

Auf diese Weise können wir weit belastbare Ergebnisse erzeugen als über eine einfache E-Mail-Verifikation. Es gilt insofern, eine deutsche Handynummer – eine Stimme. 

Mehr Informationen zu diesem Verfahren kannst du `}
          </Text>
          <TextLink
            onPress={linking(
              'https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymit%C3%A4t',
            )}>
            hier
          </TextLink>
          <Text> einsehen.</Text>
        </Text>
      </Folding>
      <Folding title="Was passiert mit meiner Nummer nach der Verifikation?">
        <Text>
          <Text>
            {`DEMOCRACY Deutschland e.V. übermittelt Dir nach der Eingabe und Bestätigung Deiner Handynummer einen Verfizierungscode per SMS. Dafür übergibt der Verein Deine Handynummer einmalig im Klartext an den deutschen SMS-Service-Provider SMSFlatrate (smsflatrate.net, Kloppe Media, Ansbacher Str. 85, 91541 Rothenburg). Der Verein speichert Deine Handynummer daraufhin lediglich einwegverschlüsselt in seiner Datenbank; eine weitere Verwendung dieser ist insofern ausgeschlossen.\n

Mehr Informationen zum verwendeten Verfahren kannst Du in unseren `}
          </Text>
          <TextLink
            onPress={linking(
              'https://www.democracy-deutschland.de/#!nutzungsbedingungen',
            )}>
            Nutzungsbedingungen
          </TextLink>
          <Text>
            {` einsehen.

Zu unserer `}
          </Text>
          <TextLink
            onPress={linking(
              'https://www.democracy-deutschland.de/#!datenschutz',
            )}>
            Datenschutzbestimmung
          </TextLink>
          <Text> gelangst Du ferner hier.</Text>
        </Text>
      </Folding>
      {authCodeExpires && (
        <ButtonNext
          onPress={() => navigation.push('VerificationCodeInput', {})}
          text="CODE EINGEBEN"
          textColor="white"
          backgroundColor="blue"
        />
      )}

      <ButtonNext
        testID="StartVerificationButton"
        onPress={() => navigation.push('VerificationPhoneInput')}
        text={`${
          authCodeExpires
            ? `Neuen Code senden${countdown ? ` (${countdown})` : ''}`
            : 'VERIFIZIEREN'
        } `}
        disabled={countdown > 0}
        textColor="white"
        backgroundColor={authCodeExpires ? 'lightBlue' : 'blue'}
      />
    </ScrollView>
  );
};
