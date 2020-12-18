import React, { useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import { BalloutBox } from './components/BallotBox';

// Components

// GraphQL
import Fade from './components/Animations/Fade';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import { WomPartyHeader } from 'screens/WahlOMeter/Fraktionen/Header';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 73 : 18,
    alignItems: 'center',
  },
})`
  flex-grow: 1;
`;

const Title = styled.Text`
  padding-top: 9px;
  padding-horizontal: 18px;
  font-size: 34px;
  padding-bottom: 9px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const WarnWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 130px;
`;

const WarnTextWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 11px;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0.9;
`;

const WarnText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 13px;
`;

const BalloutBoxWrapper = styled.View`
  height: 130px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
  border-top-width: 1px;
  border-top-color: rgba(68, 148, 211, 0.1);
`;

type VoteVerificationScreenNavigationProp = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Voting'
>;

type VoteVerificationScreenRouteProp = RouteProp<
  BundestagStackNavigatorParamList,
  'Voting'
>;

interface Props {
  route: VoteVerificationScreenRouteProp;
  navigation: VoteVerificationScreenNavigationProp;
}

export const VotingScreen: React.FC<Props> = ({ route }) => {
  const [showWarning, setShowWarning] = useState(true);

  const onScroll = () => {
    if (showWarning) {
      setShowWarning(false);
    }
  };

  const { selection, procedureId, title } = route.params;

  return (
    <Wrapper>
      <ScrollWrapper onScroll={onScroll} scrollEventThrottle={1000}>
        <Title>Schon gewusst?</Title>
        <WomPartyHeader />
      </ScrollWrapper>
      <WarnWrapper pointerEvents="none">
        <Fade visible={showWarning}>
          <WarnTextWrapper>
            <WarnText>
              Deine Stimme ist verbindlich und kann nicht zurückgenommen werden
            </WarnText>
          </WarnTextWrapper>
        </Fade>
      </WarnWrapper>
      <BalloutBoxWrapper>
        <BalloutBox
          selection={selection}
          procedureId={procedureId}
          title={title}
        />
      </BalloutBoxWrapper>
    </Wrapper>
  );
};
