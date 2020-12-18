import React from 'react';
import { DetailDecisionTextFragment } from 'generated/graphql';
import styled from 'styled-components/native';

interface Props extends DetailDecisionTextFragment {}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.paddings.outer};
`;

const Headline = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryText};
  padding-bottom: ${({ theme }) => theme.paddings.outer};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
`;

export const DetailDecisionText: React.FC<Props> = ({ voteResults }) => {
  if (!voteResults) {
    return null;
  }

  return (
    <Container>
      <Headline>Beschlusstext</Headline>
      <Text>{voteResults.decisionText}</Text>
    </Container>
  );
};
