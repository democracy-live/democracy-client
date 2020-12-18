import React from 'react';
import styled from 'styled-components/native';
import { VoteIndexFragment } from 'generated/graphql';

interface Props extends VoteIndexFragment {}

const Number = styled.Text<Pick<Props, 'voted'>>`
  color: ${({ voted, theme }) =>
    voted ? theme.colors.primaryColoredText : theme.colors.secondaryText};
  font-weight: bold;
`;

export const VotesIndex: React.FC<Props> = ({ votes, voted }) => (
  <Number voted={voted}>{votes}</Number>
);
