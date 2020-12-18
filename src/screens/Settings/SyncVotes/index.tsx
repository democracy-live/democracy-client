import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import VotesLocal, { ChainEntryRaw } from '../../../lib/VotesLocal';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'components/Botton';

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
})``;

const QrContainer = styled.View`
  margin-top: 11px;
  margin-bottom: 11px;
`;

const Text = styled.Text`
  margin-top: 11px;
  margin-bottom: 11px;
  text-align: center;
  color: ${({ theme }) => theme.primaryColor}; // TODO Right Color?
`;

const ListContainer = styled.View`
  flex-direction: row;
  align-self: flex-start;
  padding-right: 18px;
`;

const ListText = styled.Text`
  padding-top: 11px;
  padding-bottom: 11px;
  color: ${({ theme }) => theme.primaryColor}; // TODO Right color?
`;

export interface SyncObj {
  procedures: ChainEntryRaw[];
  meta: {
    sum: number;
    current: number;
    identifier: string;
    v: number;
  };
}

const ListElement = ({ label, text }: { label: string; text: string }) => {
  return (
    <ListContainer>
      <ListText>{label}</ListText>
      <ListText style={{ paddingLeft: 18 }}>{text}</ListText>
    </ListContainer>
  );
};

const QR_DATA_LENGTH = 5;

export const SyncVotes = () => {
  const navigation = useNavigation();
  const [localVotes, setLocalVotes] = useState<SyncObj[]>([]);
  const [iterator, setIterator] = useState<number>(0);
  const qrSize =
    (Dimensions.get('window').width < Dimensions.get('window').height
      ? Dimensions.get('window').width
      : Dimensions.get('window').height) - 36;
  useEffect(() => {
    VotesLocal.readKeychain().then((data) => {
      const sumQrCodes = Math.ceil(data.d.length / QR_DATA_LENGTH);
      const randomIdentifieer = Math.random().toString(36).substring(7);
      setLocalVotes(
        data.d.reduce<SyncObj[]>((prev, procedures, index) => {
          const arrayIndey = Math.floor(index / QR_DATA_LENGTH);
          if (prev[arrayIndey]) {
            prev[arrayIndey] = {
              procedures: [...prev[arrayIndey].procedures, procedures],
              meta: {
                sum: sumQrCodes,
                current: arrayIndey + 1,
                identifier: randomIdentifieer,
                v: data.v,
              },
            };
            // prev[arrayIndey] = `${prev[arrayIndey]}:${i}.${s}.${new Date(
            //   t,
            // ).getTime()}.${c}`;
          } else {
            prev[arrayIndey] = {
              procedures: [procedures],
              meta: {
                sum: sumQrCodes,
                current: arrayIndey + 1,
                identifier: randomIdentifieer,
                v: data.v,
              },
            };
          }
          return prev;
        }, [] as SyncObj[]),
      );
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let next = iterator + 1;
      if (next === localVotes.length) {
        next = 0;
      }

      setIterator(next);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [localVotes, iterator]);

  return (
    <Container>
      <Text>So überträgst Du Deine lokalen Stimmen auf dein neues Gerät:</Text>
      {!!localVotes && !!localVotes[iterator] && (
        <QrContainer>
          <QRCode size={qrSize} value={JSON.stringify(localVotes[iterator])} />
        </QrContainer>
      )}
      <ListElement label="1." text="Öffne DEMOCRACY auf deinem neuen Gerät" />
      <ListElement
        label="2."
        text="Tippe auf Menu > Settings und wähle Stimmen übertragen"
      />
      <ListElement
        label="3."
        text="Tippe auf dem neuen Gerät den Button Stimmen empfangen und richte es auf diesen Bildschirm, um den QR-Code zu scannen"
      />
      <Button
        text="Stimmen empfangen"
        textColor="white"
        backgroundColor="blue"
        onPress={() => {
          navigation.navigate('SyncVotesCapture');
        }}
      />
    </Container>
  );
};
