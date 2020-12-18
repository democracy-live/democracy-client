import React from 'react';
import styled from 'styled-components/native';
import {
  ListItemFragment,
  VoteIndexFragmentDoc,
  VoteDateFragmentDoc,
} from 'generated/graphql';
import { VotesIndex } from 'components/ListItem/components/VoteIndex';
import { filter } from 'graphql-anywhere';
import { VoteDate } from './components/VoteDate/VoteDate';

const Container = styled.View`
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
  padding-vertical: ${({ theme }) => theme.paddings.outer};
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Subline = styled.Text`
  padding-top: 8px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const SideContainer = styled.View`
  align-items: flex-end;
  min-width: 50px;
  justify-content: space-between;
`;

const PieChartContainer = styled.View`
  flex-direction: row;
  width: 45px;
  justify-content: space-between;
`;

interface Props extends ListItemFragment {
  isIntro?: boolean;
  renderPieCharts?: React.ReactNode[];
}

export const ListItem: React.FC<Props> = ({
  isIntro,
  title,
  sessionTOPHeading,
  voted,
  votes,
  renderPieCharts,
  voteDate,
  voteEnd,
}) => {
  return (
    <Container>
      <TextContainer>
        <Title numberOfLines={isIntro ? undefined : 3}>{title}</Title>
        {!!sessionTOPHeading && (
          <Subline numberOfLines={isIntro ? undefined : 2}>
            {sessionTOPHeading}
          </Subline>
        )}
      </TextContainer>
      <SideContainer>
        <VotesIndex {...filter(VoteIndexFragmentDoc, { voted, votes })} />
        <PieChartContainer>{renderPieCharts}</PieChartContainer>
        <VoteDate {...filter(VoteDateFragmentDoc, { voteDate, voteEnd })} />
      </SideContainer>
    </Container>
  );
};
