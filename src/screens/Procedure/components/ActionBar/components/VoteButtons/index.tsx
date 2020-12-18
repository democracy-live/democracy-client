import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { VoteSelection } from 'generated/graphql';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import React from 'react';
import styled from 'styled-components/native';
import VoteButton from './VoteButton';

const Container = styled.View`
  padding-vertical: ${({ theme }) => theme.paddings.outer};
  flex-direction: row;
  justify-content: space-around;
`;

const VoteButtonWrapper = styled.View`
  align-items: center;
`;

const VoteButtonLabel = styled.Text`
  padding-top: ${({ theme }) => theme.paddings.outer};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

type VoteVerificationScreenNavigationProp = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Voting'
>;

interface Props {
  procedureId: string;
  title: string;
}

export const VoteButtons: React.FC<Props> = ({ procedureId, title }) => {
  const { navigate } = useNavigation<VoteVerificationScreenNavigationProp>();
  return (
    <Container>
      <VoteButtonWrapper>
        <VoteButton
          voted={false}
          selection="YES"
          voteSelection={'YES'}
          onPress={() => {
            navigate('Voting', {
              selection: VoteSelection.Yes,
              procedureId,
              title,
            });
          }}
        />
        <VoteButtonLabel>{true ? 'Zustimmen' : 'Zugestimmt'}</VoteButtonLabel>
      </VoteButtonWrapper>

      <VoteButtonWrapper>
        <VoteButton
          voted={false}
          selection="ABSTINATION"
          voteSelection={'ABSTINATION'}
          onPress={() => {
            navigate('Voting', {
              selection: VoteSelection.Abstination,
              procedureId,
              title,
            });
          }}
        />
        <VoteButtonLabel>Enthalten</VoteButtonLabel>
      </VoteButtonWrapper>

      <VoteButtonWrapper>
        <VoteButton
          voted={false}
          selection="NO"
          voteSelection={'NO'}
          onPress={() => {
            navigate('Voting', {
              selection: VoteSelection.No,
              procedureId,
              title,
            });
          }}
        />
        <VoteButtonLabel>{true ? 'Ablehnen' : 'Abgelehnt'}</VoteButtonLabel>
      </VoteButtonWrapper>
    </Container>
  );
};
